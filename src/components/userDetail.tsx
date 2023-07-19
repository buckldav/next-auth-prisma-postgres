import { User, UserRole } from "@prisma/client";
import { Layout } from "../layout";
import { Box, Skeleton, Typography } from "@mui/material";
import ModelForm, { FormModalWrapper } from "./modelForm";
import { useSession } from "next-auth/react";

function DataTable({ obj }: { obj: any }) {
  if (!obj) return null;
  return (
    <table>
      {Object.entries(obj).map(
        ([key, val]) =>
          key !== "role" && (
            <Box component="tr" key={key}>
              <Box component="th" sx={{ textAlign: "left" }}>
                {key}:{" "}
              </Box>
              <Box component="td">{JSON.stringify(val)}</Box>
            </Box>
          )
      )}
    </table>
  );
}

export default function UserDetail({
  loggedInRole,
  user,
}: {
  loggedInRole: UserRole;
  user: User;
}) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton />;
  }

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        User
      </Typography>

      <DataTable obj={user} />
      <FormModalWrapper objName="Basic Info" operation="update">
        <ModelForm
          apiRoute={`/api/users/${user.id}`}
          obj={user}
          requiredKeys={[]}
          keys={
            loggedInRole === UserRole.ADMIN
              ? [
                  "name",
                  "nickname",
                  "email",
                  "personalEmail",
                  "userRole",
                  "isActive",
                ]
              : ["name", "nickname", "email", "personalEmail"]
          }
          method="PUT"
        />
      </FormModalWrapper>
    </Layout>
  );
}
