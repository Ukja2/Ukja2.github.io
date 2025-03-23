---
layout: post
title: 「 ComputerNetwork 」 네트워크 보안 및 계층화 
date: 2025-03-18 00:00 +0800
tags: [ComputerNetwork]
categories: [ComputerNetwork]
toc:  true
---
## Network Security

현재의 세대는 인터넷 보안이 매우 중요한데, OSI 7 layer의 모든 부분에서 보안을 신경쓰도록 바뀌었다.
<!--more-->

고 단계의 계층으로 갈 수록 암호화의 기술도 고도화할 수 있게 됐다.
예를 들어, 파일의 암호화 등

## Malware 
- `Mal`: 그리스어로 나쁜 ,`ware`: software = 나쁜 소프트웨어

Virus : 사용가자 특정 개체를 실행시 감염
Worm : 사용자의 행동과 무관하게, 직접 수신하면 감염됨

Spyware : 사용자의 컴퓨터에 몰래 접근하여 권한을 얻어내는 멀웨어

DDos : DDOS는? `좀비 컴퓨터(botnet)`를 넓은 영역에 펼쳐서  연결된 네트워크들에게 특정 시간에 불필요한 패킷을 마구잡이로 보내는 것


### Denial of service


- Dos: `Denial of Service(서비스를 거절한다.)`라는 뜻의 약자

공격자가 **가짜 트래픽(bogus traffic)** 으로 리소스(서버, 대역폭)를 과부하(overwhelming) 시켜, 정상적인 사용자(legitimate traffic)가 이를 사용할 수 없도록 만드는 공격

### Packet interception

`Packet interception` :  네트워크에서 전송 중인 패킷을 가로채는 행위

`Packet Sniffing` : Interception의 한 방식으로 네트워크에서 전송되는 패킷을 `엿보고(Sniffing)` 분석하는 행위

- 좀더 발전된 사이버 공격으로 `일반 도스 공격`은 예를 들어 은행 업무를 아예 사용하지 못하도록 마비시키고, `스니핑`은 특정 정보를 빼내오는 기술임



![](https://velog.velcdn.com/images/ghkdehs/post/28fbfe3b-8733-48eb-b9df-52dc88987fa8/image.png)

로그인 정보가 a로만 가야되는데 중간의 c가 정보를 탈취하는(interception) 것을 보여준다.

### fake identity

IP spoofing: 공격자가 가짜 IP주소를 사용하여 자신을 다른 시스템처럼 보이게하는 기술이다.

![](https://velog.velcdn.com/images/ghkdehs/post/296de5ec-710e-4fb6-bea7-211d3c86dba2/image.png)

- 공격자가 적극적으로 악의적인 행동을 한다.

- A가 은행서버, B는 피해자 

- c가 스니핑을 통해서 정보를 획득 후,  c가 a인 것처럼 행동, 원래는 c가 a를 공격해야 하는데 그 반대가 되는 경우임

---

## 네트워크의 계층화

1. **복잡한 시스템의 조직화**

- 네트워크와 같은 복잡한 시스템은 여러 구성 요소(호스트, 라우터, 링크, 애플리케이션, 프로토콜 등)로 이루어져 있음.

- 이러한 시스템은 **`계층화`** 를 통해 관리하고 이해하기 쉽게 조직할 수 있음.

2. **항공 여행 과정의 예시**

![](https://velog.velcdn.com/images/ghkdehs/post/fa93a7c7-21d3-4d2b-abdf-d9c327b40725/image.png)

항공 여행 과정에서 각 단계(티켓 구매, 수하물 체크, 비행기 이륙 등)를 네트워크 계층화에 빗대어 설명할 수 있다.


3. **왜 계층화가 필요하며, 수 많은 계층을 만들까?**

 - 계층화는 복잡한 시스템을 더 쉽게 관리하고 단순화하기 위해 사용된다.
 
 - 시스템을 여러 개의 잘 정의된 계층으로 나누어 각 계층이 구조적으로 상호작용하도록 만든다.

 - 여러 가지 계층화 모델이나 구성 방법을 많이 시도한 후, 표준화된 규격을 만들어서 네트워크를 구성하는 것이 그 이유



## Internet protocol stack

![](https://velog.velcdn.com/images/ghkdehs/post/5fcb4cc4-e99d-4400-b160-8e9ac4dff249/image.png)

- internet protocol stack에서는 Application 계층이 presentation과 session 계층을 모두 포함한다.

**OSI 7layer와 차이점?**

- `OSI 7계층`은 네트워크 통신의 각 단계를 매우 세분화하여 정의한 이론적인 모델이며, `인터넷 프로토콜 스택`은 실제로 인터넷에서 데이터를 전송하는 데 사용되는 프로토콜을 기반으로 한 실용적 모델이다.

- `인터넷 프로토콜 스택`은 OSI 모델을 참고하여 설계되었지만, OSI 모델처럼 복잡하게 구분된 계층을 사용하지 않고, 계층을 통합하여 효율성을 추구한다.

## Encapsulation

Encapsulation : 캡슐화

데이터를 네트워크를 통해 전송할 때, 각 계층은 자신만의 정보를 담은 **헤더(header)** 를 추가하며, 계층이 내려갈 때마다 헤더가 붙는다.



![](https://velog.velcdn.com/images/ghkdehs/post/c2f95679-d149-4a6f-993d-d550485d93e7/image.png)

