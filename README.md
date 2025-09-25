# MIEZ - Make It Easy

## What I Choose

### Back-End

- NestJs
- Drizzle
- Zod
- drizzle-zod
- joi
- rxjs
- https://markdown-it.github.io/

### Front-End

- ReactJS - NextJS

## Tasks / MUST

### Public

- [x] / => Home Page
- [x] /auth/login => Login page
- [ ] /search => Search page
- [ ] /username => User detail
- [ ] /username/postSlug => Post view
- [ ] /tags => List tags
- [ ] /tags/name => Tag detail
- [ ] /articles => List article
- [ ] /articles/postSlug => List article
- [ ] /scripts => List scripts

### Protected

- [ ] /dashboard => list posts
- [ ] /dashboard/setting => setting user
- [x] /posts/new/ => new post
  - [x] create
  - [x] preview
- [ ] /posts/postSlug/ => preview post
- [ ] /posts/postSlug/edit/ => edit post
- [ ] /admin/ => admin page

## Tasks / SHOULD

### Public

- [ ] FEAT Like
- [ ] FEAT Comment

### Protected

- [ ] FEAT Report
- [ ] FEAT Send mail

## How to start?

- `Database` and `Authentication service`
  Run docker `cd docker` `docker compose up -d`

- server
  `cd server` `npm run start:debug`

- Drizzle studio
  `npx drizzle-kit studio`
