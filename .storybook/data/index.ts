import { UserRole } from "@prisma/client";

export const users = [
  {
    userRole: "BASE" as UserRole,
    name: "David Buckley",
    email: "dave@example.com",
    emailVerified: new Date(),
    isActive: true,
  },
];

export const session = {
  user: users[0],
  accessToken: "access",
  expires: "never",
};
