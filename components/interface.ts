import { EntryFields } from "contentful";

export interface ContentfulPostContentModel {
  title: EntryFields.Text;
  slug: EntryFields.Text;
  date: EntryFields.Date;
  description: EntryFields.Text;
  content: EntryFields.Text;
}

export interface Post {
  title: string;
  slug: string;
  date: Date;
  description: string;
  contentHtml: string;
}

export type PostIndexPageData = Post[];

export interface PostDetailPageData extends Post {
  prevPost: Post;
  nextPost: Post;
}

export type PostDetailPageStaticPathType = {
  params: { slug: string };
}[];
