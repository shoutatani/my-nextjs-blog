import { Column, Columns, Title } from "bloomer";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Biography from "../components/Biography";
import {
  PostDetailPageData,
  PostDetailPageStaticPathType
} from "../components/interface";
import Layout from "../components/layout";
import { getAllPostIds, getPostData } from "../lib/contentful_posts";

export default function Post({
  postDetail,
}: {
  postDetail: PostDetailPageData;
}) {
  const postDate = new Date(postDetail.date);
  const formatDate = `${postDate.getFullYear()}/${
    postDate.getMonth() + 1
  }/${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`;
  return (
    <Layout
      metaTitle={postDetail.title}
      metaDescription={postDetail.description}
    >
      <article>
        <header>
          <Columns isMobile>
            <Column isSize={7}>
              <Title isSize={5}>{postDetail.title}</Title>
            </Column>
            <Column isSize={5}>
              <Title isSize={6} style={{ textAlign: "right" }}>
                {formatDate}
              </Title>
            </Column>
          </Columns>
        </header>
        <hr style={{ marginBottom: "15px" }} />
        <section dangerouslySetInnerHTML={{ __html: postDetail.contentHtml }} />
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
            {postDetail.prevPost && (
              <Link href="/[slug]" as={`/${postDetail.prevPost.slug}`}>
                <a>← {postDetail.prevPost.title}</a>
              </Link>
            )}
          </li>
          <li>
            {postDetail.nextPost && (
              <Link href="/[slug]" as={`/${postDetail.nextPost.slug}`}>
                <a>{postDetail.nextPost.title} →</a>
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
  const paths: PostDetailPageStaticPathType = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postDetail: PostDetailPageData = await getPostData(
    params.slug as string
  );
  return {
    props: {
      postDetail: JSON.parse(JSON.stringify(postDetail)),
    },
  };
};
