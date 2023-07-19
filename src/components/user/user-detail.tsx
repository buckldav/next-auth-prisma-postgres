import { User, UserRole } from "@prisma/client";
import { MainLayout } from "../layout/main";
import { Box, Skeleton, Typography } from "@mui/material";
import ModelForm, { FormModalWrapper } from "../form/model-form";
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

export type UserDetailProps = {
  loggedInRole: UserRole;
  user: User;
};

export function UserDetail({ loggedInRole, user }: UserDetailProps) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton />;
  }

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
