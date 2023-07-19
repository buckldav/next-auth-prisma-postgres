import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRole } from "@prisma/client";
import { NextRouter, useRouter } from "next/router";

export function AuthGuard({
  router,
  children,
}: React.PropsWithChildren<{ router: NextRouter }>) {
  const { status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    const protectedRoutes = [/\/users\/*|\/payments\/*|\/hourly-rates\/*/g];
    for (const route of protectedRoutes) {
      if (router.pathname.match(route)) {
        return (
          <Box sx={{ m: 1 }}>
            401 Unauthorized. <Link href="/">Home</Link>
          </Box>
        );
      }
    }
  }

  return children;
}

export function AdminGuard({
  children,
  throw403 = true,
}: React.PropsWithChildren<{ throw403?: boolean }>) {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(true);
  useEffect(() => {
    fetch("/api/users/get-current-user-role")
      .then((res) => {
        res.json().then((user) => {
          setForbidden(user.userRole !== UserRole.ADMIN);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (status === "loading" || loading) {
    return null;
  }

  if (forbidden) {
    if (throw403) {
      return (
        <Box sx={{ m: 1 }}>
          403 Forbidden. <Link href="/">Home</Link>
        </Box>
      );
    } else {
      return <></>;
    }
  }

  return children;
}
