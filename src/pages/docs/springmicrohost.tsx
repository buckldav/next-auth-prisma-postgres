import Head from "next/head";
import { MainLayout } from "@/components/layout/main";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import glob from "glob";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

function Page({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>SpringMicro Docs</title>
      </Head>
      <MainLayout>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Docs
        </Typography>
        <List>
          {pages.map((page) => (
            <ListItem key={page.href}>
              <Link href={page.href}>
                <ListItemText primary={page.title} secondary={page.summary} />
              </Link>
            </ListItem>
          ))}
        </List>
      </MainLayout>
    </>
  );
}

export async function getStaticProps(context) {
  // getting all .md files from the docs directory
  const blogs = glob.sync(`src/docs/springmicrohost/**/*.md`);
  // converting the file names to their slugs
  const blogSlugs = blogs.map((file) =>
    file
      .replace(/src\/docs\/|\.mdx?/g, "")
      .replace(/\s/g, "-")
      .split("/")
  );
  // console.log(blogSlugs);
  // creating a path for each of the `slug` parameter
  const paths = blogSlugs.map((slug) => {
    return { params: { slug: slug } };
  });

  const props = {
    pages: [] as Array<{ title: string; summary: string; href: string }>,
  };

  blogSlugs.forEach(async (slug) => {
    const content = await import(
      `../../docs/${(slug as Array<string>).join("/")}.md`
    );
    const data = matter(content.default);
    props.pages.push({
      title: data.data.title as string,
      summary: data.data.summary as string,
      href: `${(slug as Array<string>).join("/")}`,
    });
  });

  return {
    props,
  };
}

export default Page;
