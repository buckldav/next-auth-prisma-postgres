// script.ts
import { Prisma, User } from "@prisma/client";
import prisma from "../prisma";
import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

function mockRequestResponse(method: RequestMethod = "GET") {
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
    createMocks({ method });
  req.headers = {
    "Content-Type": "application/json",
  };
  //req.query = { gatewayID: `${gatewayID}` };
  return { req, res };
}

export const generateUser = (user?: Prisma.UserCreateInput) => {
  const date = new Date();
  return {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    nickname: null,
    emailVerified: date,
    personalEmail: null,
    image: null,
    createdAt: date,
    updatedAt: date,
    isActive: true,
    userRole: UserRole.BASE,

    ...user,
  } as User;
};

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};
