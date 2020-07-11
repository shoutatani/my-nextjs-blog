require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env.production.local" });

import { Feed } from "feed";
import fs from "fs";
import { getSortedPostsData } from "./contentful_posts";

(async function () {

  console.log("env=", process.env);

  const feed = new Feed({
    title: "テクノロジーで現世をSurviveするブログ",
    description:
      "渋谷のITベンチャーで働く shoutatani のテックブログ。Ninja250とPENTAX K3-Ⅱをお供に安らかな日々を過ごしてます。",
    id: "https://blog.tan-shio.com/",
    link: "https://blog.tan-shio.com/",
    language: "ja",
    image: "https://blog.tan-shio.com/my_moon.jpg",
    favicon: "https://blog.tan-shio.com/favicon.ico",
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
  feed.addCategory("Technology");

  fs.writeFileSync("public/rss/2.0.xml", new TextEncoder().encode(feed.rss2()));

  fs.writeFileSync(
    "public/rss/atom.xml",
    new TextEncoder().encode(feed.atom1())
  );
})();
