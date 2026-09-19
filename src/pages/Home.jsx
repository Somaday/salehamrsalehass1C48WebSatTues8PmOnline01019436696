import { Link } from "react-router-dom";
import Aperture from "../components/Aperture.jsx";
import PostCard from "../components/PostCard.jsx";
import siteData from "../data/siteData.js";
import { categoryColor } from "../utils/helpers.js";
import "./Home.css";

const { homePosts, categories, siteInfo, stats } = siteData;

export default function Home() {
  const featured = homePosts.filter((p) => p.featured).slice(0, 3);
  const latest = homePosts.slice(3, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <Aperture size={96} />
          <span className="eyebrow">مرحباً بك في عدسة</span>
          <h1>اكتشف فن التصوير الفوتوغرافي</h1>
          <p className="hero__desc">{siteInfo.description}</p>
          <div className="hero__actions">
            <Link to="/blog" className="btn btn-primary">
              استكشف المقالات
            </Link>
            <Link to="/#about" className="btn">
              اعرف المزيد
            </Link>
          </div>
        </div>
      </section>

      <section className="home-stats" aria-label="إحصاءات عدسة">
        <div className="container home-stats__grid">
          {stats.map((stat) => (
            <div key={stat.label} className="home-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">مميز</span>
              <h2>مقالات مختارة</h2>
            </div>
            <Link to="/blog" className="section-head__link">
              عرض الكل
            </Link>
          </div>

          <div className="post-grid">
            {featured.map((post) => (
              <PostCard key={post.id} post={post} view="grid" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--categories">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">التصنيفات</span>
              <h2>استكشف حسب الموضوع</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/blog?category=${encodeURIComponent(c.name)}`}
                className="category-tile"
                data-cat={categoryColor(c.name)}
              >
                <span className="category-tile__count">
                  {String(c.count).padStart(2, "0")}
                </span>
                <span className="category-tile__name">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-strip" id="about">
        <div className="container about-strip__inner">
          <div>
            <span className="eyebrow">عن عدسة</span>
            <h2>مرحباً بك في عالم التصوير الفوتوغرافي.</h2>
          </div>
          <p>
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">الأحدث</span>
              <h2>أحدث المقالات</h2>
            </div>
            <Link to="/blog" className="section-head__link">
              عرض جميع المقالات
            </Link>
          </div>

          <div className="post-list">
            {latest.map((post) => (
              <PostCard key={post.id} post={post} view="list" />
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter section">
        <div className="container newsletter__inner">
          <span className="eyebrow">اشترك في نشرتنا الإخبارية</span>
          <h2>
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك
            الإلكتروني
          </h2>
          <form
            className="newsletter__form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              aria-label="بريدك الإلكتروني"
            />
            <button type="submit" className="btn btn-primary">
              اشترك
            </button>
          </form>
          <p>انضم لـ +10,000 مصور · بدون إزعاج · إلغاء الاشتراك في أي وقت</p>
        </div>
      </section>
    </>
  );
}
