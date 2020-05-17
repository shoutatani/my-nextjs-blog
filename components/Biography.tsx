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
          <a
            href={`https://twitter.com/${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitterはこちら。
          </a>
          {` `}
          <a
            href={`https://github.com/${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHubはこちら。
          </a>
        </p>
      </div>
    </div>
  );
}
