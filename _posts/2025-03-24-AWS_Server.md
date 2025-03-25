---
layout: post
title: 「 AWS 」 EC2 인스턴스 생성및 Apache로 배포
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

#### 7. 네트워크 설정
![](https://velog.velcdn.com/images/ghkdehs/post/f817914e-4bc6-4f56-a7e1-dcf86a0d69f2/image.png)

SSH(개발 환경 터미널)는 내 IP로 접근할 수 있도록 설정하여 보안을 신경써주는 것이 좋다.

또한 HTTPS 와 HTTP 트래픽을 체크하여 포트를 열어주어 각각 보안과 웹 브라우저 접근을 허용한다.

### 인스턴스에 SSH로 접속하기

#### 1.SSH 키 파일 권한 설정
.pem 파일의 권한을 변경해야 한다. (파일 권한 문제로 접속이 안 될 수 있음)
```
chmod 400 /path/to/your/SSH_Key.pem
```

#### 2.EC2 인스턴스에 접속하기
AWS에서 EC2 인스턴스의 공인 IP 주소를 확인하고, 다음 명령어로 접속한다.
```
ssh -i /path/to/your/SSH_Key.pem ec2-user@<EC2_PUBLIC_IP>
```

2번까지 완료하고 나면 서버의 신뢰성을 확인할 수 없다는 메세지가 뜨면서, **"Are you sure you want to continue connecting?"** 이라는 질문이 나올 것이다. 이때는 그냥 yes를 입력해주면 다음에 같은 서버를 접속할때 이와같은 경고문자가 나타나지 않을 것이다.

터미널에서 **시용자이름@EC2공인IP주소** 와 같은 형태로 바뀌었다면 EC2 서버에 제대로 접속이 된 것이다.

### EC2 인스턴스에 Apahce Web Server 설정

#### 1. Apache 설치하기
```
sudo apt update
sudo apt install apache2 -y
```

`sudo apt update` : 패키지 목록을 업데이트

`sudo apt install apache2 -y` : Apache 웹 서버 설치

#### 2. Apache 서버 실행하기

```
sudo systemctl start apache2
```
위 명령어를 치고, 
`http://IP주소` 를 입력하면

![](https://velog.velcdn.com/images/ghkdehs/post/0576c2dd-57a4-4da6-a211-fe542975245d/image.png)

기본 Apache 시작 화면이 나올 것이다.

#### 3. Apache 자동 시작 설정

서버가 재부팅되더라도 Apache가 자동으로 시작되도록 설정한다.
```
sudo systemctl enable apache2
```

#### 4. 서버 상태 확인

```
sudo systemctl status apache2 
```
위 명령어를 입력하고 

![](https://velog.velcdn.com/images/ghkdehs/post/26463779-d219-4593-9a14-95d70d92e7ff/image.png)

active(running)이 뜨면 정상적으로 실행 중인 것이다.

### 로컬 Apache 파일을 EC2 Apahce 폴더로 옮기기

#### 1. EC2 인스턴스에 임시로 파일 복사하기
나는 Apache 폴더 내의 index.html과 css 파일을 옮기려고 한다.

```
scp -i ~/Desktop/KeyPair/YourKey.pem /path/to/your/local/index.html ubuntu@123.45.67.89:/var/www/html/
scp -i ~/Desktop/KeyPair/YourKey.pem /path/to/your/local/style.css ubuntu@123.45.67.89:/var/www/html/
```

`scp` : Secure Copy Protocol의 약자로, SSH를 사용하여 `원격 서버`와 `로컬 시스템` 간에 파일을 안전하게 전송하는 명령어다.

`-i` :  identity file을 지정하는 옵션으로, SSH 연결 시 사용할 개인 키(private key) 파일을 지정하며, 이 키는 서버에 접속할 때 인증을 위한 수단으로 사용된다.


#### 2. EC2 인스턴스에서 파일 이동하기

우선 EC2 인스턴스에 접속 후

```
ssh -i /path/to/your/SSH_Key.pem ec2-user@<EC2_PUBLIC_IP>
```

EC2 서버 내에서 로컬로부터 받은 파일을 Apache 설정 파일로 옮긴다.

```
sudo mv /home/ubuntu/index.html /var/www/html/
sudo mv /home/ubuntu/style.css /var/www/html/
```

#### 3. 파일 권한 설정

Apache가 파일에 접근할 수 있도록 파일 권한을 수정해야 한다. Apache는 일반적으로 `www-data` 사용자로 실행되므로, 다음 명령어로 권한을 설정할 수 있다.

```
sudo chown www-data:www-data /var/www/html/index.html
sudo chown www-data:www-data /var/www/html/style.css
```

#### 4. Apache 서버 재시작

```
sudo systemctl restart apache2
```

서버를 재시작하면?

![](https://velog.velcdn.com/images/ghkdehs/post/79886e4f-671c-45b9-a9ba-e83abd0e84d6/image.png)

내가 만든 페이지가 정상적으로 옮겨진 것을 볼 수 있다.


### DNS 설정

나의 EC2 공인 IP가 널리 퍼지면 안되니 무료 도메인을 사용하여 DNS설정을 해주자

**DNS** : 도메인 이름과 IP 주소를 서로 변환하는 역할

![](https://velog.velcdn.com/images/ghkdehs/post/81c9adae-68ea-4773-b939-686fae317575/image.png)

여기에 들어가서 로그인 후 도메인 생성 후

**current ip** 탭에 EC2 IP를 적어주면 끝!

**`내가 설정한 주소 이름.duckdns.org`** 을 주소창에 입력하면 잘 접속이 될 것이다!