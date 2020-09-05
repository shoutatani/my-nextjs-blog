import { config } from "dotenv";
import { Feed } from "feed";
import fs from "fs";
import { getSortedPostsData } from "./contentful_posts";

config({ path: ".env" });
config({ path: ".env.local" });
config({ path: ".env.production.local" });

(async function () {
  const feed = new Feed({
    title: "テクノロジーで現世をSurviveするブログ",
    description:
      "渋谷のITベンチャーで働く shoutatani のテックブログ。Ninja250とPENTAX K3-Ⅱをお供に安らかな日々を過ごしてます。",
    id: "https://blog.tan-shio.com/",
    link: "https://blog.tan-shio.com/",
    // language: "ja",
    // image: "https://blog.tan-shio.com/my_moon.jpg",
    // favicon: "https://blog.tan-shio.com/favicon.ico",
    copyright: `© ${new Date().getFullYear()}, テクノロジーで現世をSurviveするブログ All Rights Reserved.`,
    feedLinks: {
      rss2: "https://blog.tan-shio.com/rss/2.0.xml",
      atom: "https://blog.tan-shio.com/rss/atom.xml",
    },
    author: {
      name: "shoutatani",
      link: "https://twitter.com/shoutatani",
    },
  });

  const posts = await getSortedPostsData();

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      link: `https://blog.tan-shio.com/${post.slug}`,
      description: post.description,
      author: [
        {
          name: "shoutatani",
          link: "https://twitter.com/shoutatani",
        },
      ],
      date: post.date,
    });
  });
  // feed.addCategory("Technology");

  const rss2 = feed
    .rss2()
    .replace(/<\!\[CDATA\[/g, "")
    .replace(/\]\]\>/g, "");
  fs.writeFileSync("public/rss/rss2.0.xml", new TextEncoder().encode(rss2));

  const atom1 = feed
    .atom1()
    .replace(/<\!\[CDATA\[/g, "")
    .replace(/\]\]\>/g, "");
  fs.writeFileSync("public/rss/atom.xml", new TextEncoder().encode(atom1));
})();
