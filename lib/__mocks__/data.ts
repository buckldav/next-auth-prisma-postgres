// script.ts
import { AddressUSA, Prisma, User } from "@prisma/client";
import prisma from "../prisma";
import {
  EmployeeHours,
  EmployeePaymentStructure,
  EmployeeStatus,
  Role,
  UserRole,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import addressIndex from "../../pages/api/addresses/index";

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
    title: null,
    jobDescription: null,
    employeeHours: EmployeeHours.PART_TIME,
    employeeStatus: EmployeeStatus.INTERN,
    employeePaymentStructure: EmployeePaymentStructure.HOURLY,
    role: Role.INTERN,
    userRole: UserRole.BASE,

    ...user,
  } as User;
};

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};

export const generateAddress = (address?: Prisma.AddressUSACreateInput) => {
  return {
    isPrimaryMailingAddr: false,
    name: faker.name.fullName(),
    streetAddress: faker.address.streetAddress(),
    streetAddress2: null,
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    userId: 1,
    ...address,
  };
};

// export const createAddress = async (address: Prisma.AddressUSACreateInput) => {
//   const { req, res } = mockRequestResponse();
//   addressIndex(req, res);
//   return;
// };
