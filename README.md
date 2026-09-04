## 개발

```bash
npm install
npm run dev
```

## 새 글 작성하기

`src/posts/` 폴더에 `.md` 파일을 하나 추가하면 됩니다. 파일 상단에 아래 형식으로 frontmatter를 작성하세요.

```md
---
title: 글 제목
date: 2026-09-04
tags: [태그1, 태그2]
description: 목록에 보여줄 한 줄 설명
---

여기부터 본문을 마크다운으로 작성합니다.
```

- 파일명이 곧 글 주소(slug)가 됩니다. 예) `src/posts/my-post.md` → `/#/posts/my-post`
- `date`가 최신인 글이 목록 맨 위로 정렬됩니다.
- 홈 화면 태그 필터는 `src/lib/categories.js`에 등록된 고정 카테고리(`Network`, `Server`, `Dev`)만 표시됩니다. `tags`에는 이 중에서 골라 적어야 필터에 걸립니다. 카테고리 자체를 추가/변경하려면 `categories.js`를 수정하세요.
- 글에 이미지를 넣고 싶으면 파일을 `public/assets/`에 넣고 `![설명](/assets/파일명.png)`처럼 절대 경로로 참조하세요.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드해서 GitHub Pages에 배포합니다 (`.github/workflows/deploy.yml`).

처음 한 번은 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정해야 합니다.
