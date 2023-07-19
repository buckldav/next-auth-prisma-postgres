import { User, UserRole } from "@prisma/client";
import { NextApiRequest } from "next";
import prisma from "../../lib/prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return JSON.parse(JSON.stringify(user));
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return JSON.parse(JSON.stringify(user));
}

export function getUserIdForRequest(user: User, req: NextApiRequest) {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (user.userRole === UserRole.ADMIN && body.userId) {
    return body.userId;
  } else {
    return user.id;
  }
}
