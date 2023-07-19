import { UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "%/prisma";
import { isAdminOrSelf } from "@/permissions/api";
/**
 * Allowed Methods: PUT
 * OWNER: Can change role and isActive
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const user = await isAdminOrSelf(req, res, parseInt(id as string));
    if (req.method === "PUT") {
      const body = JSON.parse(req.body);
      delete body["email"];
      if (user.userRole !== UserRole.ADMIN) {
        delete body["isActive"];
        delete body["userRole"];
      }
      try {
        const userUpdated = await prisma.user.update({
          where: {
            id: parseInt(id as string),
          },
          data: {
            ...body,
          },
        });
        res.status(200).json(userUpdated);
      } catch (e) {
        console.error(e);
        res.status(422);
      }
    } else {
      res.status(405);
    }
  } catch (e) {
    const status = parseInt((e as unknown as any).message);
    if (isNaN(status)) {
      res.status(500);
    } else {
      res.status(status);
    }
  }
  res.end();
};
