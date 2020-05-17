import { Column, Columns, Container } from "bloomer";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  isHome?: boolean;
  metaDescription?: string;
  metaTitle?: string;
}

export default function Layout({
  children,
  isHome,
  metaDescription,
  metaTitle,
}: LayoutProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  });

  const blogName: string = "テクノロジーで現世をSurviveするブログ";
  return (
    <Container style={{ padding: "10px" }}>
      <Head>
        <title>{isHome ? blogName : `${metaTitle} - ${blogName}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={
            metaDescription
              ? metaDescription
              : "Web系技術メインのブログです。生きた証をここに・・・。"
          }
        />
        <meta
          name="og:title"
          content={isHome ? blogName : `${metaTitle} - ${blogName}`}
        />
        <meta name="og:site_name" content={blogName} />
        <meta
          name="og:description"
          content={
            metaDescription
              ? metaDescription
              : "Web系技術メインのブログです。生きた証をここに・・・。"
          }
        />
        <meta name="og:type" content={isHome ? `website` : `article`} />
        <meta
          property="og:image"
          content={`https://blog.tan-shio.com/my_moon.jpg`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="shoutatani" />
        <meta
          name="twitter:title"
          content={isHome ? blogName : `${metaTitle} - ${blogName}`}
        />
        <meta
          name="twitter:description"
          content={
            metaDescription
              ? metaDescription
              : "Web系技術メインのブログです。生きた証をここに・・・。"
          }
        />
      </Head>
      <Columns isDesktop>
        <Column isSize={{ mobile: 12, touch: 12, default: 9 }}>
          {header(isHome)}
          <hr />
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, テクノロジーで現世をSurviveするブログ
            All Rights Reserved.
          </footer>
        </Column>
        <Column isHidden={"touch"}>
          <a
            className="twitter-timeline "
            data-lang="ja"
            data-width="350"
            data-height="700"
            data-theme="light"
            href="https://twitter.com/shoutatani?ref_src=twsrc%5Etfw"
          >
            Tweets by shoutatani
          </a>
        </Column>
      </Columns>
    </Container>
  );
}

function header(isHome: boolean) {
  const blogName: string = "テクノロジーで現世をSurviveするブログ";
  if (isHome) {
    return (
      <header>
        <h1
          style={{
            fontFamily: `sans-serif`,
            marginBottom: "10px",
            marginTop: 0,
          }}
        >
          <Link href="/">
            <a
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
            >
              {blogName}
            </a>
          </Link>
        </h1>
      </header>
    );
  }

  return (
    <header>
      <h3
        style={{
          fontFamily: `sans-serif`,
          marginTop: 0,
        }}
      >
        <Link href="/">
          <a
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
          >
            {blogName}
          </a>
        </Link>
      </h3>
    </header>
  );
}
