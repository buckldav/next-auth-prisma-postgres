import { UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "%/prisma";
import { isLoggedIn, isAdminOrSelf } from "@/permissions/api";
import { getUserIdForRequest } from "@/utils/getUser";
import { options } from "../auth/[...nextauth]";

/**
 * Allowed Methods: GET, ?userRole=ADMIN
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userRole } = req.query;

  try {
    const user = await isLoggedIn(req, res);

    if (req.method === "GET") {
      // console.log(req.body);
      try {
        const users = await prisma.user.findMany({
          where: {
            isActive: true,
            userRole: userRole
              ? UserRole[userRole as keyof typeof UserRole]
              : undefined,
          },
        });
        res.status(200).json(
          users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            isActive: u.isActive,
          }))
        );
      } catch (e) {
        console.error(e);
        res.status(422);
      }
    } else {
      res.status(405);
    }
  } catch (e) {
    console.error(e);
    const status = parseInt((e as unknown as any).message);
    if (isNaN(status)) {
      res.status(500);
    } else {
      res.status(status);
    }
  }
  res.end();
};
