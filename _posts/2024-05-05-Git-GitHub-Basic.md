---
layout: post
title: Git &GitHub 기초
date: 2024-05-05 23:18 +0800
last_modified_at: 2024-05-05 01:08:25 +0800
tags: [Git, GitHub]
categories: [Git]
toc:  true
---

### ▶ Git이란 무엇인가?

> **Git**은 소프트웨어 개발 시에 사용되는 버전 관리 시스템의 일종이다.

###  ▶ Git을 왜 사용하는 걸까?

보편적으로 .hwp와 같은 문서 작업시 하나의 문서를 마구잡이로
복사 -> 수정/백업을 할 때가 있다. 
![](https://velog.velcdn.com/images/ukja2/post/609c7f86-e073-44c8-88ae-292626ecf42e/image.png) 
이와 같은 경우의 문제점이 무엇이 있을까?
> 
- 각각의 파일간 변경사항을 추적하기 어렵다.
- 협업에 있어 상당한 번거로움이 있다.
- 데이터 손상에 대한 복구가 어렵다.


이러한 이유로 **체계적인 관리**의 중요성이 더욱 강조되고 있다.


### ▶ Git의 핵심 기능
**1. 소스 코드 변경사항 추적 및 관리**
- 소스 코드가 변경되었을 때 이를 감지하고, 어떤 점이 변경되었는 지 확인할 수 있도록 한다.

**2. 개발자 간 동시 작업 지원**
- 개발자는 각기 다른 작업을 병렬적으로 수행할 수 있다.

**3. 변경 사항 기록**
- 프로젝트의 이전 버전으로 되돌아갈 수 있는 기능 제공한다.

---
![](https://velog.velcdn.com/images/ukja2/post/de06215a-dc16-4786-8397-241b0ae0bcfd/image.png)
### ▶ GitHub란 무엇인가?
> **Git**을 통해 관리되는 소프트웨어 프로젝트를 공유 및 협업하기 위해 사용되는 플랫폼이다.

### ▶ GitHub의 핵심기능
**1. 저장 및 버전 관리, 백업**
- Git을 통해 관리하는 프로젝트를 GitHub에 저장, 버전 관리, 백업을 수행할 수 있다.

**2. 협업기능 제공**
- Pull-Request / Discussion 등과 같이 프로젝트를 함께 진행하는 팀원 간 협업을 위한 기능을 제공한다.

**3. 문서화 기능 제공**
- README / Wiki 등을 통해 프로젝트 문서화를 지원한다.

**4. 소셜 네트워킹 기능 제공**
- 본인 또는 다른 개발자의 작업물을 조회할 수 있다.
---
**💬 그렇다면 Git과 gitHub의 차이점은 무엇인가? **
![](https://velog.velcdn.com/images/ukja2/post/9c83eee8-d736-4593-9a5c-959ebaa3f1a6/image.png)
 
Git과 GitHub를 처음 다루면서 흔히 헷갈리는 개념이 'Git = GitHub’라고 혼동하는 것이다.

>GitHub는 Git이라는 버전 관리 시스템으로 관리하는 프로젝트를 웹에서 볼 수 있도록(+다양한 편의 기능 제공) 해주는 서비스라는 점을 유의해야 한다.

---
![](https://velog.velcdn.com/images/ukja2/post/028a37f9-1188-4bd9-8691-6d9bd09fe83f/image.png)

### ▶ Git Lifecycle
**1. Untracked**
- Git에서 관리하지 않는 파일들을 의미한다.

**2. Tracked**
- Git에서 관리하는 파일들을 의미한다.

**3. Unmodified**
- Git에서 관리하는 **파일 중 수정을 하지 않은 파일**들의 상태

**4. Modified**
- Git에서 관리하는 **파일 중 수정을 한 파일**들의 상태

**5. Staged**
- Git에서 관리하는 파일 중 **다음 커밋에 포함될 에정인 파일들**의 상태

---
### ▶ Git Command
**1. status**
```
git status 
```
- Git을 통해 관리하고 있는 저장소의 상태를 출력한다.

**2. init**
```
git init
```
- init은 빈 Git repository를 만들거나 이미 있는 Repository를 다시 초기화하는 명령어다.

**3. add**
![](https://velog.velcdn.com/images/ukja2/post/ea85234f-a38f-4135-9a39-661b8df21fc9/image.png)
```
git add 
```
- #### `Untracked` -> `Staged`
◽ 다음 commit에 포함시킨다. 
◽ Git에서 관리하지 않고 있던 파일을 관리하도록 하게 한다. 

- #### `Modified` -> `Staged`
◽다음 commit에 포함시킨다.

**4. commit **
![](https://velog.velcdn.com/images/ukja2/post/9b8737cf-bf24-43cb-af54-b0b42d0b7e04/image.png)

```
git commit -m "수정 내용"
```
- Git을 통해 관리하고 있는 **파일들의 상태를 저장**하는 명령어
◽ `git add` 명령어를 통해 `Staged`된 파일들을 commit에 포함
◽ `Unmodified` 상태로 만듦

**5. push**
![](https://velog.velcdn.com/images/ukja2/post/72548710-de3f-4ee8-b698-255bde00fa47/image.png)

```
git push
```

- Git을 통해 관리하고 있는 `Local Repository`를 `Remote Repository`에 올리는(저장) 명령어
◽ commit 목록을 GitHub Repository에 올림

⭐ `local Repository` 
- .git 디렉터리가 있는 폴더이다.

⭐ `Remote Repository`
- 원격 서버에 있는 Git 저장소이다.
---

[출처] 개발자 이진우님의 블로그 : https://jinlee.kr/

