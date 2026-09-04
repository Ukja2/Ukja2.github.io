---
title: Nginx로 리버스 프록시 설정하기
date: 2026-09-02
tags: [Server]
description: Nginx를 앞단에 두고 백엔드로 요청을 넘기는 기본 설정 정리
---

리버스 프록시는 클라이언트 요청을 받아서 실제 서버로 대신 전달해주는 역할을 한다. Nginx를 앞에 두면 SSL 처리, 로드 밸런싱, 정적 파일 서빙을 한 곳에서 관리할 수 있다.

## 기본 설정 예시

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 헤더를 넘겨줘야 하는 이유

`proxy_pass`만 설정하면 백엔드 입장에서는 모든 요청이 Nginx(127.0.0.1)에서 온 것처럼 보인다. `X-Real-IP`, `X-Forwarded-For` 같은 헤더를 넘겨줘야 백엔드가 실제 클라이언트 IP를 알 수 있다.

## 정적 파일은 굳이 백엔드까지 안 보내도 된다

```nginx
location /static/ {
    alias /var/www/static/;
}
```

이렇게 해두면 이미지, CSS 같은 정적 파일은 Nginx 선에서 바로 응답하고, 나머지 요청만 백엔드로 넘어간다.
