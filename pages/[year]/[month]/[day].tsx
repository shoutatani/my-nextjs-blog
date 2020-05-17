import { Column, Columns, Title } from "bloomer";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Biography from "../../../components/Biography";
import Layout from "../../../components/layout";
import { getAllPostIds, getPostData } from "../../../lib/markdown_posts";

export default function Post({
  postData,
}: {
  postData: {
    year: string;
    month: string;
    day: string;
    title: string;
    date: string;
    description: string;
    contentHtml: string;
    prevPost: any;
    nextPost: any;
  };
}) {
  return (
    <Layout metaTitle={postData.title} metaDescription={postData.description}>
      <article>
        <header>
          <Columns isMobile>
            <Column isSize={7}>
              <Title isSize={5}>{postData.title}</Title>
            </Column>
            <Column isSize={5}>
              <Title isSize={6} style={{ textAlign: "right" }}>
                {postData.date}
              </Title>
            </Column>
          </Columns>
        </header>
        <hr style={{ marginBottom: "15px" }} />
        <section dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <hr style={{ marginTop: "15px" }} />
        <footer>
          <Biography />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {postData.prevPost && (
              <Link href="/[year]/[month]/[day]" as={`/${postData.prevPost.year}/${postData.prevPost.month}/${postData.prevPost.day}`}>
                <a>← {postData.prevPost.title}</a>
              </Link>
            )}
          </li>
          <li>
            {postData.nextPost && (
              <Link href="/[year]/[month]/[day]" as={`/${postData.nextPost.year}/${postData.nextPost.month}/${postData.nextPost.day}`}>
                <a>{postData.nextPost.title} →</a>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <hr />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(
    params.year as string,
    params.month as string,
    params.day as string
  );
  return {
    props: {
      postData,
    },
  };
};
