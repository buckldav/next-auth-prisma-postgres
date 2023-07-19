import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "@/pages/api/auth/[...nextauth]";
import { getUserByEmail } from "@/utils/getUser";
import { UserRole } from "@prisma/client";

export async function isLoggedIn(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, options);
  if (session) {
    const user = await getUserByEmail(session.user.email);
    return user;
  } else {
    throw new Error("401");
  }
}

export async function isAdminOrSelf(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const user = await isLoggedIn(req, res);

  if (user.userRole === UserRole.ADMIN || userId === user.id) {
    return user;
  } else {
    throw new Error("403");
  }
}

export async function isAdmin(req: NextApiRequest, res: NextApiResponse) {
  const user = await isLoggedIn(req, res);

  if (user.userRole === UserRole.ADMIN) {
    return user;
  } else {
    throw new Error("403");
  }
}
