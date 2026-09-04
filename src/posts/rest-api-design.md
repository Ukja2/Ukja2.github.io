---
title: REST API 설계 원칙 정리
date: 2026-08-26
tags: [Dev]
description: 명사형 URL, 적절한 HTTP 메서드, 일관된 응답 형식
---

REST API를 만들 때 자주 지키게 되는 규칙들을 정리해본다.

## URL은 명사로, 행위는 메서드로

```
GET    /posts       -> 목록 조회
GET    /posts/1     -> 단건 조회
POST   /posts       -> 생성
PATCH  /posts/1     -> 부분 수정
DELETE /posts/1     -> 삭제
```

`/getPosts`, `/deletePost` 처럼 URL에 동사를 넣지 않고, HTTP 메서드로 행위를 표현하는 게 REST 스타일이다.

## 계층 구조는 경로로 표현

```
GET /users/3/posts   -> 3번 유저가 쓴 글 목록
```

## 상태 코드도 의미 있게

성공했다고 무조건 200만 쓰지 말고, 생성 성공은 `201 Created`, 삭제 성공은 `204 No Content`처럼 상황에 맞는 코드를 쓰면 클라이언트가 응답 본문을 파싱하지 않고도 결과를 알 수 있다.

## 일관된 응답 형식

```json
{
  "data": { "id": 1, "title": "..." },
  "error": null
}
```

성공/실패 응답의 형식을 통일해두면 프론트엔드에서 매번 다른 파싱 로직을 짤 필요가 없어진다.

## 버전 관리

API가 바뀔 걸 대비해서 `/api/v1/posts`처럼 버전을 URL이나 헤더에 포함시켜두면, 기존 클라이언트를 깨지 않고 새 버전을 배포할 수 있다.
