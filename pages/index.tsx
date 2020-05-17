import { Box, Column, Columns, Title } from "bloomer";
import { GetStaticProps } from "next";
import Link from "next/link";
import Biography from "../components/Biography";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/markdown_posts";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    description: string;
    year: string;
    month: string;
    day: string;
  }[];
}) {
  return (
    <Layout isHome>
      <Biography />
      {allPostsData.map(({ year, month, day, date, title, description }) => 
        <Link href="/[year]/[month]/[day]" as={`/${year}/${month}/${day}`} key={`${year}${month}${day}`}>
          <Box tag="a">
            <article>
              <header>
                <Columns isMobile={true}>
                  <Column isSize={7}>
                    <Title isSize={6}>{title}</Title>
                  </Column>
                  <Column isSize={5} style={{ textAlign: "right" }}>
                    <small>{date}</small>
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
          </Box>
        </Link>
      )}
      <hr />
    </Layout>
  );
}
