---
layout: post
title: 「 Network 」 3주 2차시,  Application Layer (1)
date: 2025-03-25 00:00 +0800
tags: [Network]
categories: [Network]
toc:  true
---

Application Layer 에는 다음과 같은 예시가 있다.
<!--more-->

- social networking
- Web
- text messaging
- e-mail
- multi-user network games
- streaming stored video (YouTube, Hulu, Netflix) 
- P2P file sharing

## Creating a network app

1. Application은 End System에서 실행된다. 
2. 이는 네트워크를 통해 데이터를 주고받음
3. 라우터 같은 네트워크 장치(코어 장비)에는 애플리케이션을 설치하지 않음
- 네트워크 장치는 데이터를 "전달"할 뿐, 애플리케이션을 실행하지 않음!
- 즉, 우리는 라우터를 프로그래밍할 필요 없이, 사용자 장치에서 애플리케이션을 개발하면 됨

## Client-server paradigm
클라이언트-서버 모델은 **클라이언트(Client)** 가 **서버(Server)** 에 요청(Request)을 보내고, 서버가 해당 요청을 처리한 후 **응답(Response)** 을 보내주는 구조

1. 서버(Server)의 특징
- 항상 켜져 있는(Always-on) 호스트

- 고정된(IP Address) 주소 사용
    - 클라이언트가 언제든지 서버에 접속할 수 있도록 영구적인 IP 주소를 가짐.

- 대규모 서비스를 위해 데이터센터에 위치
    - 예를 들어, 넷플릭스의 경우 온갖 영화(데이터)가 데이터센터에 들어가있다고 생각하면 됨

2. 클라이언트(Client)의 특징
- 서버에 접속하여 요청을 보냄

- 일시적으로 연결됨(Intermittently connected)
    - 필요할 때만 서버에 접속하고, 평소에는 네트워크 연결이 없어도 됨.

- 동적인(Dynamic) IP 주소 사용
    - IP address는 한정적이기 때문

- 클라이언트끼리는 직접 통신하지 않음
    - 일반적으로 서버를 거쳐야 클라이언트 간 통신이 가능함.

## P2P (Peer-to-Peer) Architecture

`엔드 유저(클라이언트)` 장치들 간 직접 통신하는 구조

- 서버 없이(peer끼리) 직접 통신
- 각 피어(Peer)가 동시에 클라이언트 & 서버 역할 수행
- `Self Scalability` 
    - 새로운 피어(사용자)가 생기면 서비스 요청자 + 제공자 역할을 동시에 함
    - 피어가 많아질수록 네트워크 처리량(Throughput)도 증가
    - 서버 없이도 자연스럽게 확장됨
    - 즉, `네트워크들의 연결성과 범위를 스스로 줄였다 늘렸다 하는 것을 의미`
- Peer는 네트워크에 일시적으로 연결되고, IP 주소가 자주 변경됨
    - 관리 복잡 (중앙 관리 서버가 없어서 어려움)

## Processes Communicating

- 프로세스(Process)란? : 운영 중인 프로그램 (CPU에서 실행 중인 프로그램)
    - 하나의 컴퓨터에는 여러개의 프로세스가 동작가능하다.

- `프로세스 간 통신 (Inter-Process Communication)`
    - 하나의 호스트에서 OS를 통과해서 앱들끼리 통신을 할 수 있는 것을 의미한다.

- `서로 다른 호스트`에 있는 프로세스들은 **메시지** 를 교환하여 통신한다. 
그거를 패킷이라 표현하는데 7계층이라 메세지라고 표현한다.

## Sockets
`소켓(Socket)`은 네트워크 통신에서 프로세스가 메시지를 보내고 받는 창구를 의미한다.

이는 문에 비유할 수 있는데,
- 보내는 프로세스는 메시지를 소켓을 통해 "문 밖으로" 보낸다.
- 받는 프로세스는 "문 안"에 있는 소켓을 통해 메시지를 받는다.

![](https://velog.velcdn.com/images/ghkdehs/post/70cb6cc4-1388-405e-8807-4cbf5b490eb8/image.png)

App을 벗어나는 통로를 socket이라 칭한다.

## Addressing Processes

프로세스가 메시지를 받으려면, 그 프로세스를 식별할 수 있는 고유한 아이디가 필요하다. 이를 위해서 IP 주소와 포트 번호가 사용된다.

- IP 주소와 프로세스의 관계
    - 호스트 장치는 고유한 32비트 IP 주소를 가짐.

    - `하지만, IP 주소만으로는 특정 프로세스를 식별할 수 없다.` 왜냐하면 하나의 호스트에서 여러 프로세스가 동시에 실행되기 때문임

즉 프로세스를 식별하기 위한 주소는 `IP 주소`와 `포트 번호` 두 가지를 포함한다.

비슷한 경우로 로컬 네트워크 내에서 장치간에서는 `Mac Address` 를 통해서 통신을 할 수 있다.

`Mac Address?` -  물리적 네트워크 장치(예: 컴퓨터, 스마트폰, 라우터 등)에 할당된 고유한 식별자를 의미한다. 이는 변경할 수 없다.
