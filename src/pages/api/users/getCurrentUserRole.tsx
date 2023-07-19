import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "%/prisma";
import { isLoggedIn, isAdminOrSelf } from "@/permissions/api";

/**
 * Allowed Methods: GET
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await isLoggedIn(req, res);
    if (req.method === "GET" && user.userRole) {
      res.status(200).json({ userRole: user.userRole });
    } else {
      res.status(405);
    }
  } catch (e) {
    console.log(e.message);
    const status = parseInt(e.message);
    if (isNaN(status)) {
      res.status(500);
      res.statusMessage = e.message;
    } else {
      res.status(status);
    }
  }
  res.end();
};
