---
layout: post
title: 뽑아주소서 서비스 동작 흐름
date: 2025-04-13 01:00 +0800
tags: [Spring]
categories: [Spring]
toc:  true
---

### 서비스 동작 흐름도 기록용
<!--more-->
1. 사용자가 질문을 입력
→ 프론트엔드에서 입력값은 단순한 string 형태로 존재

2. 프론트에서 fetch() 함수로 백엔드에 전송
→ 이때 자바스크립트에서 JSON.stringify()를 사용해
→ JSON 형태로 포장해서 전송됨
```
{
  "message": "자기소개서 도와줘!"
}
```
3. 백엔드는 이 JSON을 `@RequestBody`로 받아 처리
→ `"message"` 값을 매개변수로 꺼냄

4. 그 값을 바탕으로 GPT API에 보낼 본문(JSON)을 생성
→ `"model"`, `"messages"`, `"max_tokens"` 등 GPT가 이해할 수 있는 구조로 만듦
→ 헤더(Authorization, Content-Type)도 포함해서 GPT에게 POST 요청

5. GPT는 응답(JSON)을 반환함

```
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "이렇게 작성해보세요!"
      }
    }
  ]
}
```

6. 백엔드는 이 응답을 파싱하여 "content"만 추출
→ 그 내용을 다시 JSON으로 포장해서 프론트에 반환
```
{
  "response": "이렇게 작성해보세요!"
}
```

7. 프론트는 response 값을 받아 사용자에게 보여줌

