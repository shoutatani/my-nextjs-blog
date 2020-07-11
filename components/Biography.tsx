import Link from "next/link";

export default function Biography() {
  const author: string = "shoutatani"
  return (
    <div
      style={{
        display: `flex`,
        margin: "20px 0 10px 0",
      }}
    >
      <img
        src="/my_moon.jpg"
        style={{
          width: "50px",
          height: "50px",
          marginRight: "50px",
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `50%`,
        }}
      />
      <div>
        <span>
          渋谷のITベンチャーで働く <strong>{author}</strong> のテックブログ。
        </span>
        <p style={{ marginBottom: 0 }}>
          <span>Ninja250とPENTAX K3-Ⅱをお供に安らかな日々を過ごしてます。</span>
        </p>
        <p style={{ marginBottom: 0 }}>
          SNS Accounts:&nbsp;
          <a
            href={`https://twitter.com/${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          {` `}
          <a
            href={`https://github.com/${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          &nbsp;
          RSS Feeds: <Link href="/rss/2.0.xml"><a>RSS2.0</a></Link> <Link href="/rss/atom.xml"><a>Atom</a></Link>
        </p>
      </div>
    </div>
  );
}
