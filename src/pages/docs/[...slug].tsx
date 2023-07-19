import Image from "next/image";
import matter from "gray-matter";
import glob from "glob";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Markdown from "@/components/markdown";
import { MainLayout } from "@/components/layout/main";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { reformatDate } from "@/utils/string";

export default function BlogTemplate({
      frontmatter,
      markdownBody,
      siteTitle,
    }: InferGetStaticPropsType<typeof getStaticProps>) {
  const crumbs = window.location.pathname.split("/").slice(1);

  return (
    <>
      <Head>
        <title>{siteTitle} | Docs</title>
      </Head>
      <MainLayout wide={true}>
        <div>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            {crumbs.map((crumb, i) => (
              <Link
                href={`/${crumbs.slice(0, i + 1).join("/")}`}
                key={crumb + i}
              >
                {crumb}
              </Link>
            ))}
          </Breadcrumbs>
          <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
            {frontmatter.title}
          </Typography>
          <Typography component="h3" variant="h6" sx={{ marginBottom: 4 }}>
            {reformatDate(frontmatter.date)} | Original Author:{" "}
            {frontmatter.author}
          </Typography>
        </div>

        <div>
          <Markdown markdown={markdownBody} />
        </div>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const { slug } = context.params;
  // retrieving the Markdown file associated to the slug
  // and reading its data
  const content = await import(
    `../../docs/${(slug as Array<string>).join("/")}.md`
  );
  const data = matter(content.default);

  return {
    props: {
      siteTitle: data.data.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
};

export async function getStaticPaths() {
  // getting all .md files from the docs directory
  const blogs = glob.sync(`src/docs/**/*.md`);
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

  return {
    paths,
    fallback: false,
  };
}
