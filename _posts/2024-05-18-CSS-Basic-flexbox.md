---
layout: post
title: CSS 기초 - flexbox
date: 2024-05-18 23:18 +0800
last_modified_at: 2024-05-18 01:08:25 +0800
tags: [CSS, flexbox]
categories: [CSS]
toc:  true
---
### ▶ flexbox?
> flexbox란 박스 내 요소 간의 효율적인 공간 배분과 정렬 기능을 제공하기 위한 1차원(행 or 열) 레이아웃 모델이다.

### ▶ flexbox 만들기
1. flexbox는 요소들을 포함하기 때문에 flex container라고도 한다.
2. flex container를 만들기 위해서는 container에 `display:flex;`를 적용해야 한다.

입력
```
    <div class="container">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
    </div>
```
출력
![](https://velog.velcdn.com/images/ukja2/post/d938844c-7646-48ca-a2d9-65966b065f81/image.png)

---
### ▶ 주축, 교차축

flex-direction에 들어가기 전 `주축` 과 `교차축` 개념을 알고가자 

- flexbox에서는 **유연한 Layout 관리**를 위해 **요소의 진행방향**을 의미하는 `주축(main-axis)`과 엇갈리는 `교차축(cross-axis)`의 개념이 매우 중요하다.

![](https://velog.velcdn.com/images/ukja2/post/35a8e7af-3f03-434a-9a23-9a242e7c295f/image.png)

- 위 그림처럼 flexbox의 기본 적으로 주축은 가로 방향 즉 `행(row)` 교차축은 세로 방향 즉 `열(column)`이라고 한다.

- layout의 **주축**을 목적에 따라 `가로` 또는 `세로`로 지정할 수 있으며, 이로 인해 flexbox를 다양하게 활용할 수 있다.
---
### ▶ flex-direction
flex-direction은 flexbox 내 요소를 배치할 때 사용할 주축 및 방향을 지정한다.
flex-direction에는 `row`, `row-reverse`, `column`, `column-reverser` 등이 존재한다.

HTML
```
    <div class="container">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
    </div>
```
CSS - ( row )
```
.container{
	flex-direciton: row;
    }
```
![](https://velog.velcdn.com/images/ukja2/post/36ab414a-033f-4d8a-9d8f-4d89ab0ae268/image.png)

-> flexbox의 기본값, 주축은 행(row)이고, 방향은 콘텐츠 방향과 동일하다.

CSS - (row - reverse)
```
.container{
	flex-direction:row-reverse;
    }
```
![](https://velog.velcdn.com/images/ukja2/post/707b9313-a658-4fee-aa64-93ac0eedae0c/image.png)
-> 주축은 행(row)이고, 방향은 콘텐츠 방향과 반대이다.

CSS - (column)
```
.container{
	flex-direction:column;
    }
```
![](https://velog.velcdn.com/images/ukja2/post/d8349370-5b9a-4090-b40d-cbc0513d2f45/image.png)

-> 주축은 열(column)이고, 방향은 콘텐츠 방향과 동일하다.

CSS - (column - reverse)
```
.container{
	flex-direction:column-reverse;
    }
```
![](https://velog.velcdn.com/images/ukja2/post/47881db9-87f7-4cc3-bc38-5e75c14db909/image.png)

-> 주축은 열(column)이고, 방향은 콘텐츠 방향과 반대이다.

---
### ▶ flexbox 다루기
flexbox를 더욱 유연하게 사용하기 위해 다음과 같은 속성을 사용할 수 있다.

-  `justify-content` : 주축 배치 방법
- `align-items` : 교차축 배치 방법
- `align-self` : 교차축 개별요소 배치 방법
- `flex-wrap` : 줄바꿈 여부

### 1. justify-content
아래의 속성은 전부 `주축을 기준`으로 요소를 다양하게 배치한다. 

(1) `center ` : 요소를 중앙에 배치한다.
(2) `flex-start` : container 앞에 요소를 배치한다.
(3) `flex-end` : container 뒤에 요소를 배치한다.
(4) `space-around` : 요소간 간격을 동일하게 배치한다.
(5) `space-between` : 첫 번째와 마지막 요소를 양 끝에 배치하고, 나머지 요소간의 간격을 동일하게 배치한다.

HTML
```
    <div class="container">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
    </div>
```
CSS - (1), (2), (3)
```
1. .container{
	justify-content: center;
    }
2. .container{
	justify-content: flex-start;
    }
3. .container{
	justify-content: flex-end;
    }
```
![](https://velog.velcdn.com/images/ukja2/post/c55e3efe-7acf-41ec-bef9-07e9b16af62e/image.png)

CSS - (4), (5)
```
4. .container{
	justify-content: space-around;
    }
5. .container{
	justify-content: space-between;
    }
```

![](https://velog.velcdn.com/images/ukja2/post/bb625a4a-7b27-43e3-a4da-64d1fd29c782/image.png)

### 2. align-items
아래의 속성은 전부 `교차축을 기준`으로 요소를 배치한다.

(1) `center` : 요소를 중앙에 배치한다.
(2) `flex-start` : 요소를 container 앞에 배치한다
(3) `flex-end` : 요소를 contianer 뒤에 배치한다.


HTML
```
    <div class="container">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
    </div>
```

CSS - (1), (2), (3)
```
1. .container{
	align-items: center;
    }
2. .container{
	align-items: flex-start;
    }
3. .container{
	align-items: flex-end;
    }    
```
![](https://velog.velcdn.com/images/ukja2/post/58575533-9489-4df9-bbf5-ea8a1cf9ffbf/image.png)

### 3. align-self
교차축 기준 각각의 요소들에 개별적인 속성을 부여할 수 있다.

HTML
```
    <div class="container">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
    </div>

```
CSS 
```
.container {
  display: flex;
  justify-content: space-between;
}
.box1 {
  align-self: flex-start;
}
.box2 {
  align-self: center;
}
.box3 {
  align-self: flex-end;
}
```
![](https://velog.velcdn.com/images/ukja2/post/09fda9da-ae54-4c26-903d-bcc01ad885cb/image.png)

-> box1은 교차축 기준 시작점에 위치해 있고, box2는 중앙 box3는 끝나는 지점에 위치하게 된다.

### 4. flex-wrap
flexbox는 보통 자식 요소의 크기가 container보다 클 때 자식 요소를 줄이게 된다. 

HTML
```
    <div class="container">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
    </div>
```
CSS
```
.container {
  display: flex;
  width: 200px;
  height: 200px;
}
.box1, .box2, .box3{
  width: 80px;
  height: 50px;
}

```
![](https://velog.velcdn.com/images/ukja2/post/e5697735-eb6f-423e-a745-dd73b5aecd7e/image.png)

즉, 자식 요소인 box1~3의 width 총합이 container의 width보다 크게 되면 위와 같이 크기가 작아지게 된다. 이 때 사용할 수 있는 속성이
`flex-wrap`이다.

CSS
```
.container {
  display: flex;
  width: 200px;
  height: 200px;
  
  flex-wrap: wrap; <- 작성
}
.box1, .box2, .box3{
  width: 80px;
  height: 50px;
}

```

`flex-wrap: wrap` 을 사용하면 
![](https://velog.velcdn.com/images/ukja2/post/27c04fb7-29d4-40b3-82f4-eb8f9c9a6987/image.png)

자식 요소의 크기가 container보다 커졌을 때 크기가 작아지지 않고, 
두 행 이상으로 처리할 수 있다.

또한 `flex-wrap: wrap-reverse` 를 통해 역순으로 적용할 수도 있다.