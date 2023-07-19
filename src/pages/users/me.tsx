import { InferGetServerSidePropsType, NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { UserDetail } from "@/components/user/user-detail";
import { getUserByEmail } from "@/utils/getUser";
import { options } from "@/pages/api/auth/[...nextauth]";
import prisma from "%/prisma";

function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!props.user) return null;
  return <UserDetail {...props} />;
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  // @ts-ignore
  const session = await getServerSession(ctx.req, ctx.res, options);
  // @ts-ignore
  const user = await getUserByEmail(session.user.email);
  return { props: { loggedInRole: user.userRole, user } };
};

export default Page;
