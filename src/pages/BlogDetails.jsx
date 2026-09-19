import { Link, useParams, Navigate } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import siteData from "../data/siteData.js";
import { categoryColor, formatDate } from "../utils/helpers.js";
import "./BlogDetails.css";

const { posts } = siteData;

function renderContent(content) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.replace("## ", "")}</h2>;
    }
    return <p key={i}>{block}</p>;
  });
}

export default function BlogDetails() {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);

  if (!post) return <Navigate to="/404" replace />;

  const related = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <article className="post-details">
      <div className="post-details__hero">
        <img src={post.image} alt="" />
        <div className="post-details__hero-overlay" />
      </div>

      <div className="container post-details__container">
        <nav className="post-details__breadcrumb">
          <Link to="/">الرئيسية</Link>
          <span>/</span>
          <Link to="/blog">المدونة</Link>
          <span>/</span>
          <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>
            {post.category}
          </Link>
        </nav>

        <Link to="/blog" className="btn post-details__back">
          العودة إلى المدونة
        </Link>

        <span className="badge" data-cat={categoryColor(post.category)}>
          {post.category}
        </span>
        <h1>{post.title}</h1>

        <div className="post-details__meta">
          <img src={post.author.avatar} alt="" />
          <div>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
          <span className="post-details__meta-dot" aria-hidden="true">
            ·
          </span>
          <span>{formatDate(post.date)}</span>
          <span className="post-details__meta-dot" aria-hidden="true">
            ·
          </span>
          <span>{post.readTime}</span>
        </div>

        <div className="post-details__content">
          {renderContent(post.content)}
        </div>

        <div className="post-details__tags">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?q=${encodeURIComponent(tag)}`}
              className="tag"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {related.length > 0 && (
          <section className="post-details__related">
            <h3>تدوينات ذات صلة</h3>
            <div className="post-grid">
              {related.map((p) => (
                <PostCard key={p.id} post={p} view="grid" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
