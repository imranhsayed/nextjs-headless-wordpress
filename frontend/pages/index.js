import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/slugs">
        <a>Slug</a>
      </Link>
      <div
        style={{
          margin: "50px",
          justifyContent: "center",
          display: "flex",
          fontSize: "60px",
        }}
      >
        Welcome!
      </div>
    </div>
  );
};

export default Home;
