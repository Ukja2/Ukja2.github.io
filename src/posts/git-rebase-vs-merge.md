---
title: Git rebase와 merge 차이 정리
date: 2026-08-29
tags: [Dev]
description: 커밋 히스토리를 남길지, 깔끔하게 정리할지의 차이
---

둘 다 브랜치를 합치는 방법이지만 결과로 남는 히스토리 모양이 다르다.

## merge

```bash
git checkout main
git merge feature
```

feature 브랜치의 커밋들을 그대로 두고, 두 브랜치를 합치는 **머지 커밋**을 하나 새로 만든다. 히스토리가 실제로 어떻게 브랜치가 나뉘고 합쳐졌는지 그대로 보존된다.

## rebase

```bash
git checkout feature
git rebase main
```

feature 브랜치의 커밋들을 main 브랜치 최신 커밋 뒤로 **다시 이어붙인다**. 마치 처음부터 main에서 갈라져 나온 것처럼 히스토리가 일직선으로 깔끔해진다.

## 언제 뭘 쓰나

- **공유 브랜치(main 등)** 는 rebase로 히스토리를 함부로 바꾸면 다른 사람 작업과 충돌하니 merge를 쓴다.
- **개인 작업 브랜치**를 PR 올리기 전에 정리할 때는 rebase로 커밋을 깔끔하게 만든 뒤 올린다.

## 기억해둘 것

이미 push해서 다른 사람이 pull 받은 브랜치를 rebase하면 히스토리가 꼬인다. rebase는 "아직 나만 보고 있는 커밋"에만 쓰는 게 안전하다.
