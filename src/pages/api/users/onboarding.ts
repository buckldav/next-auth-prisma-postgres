import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { isLoggedIn, isAdminOrSelf } from "../../../src/permissions/api";
import fetchOnboardingServerSide from "../../../src/utils/fetch/onboardingServerSide";

/**
 * Allowed Methods: GET
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await isLoggedIn(req, res);
    if (req.method === "GET") {
      const { onboarding } = await fetchOnboardingServerSide(user);
      res.status(200).json(onboarding);
    } else {
      res.status(405);
    }
  } catch (e) {
    const status = parseInt(e.message);
    if (isNaN(status)) {
      console.error(e);
      res.status(500);
    } else {
      res.status(status);
    }
  }
  res.end();
};
