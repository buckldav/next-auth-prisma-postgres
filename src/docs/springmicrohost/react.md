---
title: React and Next.js Standards
date: "2023-05-03T16:04:44.000Z"
author: David Buckley
summary: Standards for developing frontends for SpringMicroHost with React-based systems.
---

## Standards

For frontends with [React.js](https://react.dev/), use the following:

### TypeScript and Project Config

- Use [TypeScript](https://www.typescriptlang.org/) whenever possible.
- For creating plain react apps, use `npm create vite@latest my-react-app --template react-ts`
- For creating full-stack [Next.js](https://nextjs.org/) apps, use [create t3 app](https://create.t3.gg/) with TypeScript, [NextAuth](https://next-auth.js.org/), and [Prisma ORM](https://www.prisma.io/), which supports PostgreSQL, SQLite, and MongoDB.

### Components and Icons

- [Material UI](https://mui.com/material-ui/) for components.
- [Material UI Icons](https://mui.com/material-ui/material-icons/) for icons. If there is a situation where material does not have an icon for the job, use a pack from [React Icons](https://react-icons.github.io/react-icons/). We will notate here when that occurs.
  - Rich text editor icons for the Bridge taken from [Ant Design Icons](https://react-icons.github.io/react-icons/icons?name=ai).

### Component-First Design

- Use [Storybook](https://storybook.js.org/) for atomic component creation and visual testing. Component-first design, with pages handling the data fetching.

### Data Fetching

- For server-side fetching in Next.js, use `getServerSideProps`.
- For client-side fetching, use [SWR](https://swr.vercel.app/) whenever possible.

### State Management

We haven't had the need for a state-management library like Redux or MobX yet. For shared global state where passing props doesn't make sense, use [React Context](https://react.dev/reference/react/useContext), which is a robust API that can be used with reducers.

### Other React Resources

Check out [awesome-react](https://github.com/enaqx/awesome-react) for other React resources or ask Dave. If you know of any cool React-related tools to integrate in our codebase, let us know!
