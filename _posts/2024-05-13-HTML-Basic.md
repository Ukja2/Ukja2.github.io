---
layout: post
title: HTML 기초
date: 2024-05-14 23:18 +0800
last_modified_at: 2024-05-14 01:08:25 +0800
tags: [HTML]
categories: [HTML]
toc:  true
---
### ▶ HTML?
> Hyper Text Markup Language의 약자로 문서, 데이터, 텍스트의 구조를 정의하는 언어이다.

### ▶ HTML 구조

![](https://velog.velcdn.com/images/ukja2/post/3aeb2d4e-06e8-4eac-815a-24b756377ecc/image.png)

- `<!DOCTYPE html>` : 문서의 유형을 html로 지정한다.

- `<html lang = "en">` : 페이지의 기본 언어를 영어로 설정 `"ko"`일 경우 한국어

☝ html은 머리인 `<head>`와 몸통인 `<body>`영역으로 이루어져 있다.
- `<head>` : 메타데이터와 같이 문서의 공통적인 특성을 나타내는 부분이다.
	- `<title>` : 웹 페이지의 제목을 정의한다.

- `<body>` : 문서의 내용을 나타낸다.
---

### ▶ HTML Tag

### 1. `<h1>~<h6>`  태그 
제목을 나타내기 위한 태그로 숫자가 낮을 수록 중요도가 높음을 의미한다.

- 입력

```
<h1>안녕하세요!</h1>
<h2>안녕하세요!</h2>
<h3>안녕하세요!</h3>
<h4>안녕하세요!</h4>
<h5>안녕하세요!</h5>
<h6>안녕하세요!</h6>
```

- 출력 
><h1>안녕하세요!</h1> <h2>안녕하세요!</h2><h3>안녕하세요!</h3><h4>안녕하세요!</h4><h5>안녕하세요!</h5><h6>안녕하세요!</h6>

### 2. `<div>` 태그
요소간 구분짓기 위한 태그이다.

-  입력

```
<div>안녕하세요</div>
<div>저는</div>
<div>ukaj2입니다.</div>
```

- 출력
> <div>안녕하세요</div><div>저는</div><div>ukaj2입니다.</div>

### 3. `<span>` 태그
`<div>` 태그의 Inline 형태이다.

- 입력
```
<span>안녕하세요</span>
<span>저는</span>
<span>ukaj2입니다.</span>
```
- 출력 
> <span>안녕하세요</span> <span>저는</span> <span>ukaj2입니다.</span>

-> `<div>`는 Block `<span>`은 Inline의 형태이다.

`Block` : 각 태그가 한 열을 전부 차지한다. (줄 바꿈 성질을 지니고 있다. ex `<h1~6>`, `<p>`)
`Inline` : 각 태그가 자신의 글자 크기만큼 영역을 가지게 된다. (줄 바꿈 성질을 지니고있지 않다. ex `<a>`)

### 4. `<p>`, `<br>`, `<pre>` 태그

- `<p>` :  텍스트를 하나의 문단으로 처리하는 태그이다. Block 요소로 처리된다.

- `<br>` : 줄바꿈 태그로서 사용된다. 

- `<pre>` : 이 태그안의 모든 띄어쓰기, 줄바꿈 등을 웹 페이지에 표시해준다. `<br>` 태그 없이도 줄바꿈을 할 수 있다.

- 입력 
```
    <p> 안녕하세요 <br> ukja2입니다.</p>
    <pre>동해물과 백두산이 마르고 닳도록 
        하느님이 보우하사 우리나라 만세</pre>
```
- 출력
![](https://velog.velcdn.com/images/ukja2/post/1a8b2203-ca1e-4a60-b0e8-f5182e244b15/image.png)

- 이와 같이 `<p>` 태그 안에서 `<br>` 태그를 사용함으로써 줄 바꿈이 되는 형태를 볼 수 있다. 또한 `<pre>` 태그 내의 모든 띄어쓰기와 줄바꿈이 웹페이지에 적용된다.

### 5. `<a>` 태그
하이퍼링크 태그로 이를 클릭 시 지정된 하이퍼링크로 이동한다. 

- 입력
```
<a href="https://velog.io/@ukja2/posts">ukja2의 velog</a>
```
- 출력 
![](https://velog.velcdn.com/images/ukja2/post/b823591d-29a4-408a-8ac2-790f2d61787d/image.png)
해당 텍스트를 클릭 시 지정 된 하이퍼링크로 이동하게 된다.

### 6. `<ol>`, `<ul>`, `<li>` 태그
- `<ol>` 과 `<li>`는 목록태그로 각각 하나의 `<li>` 태그를 가져야 하며, 각각 순서가 존재하는 태그, 순서가 존재하지 않는 태그로 구별된다.

- 입력
```
    <ol>
        <li>포도</li>
        <li>사과</li>
        <li>바나나</li>
    </ol>
    <ul>
        <li>포도</li>
        <li>사과</li>
        <li>바나나</li>    
    </ul>
```

- 출력
![](https://velog.velcdn.com/images/ukja2/post/5e8ff24f-f0f0-4dbb-8900-177019269f1e/image.png)

### 7. `<img>` 태그
이미지를 삽입하는 태그이다.

- 입력
```
<img src="/velog.png" width="400px", height="200px"alt="벨로그">
```
- 출력
![](https://velog.velcdn.com/images/ukja2/post/b4b4e587-af5a-4357-a91c-573d98d34547/image.png)

- / : 경로를 통해 폴더 내의 이미지를 삽입한다.
- width, height : 이미지의 가로 및 세로 길이를 설정한다.
- alt : 이미지를 불러올 수 없을 때 이름을 설정한다.

### 8. `<form>` 태그

사용자로 부터 데이터를 입력받을 때 사용한다.

### 9. `<input>` 태그
사용자의 입력이 필요할 경우 사용한다.
또한 `<input>`태그는 type의 종류에 따라 다양하게 사용할 수 있다.

- 입력
```
    <input type="text" value="아이디">
    <input type="pasword" value="비밀번호">
    <input type="button" value="버튼"><br>
    <input type="date"><br>
    <input type="radio" value="radio">라디오<br>
    <input type="checkbox" value="checkbox">체크박스<br>
    <input type="file"><br>
    <input type="search" placeholder="검색어를 입력해주세요!"><br>
    <input type="hidden" value="hidden"><br>
```

- 출력
![](https://velog.velcdn.com/images/ukja2/post/d132286d-c901-48da-8f0f-44106c33611b/image.png)


### 10. `<filed>`, `<legend>` 태그

- `<filed>` : form내의 여러 요소들을 그룹화할 때 사용한다.

- `<legend>` : 해당 그룹의 제목을 설정한다.

- 입력 
```
    <fieldset style="width: 200px;">
        <legend>정보</legend>
        이름 : <input type="text" name="name">
        나이 : <input type="text" name="age">
    </fieldset>
```

- 출력 
![](https://velog.velcdn.com/images/ukja2/post/72aea13b-abe0-4492-b07b-2c59e0ef540f/image.png)

⭐ 추가적인 `<input>` 태그의 속성들

- name : 태그 이름을 지정한다.
- maxlength : 태그의 최대 글자 수를 지정한다.
- required : 해당 태그가 필수로 지정된다. 필수 태그를 입력하지 않고 제출 시 error가 발생한다.
- placegholder : 태그에 입력할 값에 대한 힌트를 제공한다.
- pattern : 정규표현식을 사용하여 특정범위 내 유효한 값을 입력받을 때 사용한다.

- 입력
```
<form>
    <fieldset style="width: 350px; background-color:bisque;">
        <legend>개인 정보</legend>
        이름 : <input type="text" name="name"><br><br>
        나이 : <input type="text" name="age"><br><br>
        주민등록번호 : <input type="text" name="security-number" style="width: 80px;"
                    pattern="\d{1,6}"
                    title = "6자리만 입력해주세요!"> 
                    - <input type="text" name="security-number2" style="width: 80px;"
                    pattern="\d{1,7}"
                    title = "7자리만 입력해주세요!"><br><br>
        아이디 : &nbsp &nbsp<input type="text" name="id"
                    pattern ="^[a-zA-Z0-9]+$"
                    title = "영어 소문자 또는 대문자와 숫자만 사용 가능합니다!"><br><br>
        비밀번호 : <input type="password" name="password"><br><br>
        성별 : 남<input type="radio" name="gender"> 여<input type="radio" name="gender"> <br><br>

        <input type="submit" value="제출">
        <input type="reset" name="초기화">
    </fieldset>
</form>
```
- 출력 
![](https://velog.velcdn.com/images/ukja2/post/5bb1843b-921c-488a-ad17-171e2f73c4ac/image.png)

이와 같이 여러가지 input 속성과 적절히 style 태그를 통해 간단한 개인정보 form을 만들어 볼 수 있다.

### 11. Semantic 태그

![](https://velog.velcdn.com/images/ukja2/post/66843040-4361-4a1a-92b0-b9601ff28bec/image.png)

웹페이지의 태그에 의미를 부여하는 태그이다. 

- **`<header>`** : 문서나 섹션의 헤더를 정의한다.
- **`<nav>`** : 내비게이션 링크를 정의한다.
- **`<main>`** : 문서의 주요 콘텐츠를 정의한다.
- **`<section>`** : 문서의 섹션을 정의한다.
- **`<article>`** : 독립적으로 구분되거나 재사용 가능한 콘텐츠 영역을 정의한다.
- **`<aside>`** : 주변 내용을 설명하는 영역을 정의한다.
- **`<footer>`** : 문서나 섹션의 푸터를 정의한다.