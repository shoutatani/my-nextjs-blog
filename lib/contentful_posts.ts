import { ContentfulClientApi } from "contentful";
import remark from "remark";
import html from "remark-html";
import {
  ContentfulPostContentModel,
  Post,
  PostDetailPageData,
  PostDetailPageStaticPathType
} from "../components/interface";

export async function getSortedPostsData(): Promise<Post[]> {
  let clientOption = {
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  };
  if (process.env.USE_PREVIEW == "1") {
    Object.assign(clientOption, { host: "preview.contentful.com" });
  }
  const client: ContentfulClientApi = require("contentful").createClient(
    clientOption
  );

  const entries = await client.getEntries<ContentfulPostContentModel>({
    content_type: "post",
  });
  const posts: Post[] = await Promise.all(
    entries.items.map(async (entry) => {
      const title = entry.fields.title;
      const slug = entry.fields.slug;
      const date = new Date(entry.fields.date);
      const description = entry.fields.description;

      const processedContent = await remark()
        .use(html)
        .process(entry.fields.content);
      const contentHtml = processedContent.toString();

      return {
        title,
        slug,
        date,
        description,
        contentHtml: contentHtml,
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPostIds(): Promise<PostDetailPageStaticPathType> {
  const items = await getSortedPostsData();
  return items.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));
}

export async function getPostData(slug: string): Promise<PostDetailPageData> {
  const posts = await getSortedPostsData();
  const post = posts.find((post) => post.slug === slug);
  const postDate = post.date;
  const title = post.title;
  const description = post.description;
  const contentHtml = post.contentHtml;
  const postIndex = posts.findIndex((post) => post.date === postDate);
  const prevPost = postIndex + 1 in posts ? posts[postIndex + 1] : null;
  const nextPost = postIndex - 1 in posts ? posts[postIndex - 1] : null;
  return {
    contentHtml,
    prevPost,
    nextPost,
    date: postDate,
    title,
    description,
    slug,
  };
}
