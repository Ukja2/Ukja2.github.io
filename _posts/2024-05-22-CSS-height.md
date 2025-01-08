---
layout: post
title: "height: 100vh는 되고 100%는 왜 안될까?"
date: 2024-05-22 23:18 +0800
last_modified_at: 2024-05-22 01:08:25 +0800
tags: []
categories: [CSS]
toc:  true
---
우선 이 문제에 대해 알기 전에 `vh`와 `%` 에 대한 가장 큰 차이점을 알 필요가 있다.
<!--more-->

#### ▶ vh? 
어떠한 화면을 어떤 화면을 꽉 채우고 싶을 때 `100vh(view height)`를 자주 사용하곤 한다. 

이는 `뷰포트` 즉 **현재 화면에서 보여지는 영역**의 높이를 사용하기 때문에 `parent element(부모요소)`와 관계없이 바로 적용이 되기 때문이다. 

그래서 `vh`는 `%`와 달리 속성값을 적용하면 곧 잘 적용되는 것을 볼 수 있다.



#### ▶ height에서 %를 사용하고 싶을 때 중점 요소?
바로 `parent element(부모요소)`다.

% 단위는 반드시 내부요소에서 사용할 때 부모요소의 크기에 따라 영향을 받기 때문이다. 

예시
```
HTML
    <div class="container">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
    </div>
```
```
CSS
.box1{
    height: 100vh;
    background-color: red
}
```
해당 코드는 `부모요소`와 관계없이 바로 100vh 만큼의 크기가 나오게 된다.

하지만
```
CSS
.box1{
    height: 100%;
    background-color: red
}
```
이는 `부모요소`의 크기에 대한 정의가 없기 때문에 **절대** 적용이 안된다.

즉 위의 코드를 적용하고 싶다면
```
CSS
html, body{
    height: 100%;
}
.container{
    height: 100%;
}
.box1{
    height: 100%;
    background-color: red
}
```
이 처럼 `모든 부모요소`에 크기를 지정한 상태로 작성해주어야 한다.

**즉 height에 % 값을 지정하려면 반드시 부모요소에 크기를 지정했는지 확인해보자**

---
여담으로 `width` 속성은 % 단위가 잘 적용되는 데에도 이유도 있는데, 
`최상위 부모 요소`인 html, body의 기본 구조가 `block`이기 때문이다.

또한 `block`은 `height` 값이 `auto`로 지정되기 때문에 우리가 % 단위를 사용했을 때 문제를 자주 겪는 것이다.