import { InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import UserDetail from "@/components/userDetail";
import { getUserByEmail } from "@/utils/getUser";
import { options } from "@/pages/api/auth/[...nextauth]";
import prisma from "%/prisma";

function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!props.user) return null;
  return <UserDetail {...props} />;
}

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, options);
  const user = await getUserByEmail(session.user.email);
  return { props: { loggedInRole: user.userRole, user } };
};

export default Page;
