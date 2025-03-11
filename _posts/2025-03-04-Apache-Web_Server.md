---
layout: post
title: 「 Linux 」 Apache Web Server 구축 (1)
date: 2025-03-04 00:00 +0800
last_modified_at: 2025-03-04 00:00:01 +0800
tags: [Linux]
categories: [Linux]
toc:  true
---

## 리눅스 웹 서버 구축
오픈 소스 웹 서버 소프트웨어인 `Apache` 를 사용해서 웹 서버를 구축해보려 한다.
<!--more-->

### 🌍 웹 서버?
- 웹 서버는 사용자가 웹 브라우저에서 요청한 웹 페이지를 제공하는 서버. 쉽게 말해서, 웹 사이트를 실행하는 컴퓨터라고 생각할 수 있음. 

- 웹 서버는 HTTP 프로토콜을 사용해서 클라이언트(브라우저)와 서버 간에 데이터를 주고받음

---

나는 MacOS 환경에서 진행하기에 이에 맞는 방법으로 시작할 것이다.

### 1️⃣ Apache 설치
> brew install httpd

터미널에서 Homebrew를  통해 Apahce를 설치한다.

### 2️⃣Apache 웹 서버 시작
> sudo apachectl start

터미널에서 위 명령어를 치면 Apache 서버를 시작할 수 있다.

주소창에 `http://localhost` 을 입력해보자.

- 서버 중지
> sudo apachectl stop

- 서버 재시작
> sudo apachectl restart

### ⚠️ 오류 발생 시 팁
하지만 대부분의 경우 처음 Apache 서버를 시작할 때 `AH00558`라고 적힌 에러코드를 발견할 수 있을 것이다.

이는 Apache 서버의 전역의 지시문으로 Servername에 대한 설정이 누락된 것으로, 해당 부분을 localhost로 변경해주면 된다.

> sudo nano /etc/apache2/httpd.conf

위 명령을 통해 텍스트파일 편집기로 `httpd.conf` 파일 내부에 `^w` 단축키로 **Servername** 을 입력하면 `#Servername ~~~` 와 같이 주석처리 되어있는 Servername을 확인할 수 있다. 여기서 `#`을 제거해주고 
Apache를 재시작해주면 정상적으로 **작동할 수도 있다.**

#### 작동할 수도 있다??
여기서 주석문을 수정했는데 적용이 안된다면 나와 같은 경우일 수도 있다. 

우선 나는 Apache를 Homebrew를 통해 설치할 때 경로가 다르게 설정된 것 같다. 위의 코드로 httpd.conf 파일에 이동하면 아무것도 없었기 때문이다. 

이럴 때는
>which httpd

명령어를 통해 Apache 파일이 정확히 어디에있는지 확인한 후 

>sudo nano /opt/homebrew/etc/httpd/httpd.conf

위 코드를 통해 다시 적용하고 서버를 재시작하면 작동될 것이다.

### ⚠️ Port 설정

만약 `http://localhost`를 입력했는데 안되고, `http://localhost:8080`이 된다면? 

-> Apache conf 파일로 이동해서 Listen을 검색하면 Port 번호가 8080으로 되어있을 것이다. 이를 `80 (기본포트)`로 변경해주면 된다.

![](https://velog.velcdn.com/images/ghkdehs/post/46421195-4930-4d18-9962-4ce000873a55/image.png)



### 3️⃣ 웹 페이지 구축

* 나는 설치 경로가 다르므로 앞으로 나의 경로에 맞게 작성함

아래 명령어를 통해 디렉토리로 이동하면 `index.html` 파일이 있을 것이다.


> cd /opt/homebrew/var/www

`index.html`파일은 내가 보여줄 기본 홈페이지 화면이다. 이를 vscode 를 통해 간단한 구문을 적어보도록 하겠다.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <h1>Welcome to My Apache Web Server!</h1>
    <p>This is my first webpage on Apache.</p>
</body>
</html>
```
이를 적용하면 바뀐 모습을 볼 수 있다.

![](https://velog.velcdn.com/images/ghkdehs/post/45bb71ed-d9f0-41d7-bc0f-24ac536c4ae9/image.png)


여기까지 기초적인 웹 서버 자체를 구축했다. 
다음부터 웹 서버 운영을 다뤄보려 한다.
  
  