---
layout: post
title: 「 Network 」 5주 1차시,  Application Layer - Email
date: 2025-04-01 01:00 +0800
tags: [Network]
categories: [Network]
toc:  true
---

### Email
Email의 세가지 구성요소

![](https://velog.velcdn.com/images/ghkdehs/post/6c98f74d-a106-48fd-8afa-b9a7b95eceda/image.png)


<!--more-->
1. user agents : 사용자를 대신하여 일을 수행하는 것 (쉽게 서비스에 가입한 유저라고 생각)
2. mail servers : 메일 서버 
3. simple mail transfer protocol: SMTP : 이메일 전송을 위한 프로토콜.

**app 계층에서는 이세가지가 있어야 통신이 가능**


#### User Agent (a.k.a Mail reader라고 한다.)
 
- 사용자는 이메일을 작성하고 편집하며, 받은 이메일을 읽는 역할을 담당하는 프로그램을 사용한다. 
    - 예를 들어 Gmail, Thunderbird 등을 사용

- 메일 서버와의 상호작용:
    - 사용자가 **메일을 보낼 때**, 메일 서버에 메일을 전송하고
    - 사용자가 **메일을 받을 때**는 메일 서버에서 메일을 받아 읽음.


#### E-mail: mail servers

- Mailbox (메일박스) : 사용자의 메일박스에 받은 메시지를 저장한다.

- Message Queue (메시지 큐)
    - 발송 대기 중인 이메일이 메시지 큐에 저장된다.
    - 메일 서버가 이메일을 받은 후 다른 서버로 전달되기 전까지 큐에 저장되어 기다리게 된다.

- 동작 흐름:
    - 클라이언트 (Sending Mail Server): 이메일을 보낼 때, 발신 메일 서버에서 이메일을 보낸다.

    - 서버 (Receiving Mail Server): 이메일을 받을 메일 서버에서 수신된 이메일을 저장한다.


### Scenario: Alice sends e-mail to Bob
![](https://velog.velcdn.com/images/ghkdehs/post/8ab3cc16-e56b-436e-b681-cc51e658066b/image.png)


1. **Alice가 이메일을 작성한다**
    - Alice는 자신의 **사용자 에이전트(UA)**를 사용해 이메일을 작성하고, 수신자 주소는 bob@someschool.edu로 설정한다.

2. **Alice의 사용자 에이전트가 메시지를 Alice의 메일 서버에 전송**
    - 이메일 메시지가 Alice의 메일 서버로 전송되고, 그 서버는 메시지를 **발송 대기 중인 큐(message queue)**에 저장한다.

3. **SMTP 클라이언트가 Bob의 메일 서버와 TCP 연결을 엶**
    - Alice의 메일 서버는 SMTP 클라이언트 역할을 하며, Bob의 메일 서버와 TCP 연결을 설정한다.

4. **SMTP 클라이언트가 이메일 메시지를 TCP 연결을 통해 전송**
    - Alice의 메일 서버는 이메일 메시지를 SMTP 프로토콜을 사용하여 TCP 연결을 통해 Bob의 메일 서버에 전송한다.

5. **Bob의 메일 서버는 메시지를 Bob의 메일박스에 저장**
    - Bob의 메일 서버는 이메일을 수신하고, 그 이메일을 Bob의 메일박스에 저장한다.

6. **Bob은 자신의 사용자 에이전트를 호출하여 이메일을 읽음**
    - Bob은 자신의 **사용자 에이전트(UA)**를 열어 수신된 이메일을 확인하고 읽는다.


### HTTP vs SMTP

- HTTP (Pull):

    - 클라이언트가 요청을 보내고, 서버는 요청을 받은 후 그에 대한 응답을 보내는 방식입니다.

    - 즉, 클라이언트가 필요한 정보를 "끌어" 오듯이 요청하는 방식이다.

예시: 웹 브라우저에서 웹 페이지를 요청하면, 웹 서버는 그 페이지를 응답하는 방식.

- SMTP (Push):

    - 메일 서버가 이메일을 "밀어넣기" 하듯이, 발신 서버가 수신 서버로 이메일을 보내는 방식이다.


예시: Alice가 Bob에게 이메일을 보낼 때, Alice의 메일 서버가 Bob의 메일 서버로 이메일을 전송하는 방식.

#### SMTP 특성 

- SMTP는 지속적인 연결을 사용한다 (Persistent Connections)
    - SMTP는 지속적인 연결을 사용한다.. 즉, 이메일을 여러 번 전송할 때마다 매번 TCP 연결을 새로 열지 않고 한 번의 연결로 여러 이메일을 처리할 수 있다.

### Mail message format

- SMTP는 이메일을 서버 간에 교환하는 프로토콜이다.

- 이때 이메일 메시지는 구조는 **RFC 82**2**에 정의된 헤더와 본문으로 구성된다! 

그 구조는 아래와 같다.

![](https://velog.velcdn.com/images/ghkdehs/post/e6b9d320-420b-4f97-bff6-143f093c6cd4/image.png)

1. 헤더(header)
이메일의 정보를 설명하는 라인들로 구성된다.

헤더 예시:
- To: 수신자 이메일 주소

- From: 발신자 이메일 주소

- Subject: 이메일 제목

2. 본문 (Body)

이메일 메시지의 본문(Body) 부분은 실제 **"메시지"** 가 들어있는 부분으로 이 본문은 ASCII 문자만 포함할 수 있다.

또한 본문 부분은 **Payload(짐칸)** 이라고 칭하기도 한다.

이에 더해 이메일 구조 뒷부분에는 **Taylor**라고 불리는 부분도 존재한다.

### Mail access protocol

![](https://velog.velcdn.com/images/ghkdehs/post/bf1a5dfb-bc92-482e-bf85-77dc7057907c/image.png)


1. SMTP (Simple Mail Transfer Protocol)
    - 목적: 이메일 전송을 담당하는 프로토콜
    - 기능: 발신자 서버에서 수신자 서버로 이메일 메시지를 전달하는 역할을 한다.

2. IMAP (Internet Mail Access Protocol)
    - 목적: 이메일 검색 및 관리를 담당하는 프로토콜
    - 기능: 서버에 저장된 이메일 메시지에 접근하여 검색, 삭제, 폴더 관리 등을 할 수 있다.

3. HTTP (Hypertext Transfer Protocol)
    - 목적: 웹 기반 이메일 인터페이스 제공을 담당하는 프로토콜
    - 기능: Gmail, Hotmail, Yahoo!Mail 등과 같은 웹메일 서비스는 웹 브라우저를 통해 이메일을 전송하고 받을 수 있는 인터페이스를 제공한다.


### DNS: Domain Name System

#### 1. 사람과 인터넷에서 사용되는 식별자

- 사람은 여러 식별자를 사용한다. 예를 들어, SSN(사회보장번호), 이름, 여권 번호 등이 있음

- 인터넷에서는 각 장치가 IP 주소(32비트 주소)를 사용하여 데이터를 주고받는다. 이 IP 주소는 호스트를 식별하는 데 사용된다.

하지만 사람들은 IP 주소를 기억하기 어려운 경우가 많으므로, 더 쉽게 기억할 수 있는 도메인 이름을 사용한다.

#### 2. IP 주소와 도메인 이름 사이의 매핑

질문: 사람들은 도메인 이름을 사용하고, 컴퓨터 네트워크에서는 IP 주소를 사용합니다. 이 두 가지를 어떻게 매핑할까?

이를 해결하는 시스템이 바로 DNS

#### 3. DNS?
- 데이터베이스가 분산되어 있는 상황에서 특정 데이터베이스에 접근하기 위해 도메인을 적절한 IP 주소로 변환해 해당 데이터베이스 서버로 연결할 수 있도록 도와줌

- DNS는 인터넷의 가장자리에 위치한 시스템이다. 즉, 사용자가 요청을 보내고 응답을 받는 끝단에서 중요한 역할을 함, 클라이언트가 도메인 이름을 요청하고, 그에 대한 응답을 DNS 서버가 처리하여 반환하는 방식입니다.

### DNS: a distributed, hierarchical database


![](https://velog.velcdn.com/images/ghkdehs/post/eed584fd-fbee-4765-b84b-3394f58007ba/image.png)

#### DNS 구조: 계층적 시스템

1. 사용자가 특정 웹사이트를 방문하려고 할 때, 브라우저는 먼저 루트 DNS 서버에 요청을 보낸다.

2. 루트 서버는 해당 도메인의 TLD를 확인하고 적합한 TLD 서버로 연결

3. 이후 TLD 서버가 세부 도메인 정보를 가진 하위 DNS 서버로 요청을 전달하여 최종적으로 IP 주소를 반환한다. 



### Root Name Servers

루트 네임 서버는 인터넷 DNS 계층구조의 최상위(root)에서 동작하는 서버로,
다른 네임 서버들이 도메인 이름을 해석할 수 없을 때 마지막으로 연락하는 서버(contact-of-last-resort) 역할을 한다.

즉 쉽게 말해서 인터넷에서 도메인 이름을 찾는 과정에서 가장 처음 참조되는 최상위 DNS 서버

#### DNSSEC (Domain Name System Security Extensions)
DNSSEC은 **DNS 응답의 인증(Authentication)과 무결성(Integrity)** 을 보장하는 보안 확장 기능이다.

- DNSSEC이 없으면 공격자가 DNS 응답을 변조해서 가짜 사이트로 유도할 수 있음! 


### TLD (Top-Level Domain) Severs
TLD 서버는 최상위 도메인(.com, .org, .net, .edu 등)을 관리하는 네임 서버이다.

### Authoritative DNS servers

특정 도메인의 IP 주소를 최종적으로 제공하는 서버


즉 이를 정리하면 

- Root DNS 서버: DNS에서 가장 상위에 위치하는 서버로, 도메인 이름을 IP 주소로 변환하는 과정에서 첫 번째로 호출되는 서버다. 이 서버는 DNS 트리의 최상위에 있는 "루트"에 해당하며, 모든 도메인 이름을 관리하는 DNS 계층의 시작점

- TLD (Top-Level Domain): 도메인 이름에서 가장 마지막 부분을 의미함.예를 들어, example.com에서 .com이 TLD. 다른 예로는 .org, .net, .edu 같은 것들이 있음

- Authoritative: "권한이 있는"이라는 뜻이다. 즉, 특정 도메인에 대한 정보(예: 해당 도메인과 연결된 IP 주소 등)를 관리하고, 그것에 대한 최종적인 답을 제공할 수 있는 권한을 가진 DNS 서버를 의미함.

---

### Local DNS name servers
임의로 생성하여 쓸 수 있는 서버

로컬 DNS 서버는 계층 구조에 포함되지는 않지만, DNS 요청을 처음 처리하는 중요한 역할을 함

ISP, 기업, 학교 등에 기본적으로 존재하며 "기본 네임 서버(Default Name Server)"라고도 불림.



### DNS name resolution: iterated query

![](https://velog.velcdn.com/images/ghkdehs/post/472d9e84-77ef-4635-9fdc-2ee002d0d897/image.png)

**iterated query** 방식은 특정 도메인에 대한 IP주소를 찾을 때 순차적으로 DNS 서버에 접근하는 방식이 아니라 각개의 DNS 서버에 도메인에 대한 정보를 요청하고 응답받는 형식으로, 원하는 데이터를 얻을 때 까지 개별적으로 DNS 서버에 접근하는 형태를 띤다.

장점? - 속도가 빠르다. 
단점 - 알고리즘이 제대로 구현되지 않았을 때, 매우 복잡해진다.

### DNS name resolution: recursive query

![](https://velog.velcdn.com/images/ghkdehs/post/1b1fdd4f-c183-403a-adfa-ada40d46ccc4/image.png)

이 방식은 질의를 보낸 클라이언트 대신, 로컬 DNS 서버가 전체 질의 과정을 처리하는 방식이다. 즉, 서버가 최종 IP 주소를 찾기 위해 필요한 모든 단계를 대신 처리하고, 결과만 클라이언트에게 반환하는 방식이다.

예시에서는 컴퓨터 -> local dns -> root dns -> tld dns -> umass 
이후 역순진행


장점? - 신뢰성이 높은 root dns 
단점? - 모든 사람이 root 서버에 접속하면 연산의 양의 증가하여
더많은 서버나 연산능력이 필요하다.

### DNS records

DNS는 리소스 레코드(Resource Record, RR)를 저장하는 분산형 데이터베이스이다. 각 리소스 레코드는 다음과 같은 형식으로 저장된다.
> (name, value, type, ttl)

- name: 호스트 이름(예: 웹사이트 주소나 도메인 이름)

- value: 해당 호스트의 값(예: IP 주소 또는 다른 서버의 호스트 이름)

- type: 레코드 유형 (예: A, NS 등)

- ttl: 시간(Time to Live)으로, 이 값이 만료되기 전에 레코드를 얼마나 캐시할 수 있을지 나타내는 값

**기억!**

- type = A
    - name: 호스트 이름
    - value: 해당 호스트의 IP 주소 (예: 192.168.0.1)

- type = NS
    - name: 도메인 이름 (예: foo.com)
    - value: 해당 도메인의 권한을 가진 DNS서버의 호스트 이름 (예: ns1.foo.com)


### Inserting records into DNS

 **"Network Utopia"** 라는 스타트업이 DNS에 레코드를 삽입하는 과정


1. 도메인 등록
"Network Utopia"라는 스타트업은 networkuptopia.com 도메인을 DNS 등록기관에 등록해야 함

이때 도메인을 등록할 때, 해당 도메인의 권한 있는 이름과 IP 주소를 제공해야 함

2. 레코드 삽입
등록기관은 도메인에 대한 정보를 최상위 도메인 서버(예: .com TLD 서버)에 삽입해. 이때 삽입하는 레코드는 NS 레코드와 A 레코드야.



NS 레코드는 networkutopia.com 도메인에 대해 **dns1.networkutopia.com**이 권한 있는 DNS서버임을 나타내는 정보다. 즉, 이 도메인에 대한 모든 DNS 요청은 dns1.networkutopia.com DNS서버로 가게 돼.

A 레코드는 dns1.networkutopia.com DNS서버의 실제 IP 주소가 212.212.212.1임을 나타내는 정보다. 즉, dns1.networkutopia.com을 찾으려면 212.212.212.1이라는 IP 주소를 사용해.

3. 권한 있는 DNS서버 설정
로컬에서 **dns1.networkuptopia.com**이라는 DNS서버를 설정하고, 해당 서버의 IP 주소를 212.212.212.1로 지정해.

4. A 레코드와 MX 레코드 추가
A 레코드:

**www.networkuptopia.com**에 대한 A 레코드를 설정. 이 레코드는 **www.networkuptopia.com**이라는 도메인이 실제로 어느 IP 주소로 연결될지를 설정하는 것. 예를 들어, 이 웹사이트가 212.212.212.1이라는 서버에 호스팅되면, A 레코드는 다음과 같을 수 있음

(www.networkuptopia.com, 212.212.212.1, A)

MX 레코드:

networkuptopia.com 도메인의 메일 서버(MX, Mail Exchange) 정보를 설정한다. 예를 들어, 이메일 서버가 **mail.networkuptopia.com**에 위치한다면, MX 레코드는 다음과 같이 설정할 수 있음

(networkuptopia.com, mail.networkuptopia.com, MX)

