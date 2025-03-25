---
layout: post
title: 「 ComputerNetwork 」 2주차 - 1네트워크 계속, 인터넷 구조, 패킷 딜레이
date: 2025-03-16 00:00 +0800
last_modified_at: 2025-03-25 14:00:00 +0900
modified: true
tags: [ComputerNetwork]
categories: [ComputerNetwork]
toc:  true
---

## Network core


ISP 내부에는 `Network core`와 `Network Edge`가 있다.

<!--more-->

어떠한 정보를 보낼 때 네트워크 코어에서 데이터를 처리하는 두 가지 전송 방식이 존재한다.

1. Circuit Switching - 고정된 경로(회선) 를 설정하고, 데이터가 이 경로를 따라 전송되는 방식 
2. Packet Switching - 박스에 정보를 담아 전송하는 방식

`스위치`나 `라우터`가 있어야 현재의 네트워크에서 다른 네트워크로 전송이 가능함 

- Forwarding (전달하다) - 패킷을 라우터에서 라우터, 다른 호스트로 전달하는 과정을 의미 
    - 즉 데이터를 생성한 사람은 내가 아니며, 누군가로 부터 받은 데이터를 다른 쪽으로 전송하는 것이다.

### Packet-switching: store-and-forward

![](https://velog.velcdn.com/images/ghkdehs/post/cc6eab54-5b9f-47be-8497-b0c548c6829a/image.png)

Packet Swtiching 방식은 store and forward 방식으로 작동한다.

source에서 L개의 비트로 이루어진 패킷을 보내려고 하면, 라우터 내부의 `buffer`에 해당 패킷을 저장 후 라우터는 버퍼에 들어온 순서대로 패킷을 정해진 destination으로 `전달한다` .

패킷전송지연률 = L / R

`End to End Delay` : 데이터가 출발지에서 목적지까지 전달되는 데 걸리는 전체 시간 = 2L/R

라우터 하나를 거칠 때 2L 이며 이후 N개 만큼 곱한다.

`hop` : 패킷의 이동 단위

위 그림에서 source에서 라우터까지의 한 번의 이동이 1hop이 된다.


### Packet-switching: queueing delay, loss
![](https://velog.velcdn.com/images/ghkdehs/post/af6425b3-da50-4655-9e53-62ff0cbf3140/image.png)

원래 Packet switching은 여러 개의 컴퓨터가 하나의 스위치나 라우터에 연결되어서 네트워크를 좀 더 효율적으로 쓰기 위함으로 위 그림이 좀 더 현실적이라 할 수 있다.

위의 그림예시로 A컴퓨터에서 패킷을 보내는 속도가 100Mb/s고 라우터가 처리하는 속도가 1.5Mb/s 일 때 라우터의 buffer가 전부 차면 아직 처리되지 못한 패킷을 삭제하고 새로운 패킷이 들어오게 되는데 이를 `loss` 라고 칭한다.

### Two key network-core functions

네트워크 코어의 두 가지 주요 기능

![](https://velog.velcdn.com/images/ghkdehs/post/b30c9a89-7e2b-4f76-9f56-ce03b5f9ce9e/image.png)

위 이미지는 여러 라우터 간 연결을 보여주며, 라우팅 알고리즘이 패킷의 최적 경로를 선택하는 과정을 나타낸다

- Forwarding (포워딩)
로컬 작업 - 라우터 하나의 관점에서 보는 것
    - 패킷의 헤더 값에 따라 **local forwarding table(로컬 포워딩 테이블)** 을 참조하여 출력 링크를 결정한다
    - 예를 들어, 패킷의 헤더 값이 "0111"이라면, 테이블에 따라 출력 링크 "2"로 이동한다.


- Routing (라우팅)
글로벌 작업: 라우터들 끼리 이어져있는 전체적인 구성에서의 관점으로 보는 것
    - 이는 네트워크 전체에서 경로를 설정하며, 라우팅 알고리즘을 통해 진행된다

### Circuit switching: FDM and TDM

![](https://velog.velcdn.com/images/ghkdehs/post/577d8c93-c27d-484a-84fa-f235da93f9e4/image.png)

하나의 네트워크를 다수의 유저가  통신 자원인 `주파수` 와 `시간` 을  활용해서 효율적으로 나눠 쓰도록 하기 위한 기술

- Frequency Division Multiplexing (FDM)
    - 주파수를 여러 개의 작은 대역으로 나눠서 각각 할당하는 방식
    - 각 사용자는 특정 주파수 대역을 계속 사용 가능
- Time Division Multiplexing (TDM)
    - 시간을 여러 개의 슬롯으로 나누고, 각 사용자에게 특정 시간 동안만 전송 기회를 주는 방식
    - 모든 사용자가 넓은 주파수 대역을 사용할 수 있지만, 특정 시간 슬롯에서만 전송 가능

fdm을 쓰든 tdm을 쓰든 데이터의 총량(엔트로피)는 정해져있음 가로로 쓰냐 세로로 쓰냐의 차이일 뿐이다

### Packet switching VS circuit switching

결론적으로 패킷스위칭이 좋다

대부분의 부분에서 패킷 스위칭으로 전환이 되어가는 중임 (전화까지도)

---

## Internet structure

과거의 인터넷 구조에서는 네트워크 간의 연결을 하나씩 설정하고 직접 연결하는 방식이었음

![](https://velog.velcdn.com/images/ghkdehs/post/9cba6c73-ff5d-4673-b40b-7b0ffa4bc99a/image.png)

허나 이러한 방식은 원래는 각각의 액세스를 직접 연결해서 사용했기 때문에 그 개수의 제곱만큼의 연결선이 발생해서 비용적인 측면에서 매우 비효율적이었음


![](https://velog.velcdn.com/images/ghkdehs/post/8a003087-b36c-4d6e-bf74-879d0ad0eadd/image.png)

이후 중앙 ISP가 생기고, 트래픅 흐름을 효율적으로 관리할 수 있게 되었다.

![](https://velog.velcdn.com/images/ghkdehs/post/1b865831-b8b0-463a-942d-85ba7303e440/image.png)

하지만 글로벌 ISP는 다양하게 존재하고, 글로벌 ISP간의 데이터 교환을 위해 `IXP(Internet Exchange Point)`를 두어 다른 지역은 ISP여도 서로간의 데이터를 공유할 수 있게 됐다.


### 인터넷 계층 구조
![](https://velog.velcdn.com/images/ghkdehs/post/7f25a009-2e8b-4435-8220-e533e5517ef3/image.png)

- `Tier 1 ISP`
Tier 1 ISP는 국제적 및 국가적 단위에서 인터넷 제공하는 상위 ISP

- `Content Provider Networks (CPN)`
    - 인터넷 콘텐츠를 제공하는 서비스나 플랫폼이 운영하는 네트워크
    - CPN 또한 사용자가 접속하려고 할떄 중개자인 ISP를 거쳐서 데이터를 받을 수 있다.

- `IXP`
IXP는 여러 네트워크가 서로 데이터를 교환하는 물리적 장소

- `Reginal ISP`
    - 지역적으로 인터넷 서비스를 제공하는 ISP 예로 한국의 kt, lg, u+ 등이 있다.
    - Tier 1 ISP나 IXP와 연결되어 있으며, Access ISP를 통해 최종 사용자에게 서비스를 제공

- `Access ISP`
가장 하위 계층의 ISP로 지역 ISP를 통해 인터넷에 연결됩니다.

---

## Packet Delay

Packet delay는 패킷이 출발지에서 목적지까지 전송되는 동안 발생하는 총 지연 시간을 의미하며, 크게 4가지 주요 원인으로 나눌 수 있다.

![](https://velog.velcdn.com/images/ghkdehs/post/a443faa8-2a3e-4dbd-bc8b-9e22dd1f4ff1/image.png)

1.Processing delay
연산이 복잡한 알고리즘을 돌리거나 창을 여러개 켜놓을 때에 발생하는 지연, 즉 연산을 처리할 때 걸리는 지연시간

2.queueing delay
라우터 버퍼에서 패킷이 출력되는 동안 지연되는 시간

3.Transmission delay
패킷이 전송될 때 걸리는 시간

4.propagation
거리 / 전파 속도

즉 `패킷의 전체 지연 시간`은 네 가지 지연 요소의 합으로 구할 수 있다.

- 이 네 가지 지연요소 외에 남은 요소가 있다면?
-> 목적지 라우터로부터 확답을 받을 때 까지 걸리는 딜레이가 있다.


- 반대로 확답을 받지못해 재전송한다면? 
-> trans , porp 그리고 Echo Request를 받는 시간까지 추가 지연 발생

## Caravan analogy

![](https://velog.velcdn.com/images/ghkdehs/post/014cf9a8-1ca3-43cb-8470-a83b0728d552/image.png)

여기 자동차 한 대는 네트워크에서의 `비트`를, 10대의 자동차로 이루어진 카라반은 `패킷`을 의미한다

속도와 처리 시간:

- 자동차는 시속 100km로 이동한다 (전송 속도)

- 톨게이트(라우터)는 한 대의 자동차를 처리하는 데 12초가 걸린다. (비트 전송 시간).

> 첫 번째 톨게이트를 통과한 카라반이 두 번째 톨게이트에 도착하여 정렬되기까지 걸리는 시간은?


- 첫 번째 톨게이트에서 카라반 처리 시간:

각 자동차를 처리하는 데 12초가 걸리므로, 전체 카라반(10대)을 처리하는 데 
`12 × 10 = 120` -> 120초

- 두 번째 톨게이트까지 이동 시간:

마지막 자동차가 첫 번째 톨게이트를 떠난 후 두 번째 톨게이트까지 이동하는 데 걸리는 시간은 

`100km/(100km/hr)` -> 1시간 


- 총 소요 시간:

첫 번째 톨게이트에서 카라반을 모두 처리하는 데 걸린 시간(120초 = 2분)과 마지막 자동차가 두 번째 톨게이트까지 도달하는 데 걸린 시간(1시간)을 합산하면 총  62분이 소요된다.

## Packet queueing delay

![](https://velog.velcdn.com/images/ghkdehs/post/600abe2e-7fff-488e-8812-f7b9927aba78/image.png)


R: 링크 대역폭 (bps, 초당 비트 전송 속도)

L: 패킷 길이 (bits, 패킷의 크기)

a: 평균 패킷 도착률 (초당 도착하는 패킷 수)



La/R≈0: 트래픽 강도가 낮아 평균 큐잉 지연이 작음.

La/R→1: 트래픽 강도가 높아져 평균 큐잉 지연이 커짐.

La/R>1: 도착하는 작업량이 서비스 가능한 양을 초과하여 지연 시간이 무한대가 됨.

## Packet loss

- 버퍼 내부의 원래 전송되어야 하는 패킷이 네트워크에서 사라지는 것을 의미

- 패킷이 도착하는 속도가 보내는 속도보다 빠를때 발생 

- 일정 버퍼 메모리가 초과되면 `패킷이 삭제되는데 (buffer overwrite)`이를 `packet loss` 라고함

## Throughput

![](https://velog.velcdn.com/images/ghkdehs/post/b164bb99-2fd8-4adf-90b6-237fe4607b86/image.png)


`Througput(처리랑)`? : 단위 시간당 전송된 데이터의 양을 의미한다. 쉽게 말해서, 네트워크가 실제로 전달할 수 있는 속도를 나타냄

위 그림은 각각 two hop network에서 파이프라인의 크기에 따른 처리량을 나타낸다.

- 1번은 서버 -> 라우터의 파이프라인이 좁고, 라우터 -> 컴퓨터의 파이프라인의 크기가 넓다.

- 2번은 그 반대의 경우이다. 

하지만 throughput의 크기는 작은 throughput이 결정한다 큰 게 결정하는게 아님

예를 들어 2번 그림을 보면 Rs속도 만큼 라우터에게 보내는데, 컴퓨로 보낼때는 파이프라인이 좁기 때문에 받은 만큼 전부 보내줄 수가 없게된다. 즉 보낼 수 있는건 Rc만큼이 된다

- `bottleneck link(병목현상)`  : 병의 입구처럼 크기가 줄어들면 원래 보낼 속도만큼을 보낼 수 없게 된다.

