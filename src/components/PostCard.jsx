import { Link } from "react-router-dom";
import { categoryColor, formatDate } from "../utils/helpers.js";
import "./PostCard.css";

export default function PostCard({ post, view = "grid" }) {
  const postPath = `/blog/${post.slug || post.id}`;

  return (
    <article className={`post-card post-card--${view}`}>
      <Link to={postPath} className="post-card__media">
        <img src={post.image} alt="" loading="lazy" />
        <span className="badge" data-cat={categoryColor(post.category)}>
          {post.category}
        </span>
      </Link>

      <div className="post-card__body">
        <div className="post-card__meta">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="post-card__title">
          <Link to={postPath}>{post.title}</Link>
        </h3>

        <p className="post-card__excerpt">{post.excerpt}</p>

        <div className="post-card__author">
          <img src={post.author.avatar} alt="" />
          <div>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
