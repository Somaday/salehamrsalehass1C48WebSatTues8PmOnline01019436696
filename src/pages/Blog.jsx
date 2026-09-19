import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import Pagination from "../components/Pagination.jsx";
import siteData from "../data/siteData.js";
import "./Blog.css";

const { posts, categories } = siteData;
const PAGE_SIZE = 6;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const view = searchParams.get("view") || "grid";
  const page = Number(searchParams.get("page") || 1);

  function updateParams(patch, resetPage = false) {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    if (resetPage) next.delete("page");
    setSearchParams(next);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !category || post.category === category;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <section className="section blog-page">
      <div className="container">
        <div className="blog-head">
          <span className="eyebrow">المدونة</span>
          <h1>كل التدوينات</h1>
          <p aria-live="polite">
            عرض {filtered.length} مقالات {category ? `في «${category}»` : ""}
          </p>
        </div>

        <div className="blog-toolbar">
          <div className="blog-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.3-4.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              placeholder="ابحث عن تدوينة..."
              value={query}
              onChange={(e) => updateParams({ q: e.target.value }, true)}
              aria-label="البحث عن تدوينة"
            />
          </div>

          <div
            className="blog-categories"
            role="group"
            aria-label="تصفية حسب القسم"
          >
            <button
              type="button"
              className={!category ? "is-active" : ""}
              onClick={() => updateParams({ category: "" }, true)}
            >
              جميع المقالات
            </button>
            {categories.map((c) => (
              <button
                type="button"
                key={c.name}
                className={category === c.name ? "is-active" : ""}
                onClick={() => updateParams({ category: c.name }, true)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn blog-clear"
            onClick={() => setSearchParams({})}
            disabled={!query && !category}
          >
            مسح الفلاتر
          </button>

          <div className="view-toggle" role="group" aria-label="طريقة العرض">
            <button
              className={view === "grid" ? "is-active" : ""}
              onClick={() => updateParams({ view: "grid" })}
              aria-label="عرض شبكي"
              aria-pressed={view === "grid"}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="13"
                  y="3"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="13"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="13"
                  y="13"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              className={view === "list" ? "is-active" : ""}
              onClick={() => updateParams({ view: "list" })}
              aria-label="عرض قائمة"
              aria-pressed={view === "list"}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {pagePosts.length === 0 ? (
          <div className="blog-empty">
            <p>لا توجد تدوينات تطابق بحثك.</p>
            <button className="btn" onClick={() => setSearchParams({})}>
              مسح الفلاتر
            </button>
          </div>
        ) : (
          <>
            <div className={view === "grid" ? "post-grid" : "post-list"}>
              {pagePosts.map((post) => (
                <PostCard key={post.id} post={post} view={view} />
              ))}
            </div>

            <Pagination
              page={safePage}
              totalPages={totalPages}
              onChange={(n) => updateParams({ page: String(n) })}
            />
          </>
        )}
      </div>
    </section>
  );
}
