---
layout: post
title: 「 AWS 」 EC2 인스턴스 생성및 접속
date: 2025-03-18 00:00 +0800
tags: [AWS] 
categories: [Infra, AWs]
toc:  true
---

Apache로 웹서버를 구축하고, 배포까지 해보려 했으나 공유기 Admin 설정 문제로 지금까지 미뤄왔던 AWS를 활용한 배포를 해보려한다.

<!--more-->

**회원가입**을 통해 AWS 계정을 생성해준다. ( 과정 생략 )

### EC2 인스턴스 생성

#### 1. 좌측 상단 검색창에 **EC2**를 검색한 후 클릭해준다.

![](https://velog.velcdn.com/images/ghkdehs/post/3a5ac3df-bfc8-4ede-9d1d-55754d613da4/image.png)



#### 2. 우측 인스턴스 시작을 눌러준다.

![](https://velog.velcdn.com/images/ghkdehs/post/ec63d5df-9736-4df9-8ed6-7b4437562002/image.png)


#### 3. 인스턴스명은 내가 알아보기 쉽도록 설정하면 된다. 

![](https://velog.velcdn.com/images/ghkdehs/post/3180b1ae-f8ac-4cf7-b08b-7f9c2a83c9de/image.png)

#### 4. AMI 설정은 아래의 형식을 따랐다.

![](https://velog.velcdn.com/images/ghkdehs/post/034a28fb-c710-4ad5-bcdd-88562ae01111/image.png)

나는 아직 잘 모르기 때문에 운영체제는 Ubuntu를 골랐으며, 버전은 `24.04 LTS` 와 `22.04 LTS`가 있는데, 둘 다 프리 티어 사용이 가능해서 아무래도 안정적인 22.04 버전을 사용했다.

아키텍처는 앞선 이유와 동일하게 잘 모르기 때문에 기본설정인 `64비트(x86)` 를 사용했다.

#### 5. 인스턴스 유형은 프리 티어가 가능한 `t2.micro` 모델을 사용한다.

![](https://velog.velcdn.com/images/ghkdehs/post/b76420fa-20ee-43de-bf67-6c1b39165d10/image.png)

**EC2 인스턴스 유형(Instance Type)** 은 CPU, 메모리(RAM), 네트워크 성능 등에 따라 분류된 **서버의 스펙(성능 등급)** 이라고 알면 된다.

#### 6. 키페어의 이름은 본인이 식별할 수 있도록 설정한다.

![](https://velog.velcdn.com/images/ghkdehs/post/36151bf1-77db-4fef-bf43-fd813cb4e48f/image.png)

RSA의 보안성이 높고 널리 지원되고 있으며, pem키 또한 다양한 운영 체제에서 사용 가능하게 지원되기 때문에 많이 사용한다고 한다.

또한 키페어는 **절대 유출되어서는 안되기 떄문에** 따로 잘 보관하도록 하자.

#### 7.