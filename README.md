# Next.js + NextAuth + Prisma + PostgreSQL

## Features

- [MaterialUI](https://mui.com/material-ui/) with a custom theme at `src/theme.ts`
- Email authentication with [NextAuth](https://next-auth.js.org/)
- [Storybook](https://storybook.js.org/) for component development
- [Prisma](https://www.prisma.io/) for database schema and migrations
- [PostgreSQL](https://www.postgresql.org/) database (docker compose included)
- Markdown docs rendering with [`react-markdown`](https://www.npmjs.com/package/react-markdown) and [`gray-matter`](https://www.npmjs.com/package/gray-matter)
- Testing with [`vitest`](https://vitest.dev/)
- Import aliases (see `tsconfig.json`)

## Getting Started

### Environment

```bash
# set up environment
cp .env.example .env
```

In the `.env` file, use whatever you want for the `POSTGRES_USER` and `POSTGRES_PASSWORD`, then the `DATABASE_URL` becomes:

```
DATABASE_URL=postgres://dbname:password@127.0.0.1:5432/dbname
POSTGRES_USER=dbname
POSTGRES_PASSWORD=password
```

You can generate random secrets like passwords and `NEXTAUTH_SECRET` in one go with

```bash
# 32 is the length of the secret
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

#### SendGrid

Because our stack uses Email Auth, you'll need a [SendGrid API Key](https://sendgrid.com/). The `SMTP_USER` will be `apikey` and your API key will go in the `SMTP_PASSWORD` field. `SMTP_FROM` matches your verified sender in SendGrid.

### PostgreSQL Database

#### Option 1: Docker (recommended)

(Windows): make sure Docker Desktop is running.

```bash
# for the database, starts the PostgreSQL container.
docker compose up -d
```

#### Option 2: Download Postgres

Run it locally: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

### Scripts For Dev

```bash
npm install
# run thing
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma

Use these commands for creating users and other records as needed:

```bash
# after schema update for types
npx prisma generate
# studio interface
npx prisma studio
# migration
npx prisma migrate dev
```

## Storybook

```bash
npm run storybook
```

Create stories in the same directory as the components. (e.g. `user-detail.tsx` and `user-detail.stories.tsx` are in the same directory).

### Examples

See examples of stories and documentation in `src/stories`. You can delete these after viewing them.

### Create Component + Story Boilerplate

Script to create a component and story and open in VSCode. Creates any needed directories.

```sh
cd ~ # root of the project
sh scripts/newComponent.sh <file_path> <component_name> <story_name>
# example usage
sh scripts/newComponent.sh src/components/group/my-component MyComponent "Group/My Component"
```

## Unit Tests

Mocks are written in `lib/__mocks__`, tests are written in `test/index.test.ts`

```bash
npm run test
```
