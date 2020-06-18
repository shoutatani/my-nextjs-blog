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
  const client: ContentfulClientApi = require("contentful").createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.CONTENT_DELIVERY_API_ACCESS_TOKEN,
  });

  const entries = await client.getEntries<ContentfulPostContentModel>({
    content_type: "post",
  });
  const allPostsData: Post[] = await Promise.all(
    entries.items.map(async (entry) => {
      const title = entry.fields.title;
      const date = new Date(entry.fields.date);
      const description = entry.fields.description;

      const processedContent = await remark()
        .use(html)
        .process(entry.fields.content);
      const contentHtml = processedContent.toString();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return {
        year,
        month,
        day,
        title,
        date,
        description,
        contentHtml: contentHtml,
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostIds(): Promise<PostDetailPageStaticPathType> {
  const items = await getSortedPostsData();
  return items.map((item) => {
    const year = item.year.toString();
    const month = item.month.toString();
    const day = item.day.toString();
    return {
      params: {
        year,
        month,
        day,
      },
    };
  });
}

export async function getPostData(
  year: number,
  month: number,
  day: number
): Promise<PostDetailPageData> {
  const posts = await getSortedPostsData();
  const post = posts.find((post) => {
    return post.year == year && post.month == month && post.day == day;
  });
  const postDate = post.date;
  const contentHtml = post.contentHtml;
  const date = postDate;
  const title = post.title;
  const description = post.description;
  const postIndex = posts.findIndex((post) => post.date === postDate);
  const prevPost = postIndex + 1 in posts ? posts[postIndex + 1] : null;
  const nextPost = postIndex - 1 in posts ? posts[postIndex - 1] : null;
  return {
    year,
    month,
    day,
    contentHtml,
    prevPost,
    nextPost,
    date,
    title,
    description,
  };
}
