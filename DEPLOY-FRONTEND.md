# BizxFlow Frontend — Folder setup, GitHub, and domain

You have: **frontend folder** (not on GitHub) + **domain**. Follow these steps.

---

## Full-stack = backend + frontend (two repos is correct)

| Repo                                                                               | What it is                                                                      | Where it runs                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| **BizxFlow** (this repo)                                                           | Backend API — Node, Express, MongoDB, auth, tasks, leave, attendance, dashboard | Railway → `bizxflow-production.up.railway.app` |
| **BizxFlow-Frontend** ([GitHub](https://github.com/UzairBaluch/BizxFlow-Frontend)) | Frontend UI — React/Vite/TS, calls the API, your domain                         | Vercel/Netlify → your domain                   |

Together = **one full-stack product**. Two repos is normal and correct; many companies ship this way. In interviews you say: “BizxFlow is a full-stack app: REST API on Railway, React frontend on my domain.”

**Keep in sync:**

- Frontend `.env`: `VITE_API_URL` or `NEXT_PUBLIC_API_URL` = your backend URL.
- Backend: `CORS_ORIGIN` should include your frontend domain (e.g. `https://app.yourdomain.com`) so the browser allows requests.

---

## 1. Folder setup (your front folder)

Your frontend project should have at least:

```
your-front-folder/
├── .gitignore
├── .env.example
├── package.json
├── README.md
├── index.html          (if Vite/CRA)
├── vite.config.js      (or next.config.js)
└── src/
    ├── api/            (client that calls backend)
    ├── components/
    ├── pages/
    └── ...
```

### Add these if missing

**`.gitignore`** (in front folder):

```
node_modules
.env
.env.local
.env.*.local
dist
build
.vercel
.netlify
*.log
.DS_Store
```

**`.env.example`** (in front folder):

```
VITE_API_URL=https://bizxflow-production.up.railway.app
```

If Next.js use `NEXT_PUBLIC_API_URL` instead of `VITE_API_URL`.

**`.env`** (in front folder, do not commit):

- Copy from `.env.example` and keep the same API URL (or change for local backend).

---

## 2. Put the frontend on GitHub

**Option A — Separate repo (recommended for Vercel/Netlify)**

1. Open terminal, go to your **front folder**:
   ```bash
   cd /path/to/your-front-folder
   ```
2. Initialize and first commit:
   ```bash
   git init
   git add .
   git commit -m "Initial frontend"
   ```
3. On GitHub: **New repository** (e.g. `BizxFlow-Frontend`). Do **not** add README or .gitignore (you already have them).
4. Push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/BizxFlow-Frontend.git
   git branch -M main
   git push -u origin main
   ```

**Option B — Same repo (monorepo)**

1. In BizxFlowio repo, create a `frontend` folder.
2. Copy your front folder contents into `frontend/`.
3. Add and commit:
   ```bash
   git add frontend/
   git commit -m "Add frontend"
   git push
   ```
4. When deploying (Vercel/Netlify), set **Root directory** to `frontend`.

---

## 3. Deploy frontend and connect your domain

**Vercel (good for React/Vite/Next)**

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub.
2. **Add New Project** → Import your **frontend repo** (e.g. `BizxFlow-Frontend`).
3. **Root directory:** leave empty (or `frontend` if monorepo).
4. **Environment variables:** add `VITE_API_URL` or `NEXT_PUBLIC_API_URL` = `https://bizxflow-production.up.railway.app`.
5. Deploy. You get a URL like `bizxflow-frontend.vercel.app`.
6. **Settings → Domains** → Add your domain (e.g. `app.yourdomain.com` or `yourdomain.com`). Follow DNS instructions (add CNAME or A record where you bought the domain).

**Netlify**

1. [netlify.com](https://netlify.com) → Sign in with GitHub.
2. **Add new site** → Import frontend repo.
3. **Build command:** `npm run build`. **Publish directory:** `dist` (Vite) or `out`/`build` (depending on your app).
4. **Environment variables:** same API URL as above.
5. Deploy. Then **Domain settings** → Add custom domain → follow DNS steps.

---

## 4. Checklist

- [ ] Front folder has `.gitignore`, `.env.example`, and real `.env` (not committed).
- [ ] Frontend repo is on GitHub (separate repo or inside BizxFlowio).
- [ ] Deployed on Vercel or Netlify; build succeeds.
- [ ] Custom domain added in Vercel/Netlify and DNS updated.
- [ ] In browser: your domain loads the app and it can call `bizxflow-production.up.railway.app` (check Network tab if login fails).

If your front folder path or repo name is different, replace paths and repo URLs in the steps above.
