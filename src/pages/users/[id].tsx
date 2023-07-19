import { InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getUserByEmail, getUserById } from "@/utils/getUser";
import UserDetail from "@/components/userDetail";
import { options } from "@/pages/api/auth/[...nextauth]";
import { OwnerGuard } from "@/guards";

function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!props.user) return null;
  return (
    <OwnerGuard>
      <UserDetail {...props} />
    </OwnerGuard>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, options);
  const { id } = ctx.query;
  const loggedInUser = await getUserByEmail(session.user.email);
  const user = await getUserById(parseInt(id));
  return {
    props: { loggedInRole: loggedInUser.userRole, user },
  };
};

export default Page;
