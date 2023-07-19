// test/sample.test.ts
import { beforeAll, describe, expect, test, vi } from "vitest";
import { createUser, generateUser } from "../lib/__mocks__/data";
import prisma from "../lib/__mocks__/prisma";
import { User } from "@prisma/client";

vi.mock("../lib/prisma");

describe("User", () => {
  test("createUser should return the generated user", async () => {
    const newUser = generateUser();
    prisma.user.create.mockResolvedValue({ ...newUser, id: 1 });
    const user = await createUser(newUser);
    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });
});
