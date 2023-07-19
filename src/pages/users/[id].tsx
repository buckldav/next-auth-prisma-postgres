import { InferGetServerSidePropsType, NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getUserByEmail, getUserById } from "@/utils/getUser";
import { UserDetail } from "@/components/user/user-detail";
import { options } from "@/pages/api/auth/[...nextauth]";
import { AdminGuard } from "@/guards";

function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!props.user) return null;
  return (
    <AdminGuard>
      <UserDetail {...props} />
    </AdminGuard>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  // @ts-ignore
  const session = await getServerSession(ctx.req, ctx.res, options);
  const { id } = ctx.query;
  // @ts-ignore
  const loggedInUser = await getUserByEmail(session.user.email);
  // @ts-ignore
  const user = await getUserById(parseInt(id));
  return {
    props: { loggedInRole: loggedInUser.userRole, user },
  };
};

export default Page;
