---
layout: post
title: Jekyll theme를 이용한 블로그 개설과 오류 해결과정
date: 2024-09-08 23:19 +0800
tags: [Jekyll theme, Jekyll]
categories: [Jekyll]
toc:  true
---

블로그를 개설 중 발생한 자잘한 오류 해결과 과정
<!--more-->

---
### 1. Github.io repository 생성
1. 우선 Github에서 ` {사용자이름}.github.io` 형식의 repo를 생성했다.
![](https://velog.velcdn.com/images/ukja2/post/5ef7660a-842c-45e8-944c-b82ddfa30020/image.png)

2. 저렇게 생성된 repo를 나의 로컬저장소에 clone한다.
** 이때 clone할 repo의 경로에 한국어가 있으면 추후 오류가 발생할 확률이 있기 때문에 영어로 된 경로에 clone할 것을 권장한다. **

	나는 C 저장소에 따로 `Ukja2Blog` 라는 폴더를 생성 후 해당 폴더 내부에 clone했다.
![](https://velog.velcdn.com/images/ukja2/post/48e553e3-3fbe-4deb-bc02-da92954d3428/image.png)


### 2. Ruby 및 Jekyll 설치

1. Ruby를 설치해준다.
![](https://velog.velcdn.com/images/ukja2/post/626a70de-82d4-4e92-8121-3415f92a3108/image.png)
여기서 `DEVKIT`가 포함된 버전으로 설치해주고, 설치버전은 오른 쪽 표시처럼  3.3.X 버전이 안정화된 버전임을 뜻하므로 여기에 해당되는 버전,bit를 설치해주면 된다.

설치 후 `cmd` 창을 켜서 아래와 설치버전이 나오면 성공적으로 설치됐음을 의미한다.
```
ruby -v (입력)
ruby 3.3.5 (2024-09-03 revision ef084cc8f4) [x64-mingw-ucrt] (출력)
```
2. Jekyll과 bundler 설치
```
$ gem install jekyll
$ gem install bundler
```

Jekyll과 bundler를 설치하는 이유를 쉽게 설명하자면 Ruby내에서 `bundler`를 통해 `Jekyll`을 실행하고 `Jekyll`을 사용해서 우리가 원하는 블로그를 만들 수 있다. 

bundler에 대한 설명은 아래와 같다.
** "bundler는 Ruby 프로젝트에 필요한 Gem들의 버전을 추적하고 설치해서 일관된 환경을 제공한다."**
즉 다른 버전의 프로젝트들을 실행할때 원활하게 작동할 수 있도록 해주며, 전체적으로 Ruby의 쾌적한 사용환경을 제공해주는 것 같다.

설치를 완료 했다면 아래와 같이 입력 후 설치 확인을 해준다.
```
jekyll -v (입력)
jekyll 4.3.3 (출력)

bundler -v (입력)
Bundler version 2.5.18 (출력)
```

### 3. Jekyll Theme 파일 넣기

1. 원하는 Jekyll Theme를 아래 사이트에서 고른다.
** http://jekyllthemes.org/ **

2. 적용하고 싶은 테마의 파일을 압축해제 후 자신의 `github.io repository`를 clone한 폴더 내부로 옮겨준다.

3. 테마를 폴더로 옮겨주었다면 `초기화 작업을 해주는 코드를 작성해야 되는데` 여기서 한 가지 문제가 발생한다.
해당 코드인 `$ bash tools/init.sh`는 Linux 환경에서 사용할 수 있기 때문에 Windows   환경에서는 수동으로 초기화 하는 방법은 선택해야 된다. ** ( 처음부터 WSL을 활용해서 작업하는 것을 추천 ) **
> https://devpro.kr/posts/Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-(3)/
Linux 환경에서 작업할 수 없다면 위 링크를 통해 따라하도록 하자
!! 이렇게 했을 시 환경에 따라 오류가 발생할 수도 있다. 이는 후술함 !!

4. 초기화 작업을 해주었다면 `git bash` 로 `bundler install` 을 입력하면 정상적으로 테마적용이 완료될 것이다.

이후 `config.yml` 과  `assets` 폴더 내부의 css 파일을 수정하는 등 자신의 취향에 맞게 블로그를 꾸밀 수 있다. 

모든 설정이 끝나면 아래 코드를 git bash에 입력하면
```
$ bundle exec jekyll serve
```
![](https://velog.velcdn.com/images/ukja2/post/c203c8b4-d424-4609-872c-8a7b8a79ef02/image.png)

노란색으로 표시한 Server address의 호스팅 주소를 브라우저에 입력하면 자신만의 블로그가 나타난다.
![](https://velog.velcdn.com/images/ukja2/post/6a8311f1-8fef-4a89-9cd2-54234a816c80/image.png)

---
## 오류발생과 해결

### 1. Ruby와 jekyll을 처음 설치하고 테마를 적용하기 전 `jekyll new ./`을 통해 첫 프로젝트 생성후 `bundler install` 실행 시 발생한 오류 
>An error occurred while installing wdm (0.1.1), and Bundler cannot continue.

위 오류에 대한 해결방법은 나의 벨로그에 작성해 놓았다.

### 2. bundle exec로 블로그 실행 시 git bash에 나타난 오류
> assets/js/dist/*.min.js Not Found 

`~~.min.js` 를 찾을 수 없다는 뜻인데
Jekyll Theme는 JavaScript 기반이다 보니 다양한 기능을 적용시키기 위해서는 Node.js가 필요하다. ex) 다크모드, 라이트모드, 검색창기능

이를 해결하기 위해 수많은 검색을 하다가 해결 방법을 찾아냈다.

1. `tools/init.sh` 은 Linux 환경의 node.js를 통해서 사용할 수 있다. 
2. 위 작업을 해주면 `assets/js/dist/*.min.js` 자동으로 생성되는 구조이다. 
아마 내 생각엔 `tools/init.sh` 스크립트 내부에 build를 해주는 기능이 포함된 것 같다.
3. 나는 `tools/init.sh` 대신 수동으로 초기화 작업을 했기 때문에  `*.min.js`가 생성될 수 없었다.

그래서 나는 없는 `*.min.js` 파일을 Node.js를 통해 build하는 방법을 사용했다.

1. 우선 Node.js를 설치
2. git bash로 `npm install` , `npm run build`를 입력해주면 위의 오류가 사라지는 것을 확인할 수 있다. *npm install을 하는 과정에서 아래와 같은 오류가 발생했다. 이와 별개로 위 작업이 정상적으로 진행된다면 오류는 해결된다.*



### 3. Node.js를 설치하고 `npm install`을 설치 과정 중 발생한 오류
>  bash: npm: command not found

위와 같은 오류가 발생했는데 이는 Node.js 설치폴더가 환경변수에 등록되어 있지 않기 때문에 발생한다. 
이는 https://wonisdaily.tistory.com/209 해당 블로그를 참고해서 해결했다.

---
내가 한 방식이 정답이 아닐 수 있으나 해결했으니 마음이 후련하다~