import React from "react";

import { StoryFn, Meta } from "@storybook/react";
import { UserDetailProps, UserDetail } from "./user-detail";
import { users } from "$/data";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "User/User Detail",
  component: UserDetail,
} as Meta<typeof UserDetail>;

export const Primary = {
  args: {
    loggedInRole: "BASE",
    user: users[0],
  } as UserDetailProps,
};

export const Admin = {
  args: {
    loggedInRole: "ADMIN",
    user: users[0],
  } as UserDetailProps,
};
