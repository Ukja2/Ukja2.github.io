---
layout: post
title: 「 Network 」 4주 2차시,  Application Layer - HTTP (1)
date: 2025-03-31 01:00 +0800
tags: [Network]
categories: [Network]
toc:  true
---

#### WEB & HTTP 
- 웹 페이지는 객체(objects)로 구성되어 있다.
<!--more-->
    - 이 객체의 종류는 HTML 파일, JPEG 이미지, Java 애플릿, 오디오 파일 등이 있다.

- 각 객체는 URL을 통해 접근 가능함. 예를 들어:
    - www.someschool.edu/someDept/pic.gif 와 같은 형태

host name: www.someschool.edu

path name: /someDept/pic.gif

이러한 형태를 **URL**이라 칭한다. host는 웹사이트의 도메인 이름이며, path는 웹 페이지에서 찾는 객체의 경로를 뜻함


- HTTP는 애플리케이션 레이어에서 동작하지만, 실제로 데이터를 전송할 때는 전송 계층(TCP/IP)을 사용한다.

#### HTTP Overview

- HTTP는 하이퍼텍스트 전송 프로토콜으로 **웹에서 데이터를 주고받는 규약** (프로토콜)이다.

- Web’s application layer protocol
    - HTTP는 OSI 모델의 **애플리케이션 계층에서 동작**하는 프로토콜로, 웹에서 데이터를 주고받을 때 사용되는 규칙을 정의해.


HTTP는 클라이언트/서버 모델을 기반으로 작동한다.

#### TCP와 HTTP의 상호작용

HTTP는 TCP를 사용해서 데이터를 주고받는다. TCP는 전송 계층에서 신뢰성 있는 연결을 제공하는 프로토콜

- client initiates TCP connection (creates socket) to server, port 80:

클라이언트는 TCP 연결을 시작한다. 즉, 클라이언트(브라우저)는 서버와 연결을 만들기 위해 소켓을 생성하고, 서버의 80번 포트에 연결을 시도함 80번 포트는 HTTP 통신에서 기본적으로 사용되는 포트

- server accepts TCP connection from client:

서버는 클라이언트의 TCP 연결 요청을 수락 즉, 서버는 클라이언트가 보낸 연결 요청을 받아들이고, 두 시스템 간에 안정적인 연결이 성립된다.

- HTTP messages (application-layer protocol messages) exchanged between browser (HTTP client) and Web server (HTTP server):

연결이 성립되면, HTTP 메시지(애플리케이션 계층에서의 메시지)가 **클라이언트(브라우저)**와 **서버(웹 서버)** 간에 교환돼. 클라이언트가 HTTP 요청을 보내고, 서버는 이에 대한 HTTP 응답을 보내는 방식임

- TCP connection closed:

HTTP 메시지가 주고받은 후, TCP 연결은 종료된다. 데이터를 모두 교환한 후, 연결을 닫아 네트워크 자원을 반환하는 과정이다.

또한 HTTP는 **Stateless**한 특성을 지니고 있는데,
 이는 매번 **새로운 요청을 독립적으로 처리하고, 과거의 상태를 기억하지 않는다.** 이 덕분에 구현이 간단하지만, 상태를 관리하려면 추가적인 기술이 필요하다.

 #### HTTP connections: two types

 1. Non-persistent HTTP

 기본적으로 한 번의 HTTP 요청마다 새로운 TCP 연결을 열고, 요청을 처리한 후에는 연결을 닫는 방식이다.

 2. Persistent HTTP

한 번의 TCP 연결을 통해 여러 개의 객체를 다운로드할 수 있디. 연결이 닫히지 않고 계속 열려 있다가 더이상 연결이 필요 없을 때 닫히는 방식이다.


#### Non-persistent HTTP: example

우리의 컴퓨터와 학교 서버의 에시를 Non-persistent 예시를 들어보자

우선 유저는 아래의 URL을 입력한다.
User enters URL: www.someSchool.edu/someDepartment/home.index

1. **클라이언트가** TCP 연결을 시작한다. 매번 새로운 요청을 할 때마다 클라이언트는 새로운 TCP 연결을 연다. 

2. 서버는 80번 포트에서 TCP 연결을 기다리다가 클라이언트의 연결 요청을 수락하고 연결을 완료한다.

3. 클라이언트는 HTTP 요청 메시지를 보내고, 그 안에 요청하는 URL인 someDepartment/home.index를 포함시킨다. 이 메시지는 하나의 객체만 요청한다.

4. 서버는 클라이언트의 요청을 받고, 요청된 someDepartment/home.index 객체를 응답 메시지에 포함시켜 클라이언트에게 전송한다.

5. 서버는 클라이언트가 요청한 HTML 파일을 보낸 후 TCP 연결을 닫음.
이후 JPEG 이미지 요청이 들어올 때마다 새로운 TCP 연결을 열고 닫아야 함.

6. **클라이언트(웹 브라우저)**가 서버로부터 HTML 파일을 받는다.
이 HTML을 화면에 표시하고, HTML 내부에 포함된 이미지(jpeg 10개)를 찾는다.

그러나 여기서 jpeg 파일 10개를 전부 찾으려면 Non-persistent HTTP에서는 각 객체(10개의 이미지)마다 새로운 TCP 연결을 열어야 한다.

#### RTT (Round-Trip Time)

클라이언트가 요청을(request) 하고 응답(response)을 받는 
일련의 시간 ( 클라이언트 → 서버 → 클라이언트 왕복 시간 )

여러 개의 객체를 요구할 경우 RTT 계산 시간?

- HTML 파일: 2 RTT + 전송 시간

- 각 이미지: (2 RTT + 전송 시간) × 10개

- 총 시간 = (2 RTT + 전송 시간) × 11

#### Non-persistent HTTP issues

- 각 객체(파일)마다 TCP 연결을 새로 열고 닫아야 하기 떄문에 객체가 2 RTT 발생

- 각 TCP 연결을 열고 닫을 때마다 OS의 리소스를 사용해야 함. 이는 연결을 설정하고 관리하는 과정에서 CPU, 메모리 사용량 증가.

- 이를 해결하기 위한 방법으로 Persistent HTTP가 등장함

#### Persistent HTTP (HTTP1.1)

- 서버가 응답을 보낸 후에도 TCP 연결을 유지한다

- 같은 클라이언트와 서버 간의 추가 요청/응답이 열린 연결에서 처리됨

- 클라이언트는 HTML을 분석하는 즉시 추가 요청을 보냄

- **최소한 1 RTT로 여러 개의 객체 다운로드 가능 (응답 시간 단축)**



#### Maintaining User/Server State: Cookies (쿠키로 상태 유지하기)

HTTP는 기본적으로 **stateless**한 프로토콜이다.

즉, 각 요청은 독립적이고, 서버는 이전 요청 정보를 기억하지 않음.

이 때문에, 사용자 상태를 유지하려면 별도의 방법이 필요한데, 그중 가장 대표적인 방법이 **쿠키(Cookie)** 다.

#### Cookies?
쿠키는 클라이언트(브라우저)에 저장되는 작은 데이터 조각으로, HTTP가 무상태라는 한계를 보완함

**동작 방식을 살펴보면**
- 클라이언트가 서버에 요청을 보냄.

- 서버는 응답과 함께 Set-Cookie 헤더를 추가하여 쿠키를 클라이언트에 저장하도록 요청.

- 이후 클라이언트가 서버에 요청할 때마다 해당 쿠키를 자동으로 전송하여 사용자 상태 유지 가능

예를 들어 내가 네이버에 접속하면 서버는 클라이언트에 대한 정보를 저장해놓고,
다음 접속때는 특정 오브젝트만 로드하기 때문에 속도가 증가하는 효과를 볼 수 있다.

하지만 쿠키는 보안 이슈가 존재하기 때문에 이를 잘 보완해야 한다.

#### What cookies can be used for
- authorization (인증)
- shopping carts (장바구니)
- recommendations (광고, 추천시스템)
- user session state (Web e-mail) (이메일 세션 유지)

#### cookies and privacy
- 쿠키는 웹사이트가 사용자의 활동을 학습할 수 있도록 허용한다.

- 서드파티 영구 쿠키(추적 쿠키)는 동일한 쿠키 값을 사용하여 여러 웹사이트에서 사용자의 신원을 추적할 수 있다. 즉 개인정보에 유의해야 한다.

#### Web caches (proxy servers)

프록시 서버는 클라이언트와 서버 사이에서 중개 역할을 하는 서버로,  클라이언트가 서버에 직접 요청하는 대신, 프록시 서버가 대신 요청을 처리해주고, 그 결과를 클라이언트에게 전달하는 방식이다.

프록시 서버의 기능 중 하나인 **웹 캐시**는 자주 요청되는 웹 콘텐츠(HTML 파일, 이미지 등)를 **캐시(임시 저장)**해서, 반복적으로 요청이 오면 원본 서버에 요청하지 않고 바로 응답을 줄 수 있다.


- 브라우저가 요청을 직접 원본 서버로 보내지 않고, 먼저 웹 캐시(프록시 서버)를 거치도록 설정한다.
    - 예를 들어 프록시 서버가 요청을 처리할 수 있으면 바로 응답, 없으면 원본 서버에서 가져와 저장한 후 응답

- 브라우저가 모든 HTTP 요청을 웹 캐시(프록시 서버)로 보낸다
    1. 브라우저가 웹 캐시에 요청을 보냄
    2. 웹 캐시에 해당 객체(파일)가 있는지 확인
        - 만약 캐시에 있으면?
            → 웹 캐시가 즉시 파일을 클라이언트(사용자)에게 반환

        - 캐시에 없으면?
            → 웹 캐시가 원본 서버에 요청
            → 받아온 데이터를 캐시에 저장한 후, 사용자에게 전달


즉 프록시 서버가 있고, 웹 캐시가 있는데 프록시 서버의 개념이 웹 캐시임 잘 파악하자!