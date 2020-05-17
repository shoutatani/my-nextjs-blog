import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

function getAllPostFullPaths(directoryPath: string) {
  const fileNames = fs.readdirSync(directoryPath);
  let fullPaths: string[] = [];
  fileNames.forEach((fileName) => {
    const fullPath = path.join(directoryPath, fileName);
    const stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      fullPaths.push(fullPath);
    } else if (stats.isDirectory()) {
      fullPaths = [...fullPaths, ...getAllPostFullPaths(fullPath)];
    }
  });
  return fullPaths;
}

export function getSortedPostsData() {

  const fullPaths = getAllPostFullPaths(postsDirectory);
  const allPostsData = fullPaths.map(fullPath => {

    const postsLayer = fullPath.match(/\/(\d{4})\/(\d{2})\/(\d{2})\/index.md$/)
    const year = postsLayer[1];
    const month = postsLayer[2];
    const day = postsLayer[3];

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents)

    return {
      year,
      month,
      day,
      ...(matterResult.data as { title: string, date: string, description: string })
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fullPaths = getAllPostFullPaths(postsDirectory);
  return fullPaths.map(fullPath => {
    const postsLayer = fullPath.match(/\/(\d{4})\/(\d{2})\/(\d{2})\/index.md$/)
    const year = postsLayer[1];
    const month = postsLayer[2];
    const day = postsLayer[3];
    return {
      params: {
        year,
        month,
        day
      }
    }
  })
}

export async function getPostData(year: string, month: string, day: string) {
  const fullPath = path.join(postsDirectory, `/${year}/${month}/${day}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  const postDate = matterResult.data.date as string;
  const posts = getSortedPostsData();
  const postIndex = posts.findIndex((post) => post.date === postDate);
  const prevPost = (postIndex + 1 in posts ? posts[postIndex + 1] : null);
  const nextPost = (postIndex - 1 in posts ? posts[postIndex - 1] : null);

  return {
    year,
    month,
    day,
    contentHtml,
    prevPost,
    nextPost,
    ...(matterResult.data as { date: string; title: string, description: string })
  }
}
