import "server-only";

import { Client } from "@notionhq/client";

export interface Post {
  id: string;
  object: string;
  properties: {
    Description: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    Name: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    Slug: {
      formula: {
        string: string;
      };
    };
    URL: {
      url: string;
    };
    Updated: {
      last_edited_time: string;
    };
    Tags: {
      multi_select: {
        name: string;
      }[];
    };
  };
}

import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(async (): Promise<Post[]> => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  });

  return res.results as Post[];
});

export const fetchLatestPages = React.cache(async (): Promise<Post[]> => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
    page_size: 3,
  });

  return res.results as Post[];
});

export const fetchLatestProjects = React.cache(async (): Promise<Post[]> => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Tags",
      multi_select: {
        contains: "Project",
      },
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
    page_size: 3,
  });

  return res.results as Post[];
});

export const fetchPageBySlug = React.cache(
  async (slug: string): Promise<Post> => {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        formula: {
          string: {
            contains: slug,
          },
        },
      },
    });

    return res.results[0] as Post;
  },
);

export async function fetchPageBlocks(pageId: string) {
  const blocks = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...response.results);
    cursor = response?.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}
