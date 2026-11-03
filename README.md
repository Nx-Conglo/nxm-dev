
# READ THIS #

- [To-Do List](#to-do-list-everytime)
- [Just Read](#.env-thing)
- [What Changed](#what-the-other-did)


### TO DO LIST EVERYTIME (Copy it locally) ###

``
N-Word
``

# 🔁 The Always-Do Checklist

## 0. Before you start ANY work (sync)

```bash
git checkout master
git pull origin master
```

**Why:** You want the latest master as your starting point. Skipping this is how you get painful merge conflicts later.

---

## 1. Create a feature branch

```bash
git checkout -b feature/short-descriptive-name
```

**Naming convention (pick one and stick to it):**

- `feature/navbar`
- `fix/footer-links`
- `chore/update-deps`
- `refactor/api-routes`

**Never work directly on master. Ever.**

---

## 2. Code + test locally

```bash
npm run dev
```

Make sure your change actually works in the browser before committing. If you added a new dependency:

```bash
npm install <package>
```

(that updates `package.json` + `package-lock.json` — commit both)

---

## 3. Stage + commit

```bash
git status                  # see what changed
git add .                   # stage everything (respects .gitignore)
git commit -m "feat: add navbar component"
```

**Commit message style (keep it consistent):**

- `feat: ...` — new feature
- `fix: ...` — bug fix
- `chore: ...` — deps, config, tooling
- `refactor: ...` — code restructure, no behavior change
- `style: ...` — formatting only
- `docs: ...` — README, comments

Keep commits small and focused. One logical change per commit.

---

## 4. Push your branch

```bash
git push origin feature/short-descriptive-name
```

First push of a new branch? Git will print a hint — use:

```bash
git push -u origin feature/short-descriptive-name
```

The `-u` sets upstream so future pushes are just `git push`.

---

## 5. Open a Pull Request on GitHub

- Go to the repo → you'll see a "Compare & pull request" banner.
- **Base:** `master` ← **Compare:** `feature/your-branch`
- Write a short description of what and why.
- Request review from your partner (top right → Reviewers).

**Do not merge your own PR until the other person has looked at it.**

---

## 6. Review the PR (the other person)

- Read the diff.
- Pull the branch locally if you want to test it:

```bash
git fetch origin
git checkout feature/their-branch
npm install          # only if deps changed
npm run dev
```

- Leave comments / approve.

Then the PR author merges (or reviewer — pick one, be consistent).

---

## 7. Merge + clean up

On GitHub: click **"Squash and merge"** (recommended for clean history) or **"Merge pull request"**.

Then delete the branch:

```bash
git checkout master
git pull origin master
git branch -d feature/short-descriptive-name    # local
```

(GitHub shows a "Delete branch" button after merging — use it to nuke the remote one.)

---

## 8. Stay synced mid-branch (if master moved while you were working)

If your partner merged something while you were on your branch:

```bash
git checkout master
git pull origin master
git checkout feature/your-branch
git merge master
```

Fix any conflicts now (small), not later (big). Then push:

```bash
git push
```

---

# 📋 TL;DR — The Ritual

```text
1. git checkout master && git pull origin master
2. git checkout -b feature/thing
3. code + npm run dev to test
4. git add . && git commit -m "feat: thing"
5. git push -u origin feature/thing
6. Open PR → partner reviews
7. Merge on GitHub → delete branch
8. git checkout master && git pull origin master
```

## Non-negotiables

❌ Never commit to master directly

❌ Never push `.env`, `node_modules`, `.next`

✅ Always pull master before branching

✅ Always get a review before merging

✅ Always pull master after merging


# .env thing #

Copy `.env.example` → `.env.local` and fill the blanks matching your data. But currently we don't have anything `.env` related so you can just ignore it for now but remember this for the future. 


# What the other did #

I did nothing but only changed the folder structures and shit. Only set up the scaffolds. Kept a `` .gitkeep `` file so it is tracked in github. That thing is safe to delete anytime when you start coding on that folder. I just created an initial branch and removed useless files too. And changed it to our branding. So now it is NxM first step rather than the template of NEXT.js. Just checkout and pull master before doing any stuff and always create a branch keeping the master safe and seperate.