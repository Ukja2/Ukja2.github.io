---
layout: post
title: Jekyll wdm 문제 해결
date: 2024-09-07 23:18 +0800
tags: [Jekyll]
categories: [Jekyll]
toc:  true
---
### Ruby와 Jekyll을 사용한 블로그 제작 중 한가지 문제를 발견했다.

<!--more-->

실행 과정은 아래와 같다.

1. Ruby 설치 후 jekyll과 bundler를 최신 버전으로 설치
2. 내 컴퓨터 로컬저장소 내부에 `{사용자 이름}.github.io` 의 repo를 clone했다.
3. clone한 repo 내부에 `jekyll new ./` 명령어로 프로젝트 생성
4. bundle install 실행 / 여기서 문제가 발생했다.

>An error occurred while installing wdm (0.1.1), and Bundler cannot continue.


이는 wdm이 Windows 디렉토리 변경 감시 기능을 지원하지 않을 때 발생한다고 한다.

나는 해당 문제를 해결하기 위해 다음과 같은 과정을 거쳤다.

----

### 1. WDM 수동 설치
```
gem install wdm 
```
이후 다시 `bundle install`
-> 결과는 똑같았다.

### 2. Ruby 및 Bundler 업데이트
-> 최신버전으로 설치했기에 문제가 없었다.

이 외에도 로컬저장소 내부의 repo를 삭제후 다시 설치하는 등 여러가지 방법을 시도했지만 결과는 똑같았다.

그렇게 여러 시행착오를 겪다 해결방안을 찾게 되었다.

---

### ✔ 해결방안 
> `wdm` 은 `window` 내부에서만 필요한 gem 이라고 한다!

WDM은 위에 설명했다시피 디렉토리 변경 감시기능을 제공하는데 이는 필수적이지 않기때문에 없이도 작동한다고 한다.

![](https://velog.velcdn.com/images/ukja2/post/1c60cb11-9903-4511-b8d2-167f80debfaa/image.png)

gemfile 내부에 들어가서
> gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

해당 코드를 제거하고 `bundle install` 실행 하니 문제없이 정상 작동하게 됐다.