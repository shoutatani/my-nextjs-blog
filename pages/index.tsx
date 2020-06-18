import { Column, Columns, Title } from "bloomer";
import { GetStaticProps } from "next";
import Link from "next/link";
import Biography from "../components/Biography";
import { PostIndexPageData } from "../components/interface";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/contentful_posts";

export const getStaticProps: GetStaticProps = async () => {
  const posts = JSON.parse(JSON.stringify(await getSortedPostsData()));
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: { posts: PostIndexPageData }) {
  return (
    <Layout isHome>
      <Biography />
      {posts.map(({ date, title, description, slug }) => {
        const postDate: Date = new Date(date);
        const formatDate = `${postDate.getFullYear()}/${
          postDate.getMonth() + 1
        }/${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`;
        return (
          <Link href={`/${slug}`} key={`${slug}`}>
            <a className="box">
              <article>
                <header>
                  <Columns isMobile={true}>
                    <Column isSize={7}>
                      <Title isSize={6}>{title}</Title>
                    </Column>
                    <Column isSize={5} style={{ textAlign: "right" }}>
                      <small>{formatDate}</small>
                    </Column>
                  </Columns>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </section>
              </article>
            </a>
          </Link>
        );
      })}
      <hr />
    </Layout>
  );
}
