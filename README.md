# عدسة (Adasa) — مدونة تصوير فوتوغرافي

مشروع React + React Router يطبّق الـ Client-Side Routing بالكامل بدون أي API — البيانات محلية في `src/data/posts.json`.

## التشغيل

```bash
npm install
npm run dev
```

ثم افتح الرابط اللي هيظهر في الطرفية (غالباً `http://localhost:5173`).

للبناء للإنتاج:

```bash
npm run build
npm run preview
```

## هيكل المشروع

```
src/
  data/posts.json        بيانات المدونة (Posts, Categories, SiteInfo)
  utils/helpers.js        دوال مساعدة (لون القسم، تنسيق التاريخ)
  components/
    Aperture.jsx           شعار العدسة (SVG)
    Header.jsx / Footer.jsx
    PostCard.jsx            بطاقة تدوينة (تدعم عرض Grid و List)
    Pagination.jsx
  pages/
    Home.jsx                الصفحة الرئيسية
    Blog.jsx                 صفحة المدونة: بحث + فلترة قسم + Grid/List + Pagination
    BlogDetails.jsx          صفحة تفاصيل التدوينة (route: /blog/:slug)
    NotFound.jsx             صفحة 404 (أي route غير معروف)
  App.jsx                    تعريف الـ Routes
  main.jsx                   نقطة الدخول + BrowserRouter
```

## المسارات (Routes)

| المسار | الصفحة |
|---|---|
| `/` | الرئيسية |
| `/blog` | كل التدوينات (بدعم `?q=`, `?category=`, `?view=`, `?page=` في الرابط) |
| `/blog/:slug` | تفاصيل تدوينة |
| `*` | 404 |

## ملاحظات

- الفلترة حسب القسم اتعملت عن طريق `<select>` وليس عن طريق navs/tabs، حسب المطلوب في التاسك.
- الـ Pagination بتعرض 6 تدوينات في كل صفحة (Bonus).
- حالة البحث والفلترة والعرض والصفحة كلها محفوظة في الـ URL (search params) — تقدر تنسخ الرابط وتشاركه ويرجع بنفس الحالة.
"# salehamrsalehass1C48WebSatTues8PmOnline01019436696" 
