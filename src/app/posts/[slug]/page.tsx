/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-return */
/* eslint-disable  @typescript-eslint/no-unsafe-call*/

import bookmarkPlugin from "@notion-render/bookmark-plugin";

import { NotionRenderer } from "@notion-render/client";

import hljsPlugin from "@notion-render/hljs-plugin";
import "katex/dist/katex.min.css";
import katex from "katex";

import { type Metadata } from "next";
import { unstable_cache } from "next/cache";
import Link from "next/link";

import { notFound } from "next/navigation";
import { fetchPageBlocks, fetchPageBySlug, notion } from "~/lib/notion";
import type { Block } from "@notion-render/client/dist/types";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const id = (await props?.params)?.slug ?? "";

  const post = await fetchPageBySlug(id);
  const name = post?.properties?.Name?.title[0]?.text?.content ?? "";

  return {
    title: name ?? "Francisco Veiras",
    description: "",
    authors: [{ name: "Francisco Veiras" }],
    openGraph: {
      title: `${name} | Francisco Veiras`,
      description: "",
      type: "website",
      url: `/posts/${id}`,
      images: [
        {
          url: `/api/og?title=${name}&username=${"Francisco Veiras"}`,
          width: 1200,
          height: 630,
          alt: `${name} | Francisco Veiras`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Francisco Veiras`,
      description: "",
      images: [`/api/og?title=${name}&username=${"Francisco Veiras"}`],
    },
  };
}

const getPost = unstable_cache(
  async (slug: string) => {
    const post = await fetchPageBySlug(slug);

    return { post };
  },
  ["blogpost"],
  { tags: ["blogpost"] },
);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await props?.params)?.slug ?? "";

  const { post } = await getPost(slug);

  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  await renderer.use(hljsPlugin({}));
  await renderer.use(bookmarkPlugin(undefined));

  const renderInlineContent = (richTextArray: any[]) => {
    return richTextArray
      .map((richText) => {
        if (richText.type === "equation") {
          return `<span class="inline-equation">${katex.renderToString(
            richText.equation.expression,
            { throwOnError: false },
          )}</span>`;
        }
        return richText.plain_text;
      })
      .join("");
  };

  const renderedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if ("type" in block) {
        if (block.type === "equation") {
          return `<div class="equation">${katex.renderToString(
            // @ts-expect-error: idk
            block.equation.expression,
            { throwOnError: false },
          )}</div>`;
        }

        // @ts-expect-error: idk
        if (block.type === "paragraph" || block.type.includes("heading")) {
          // @ts-expect-error: idk
          return `<p>${renderInlineContent(block[block.type].rich_text)}</p>`;
        }
      }

      return await renderer.render(block as unknown as Block);
    }),
  );

  const html = renderedBlocks.join("");

  const date = new Date(post.properties.Updated.last_edited_time);
  const formattedDate = date.toDateString();

  return (
    <div className="m-auto my-14 flex w-full flex-col md:w-1/2 2xl:w-1/2">
      <Link href={"/posts"}>
        <p className="text-sm transition-all hover:!text-gray-200">
          ⟵ Back to posts
        </p>
      </Link>
      <h1 className="mt-8 text-3xl font-semibold">
        {post?.properties?.Name?.title[0]?.text?.content ?? ""}
      </h1>
      <p className="my-4">
        {formattedDate} · {post?.properties?.Tags.multi_select[0]?.name}
      </p>
      <div
        className="notion-editor"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
