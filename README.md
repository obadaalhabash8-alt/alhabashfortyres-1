# الحبش للإطارات — Al-Habash Tyres

Marketing and reviews website for Al-Habash Tyres Company (شركة الحبش للإطارات), established 1967. Arabic-first, bilingual (AR/EN), mobile-first.

**Stack:** Next.js 15 · React 19 · Tailwind CSS · Supabase (PostgreSQL + Storage) · Vercel

---

## Running locally

### Step 1 — Install dependencies

```bash
npm install
```

> If `node_modules/` already exists (e.g. cloned with it), skip this step.

### Step 2 — Set up Supabase (one-time)

1. Go to [supabase.com](https://supabase.com) → create a free account → **New project**

2. Open **SQL Editor** and run:

```sql
CREATE TABLE ratings (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id    integer     NOT NULL,
  name       text        NOT NULL,
  rating     integer     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment    text        DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read ratings"   ON ratings FOR SELECT USING (true);
CREATE POLICY "insert ratings" ON ratings FOR INSERT WITH CHECK (true);
```

3. Go to **Storage → New bucket**:
   - Name: `shop-gallery`
   - Public: **on**

4. Go to **Project Settings → API** and copy your keys (needed in Step 3).

### Step 3 — Create `.env.local`

Create a file called `.env.local` in the project root:

```env
# From Supabase → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin dashboard — choose any strong password
ADMIN_PASSWORD=your-admin-password

# Generate this once with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_TOKEN=your-64-char-hex-token
```

### Step 4 — Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| URL | What it is |
|---|---|
| `/` | Homepage — hero, story, timeline, shop cards |
| `/shops` | All 3 branches listed |
| `/shops/1` `/shops/2` `/shops/3` | Shop detail — services, gallery, map, reviews |
| `/rate?shop=1` | QR-accessible rating form |
| `/admin` | Admin dashboard (not linked publicly) |

---

## Admin dashboard

Go to `/admin` in the browser. Not linked anywhere on the public site — only accessible if you know the URL.

| Tab | What you can do |
|-----|----------------|
| Reviews | Sort, browse, and delete customer reviews |
| Gallery | Upload and delete shop photos (stored in Supabase Storage) |

The shop switcher in the top bar lets you jump between all 3 shops without going back.

---

## Deploying to Vercel

1. Push to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Add all 5 environment variables from `.env.local` in Vercel's project settings
4. Click **Deploy**

After deploying, QR codes should point to:
```
https://your-domain.com/rate?shop=1
https://your-domain.com/rate?shop=2
https://your-domain.com/rate?shop=3
```

---

## Customising shop data

Open the file `lib/shops.ts` in VS Code (or any code editor). It contains all shop information as plain TypeScript objects — just edit the values, save the file, and the site updates.

Fields to update per shop:

- `phone` / `whatsapp` — real phone numbers
- `address` / `city` — real addresses in Arabic (`ar`) and English (`en`)
- `mapUrl` — the Google Maps link for the location
- `mapEmbed` — from Google Maps → Share → Embed a map → copy the `src` value from the iframe code
- `coverImage` — the hero image shown at the top of the shop page

After editing, commit and push to GitHub and Vercel will automatically redeploy.

> Gallery photos (the "Our Gallery" section on each shop page) are managed through the admin dashboard — no code changes needed for those.

---

## Project structure

```
app/
  (site)/               Public website (has Navbar + Footer)
    page.tsx            Homepage
    shops/              Shop listing and detail pages
    rate/               QR rating form
  admin/                Admin dashboard (no Navbar/Footer)
    login/
    shops/[id]/
  api/
    ratings/            GET — fetch reviews
    rate/               POST — submit a review
    average-rating/     GET — compute average
    admin/
      login/            POST — set session cookie
      logout/           POST — clear session cookie
      ratings/          GET + DELETE — admin review management
      gallery/          GET + POST + DELETE — photo management

components/             Shared React components
lib/
  shops.ts              All shop data (edit this)
  supabase.ts           Client-side Supabase
  supabaseServer.ts     Server-side Supabase (service role key)
locales/
  ar.ts / en.ts         All UI strings
```
