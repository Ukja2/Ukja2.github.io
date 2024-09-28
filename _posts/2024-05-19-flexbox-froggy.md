---
layout: post
title: Flexbox Froggy Practice
date: 2024-05-19 23:18 +0800
last_modified_at: 2024-05-19 01:08:25 +0800
tags: [flexbox froggy]
categories: [CSS]
toc:  true
---

### ▶ Flexbox froggy?



>  flexbox 속성을 통해 개구리들을 수련잎으로 옮기는 게임이다.

`flex-direction` , `justift-content` , `align-items`  등을 활용해 보다 flexbox에 대한 개념을 쉽게 익힐 수 있다. 

---
### ▶  1 단계
문제
![](https://velog.velcdn.com/images/ukja2/post/06f08778-7682-4f3d-8695-c8dc7a0efee9/image.png)

정답
```
#pond {
  display: flex;
  justify-content: flex-end; 
}
```
justify-content - `주축`을 기준으로 내부요소를 변경하는 속성이다. 
flex-end로 개구리를 container 가장 끝으로 보낼 수 있다.

### ▶ 2단계
문제
![](https://velog.velcdn.com/images/ukja2/post/6b431201-3c9f-4e7a-9c7f-20e42a0b9dcc/image.png)
정답
```
#pond {
  display: flex;
  justify-content: center
}
```
center 속성으로 내부요소를 중간에 배치할 수 있다.
### ▶ 3단계
문제
![](https://velog.velcdn.com/images/ukja2/post/34678acb-8c59-477f-ab22-c3edcaf117af/image.png)

정답
```
#pond {
  display: flex;
  justify-content: space-around;
}
```
space-around로 내부 요소간 간격을 일정하게 배치할 수 있다.

### ▶ 4단계
문제
![](https://velog.velcdn.com/images/ukja2/post/1263cbf5-7964-45a2-bbc9-7b3eae553d2a/image.png)
정답
```
#pond {
  display: flex;
  justify-content: space-between;
}
```
space-between으로 처음과 끝의 내부 요소를 양 끝에 배치하고, 중간 요소들을 일정한 간격으로 배치할 수 있다.
### ▶ 5단계
문제
![](https://velog.velcdn.com/images/ukja2/post/639370d7-0d5d-4485-9c6f-d7dcbcbc459a/image.png)
정답
```
#pond {
  display: flex;
  align-items: flex-end;
}
```
align-items - `교차축` 을 기준으로 내부 요소를 변경하는 속성이다.
여기서 flex-end를 통해 교차축의 맨 끝으로 내부 요소들을 배치할 수 있다.

### ▶ 6단계
문제
![](https://velog.velcdn.com/images/ukja2/post/6150378f-ff5f-49a2-9623-081b46c24782/image.png)

정답
```
#pond {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
`align-items` 와 `justify-content`를 함께 활용해야 하는 문제이다. 순서와 상관없이 주축 또는 교차축을 `center` 속성으로 이동 시키고, 남은 축을 기준으로 다시 한 번 `center` 속성을 사용한다면 정 중앙에 배치할 수 있다.
### ▶ 7단계
문제
![](https://velog.velcdn.com/images/ukja2/post/f1cf13ec-e001-458f-8828-3f35d4b18064/image.png)
정답
```
#pond {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
```
우선 `주축`을 기준으로 space-around 속성으로 내부 요소들의 간격을 일정하게 맞춰주고, 이후 `교차축` 기준으로 내부 요소들을 container 가장 아래쪽으로 배치할 수 있다.


### ▶ 8단계
문제
![](https://velog.velcdn.com/images/ukja2/post/d199b99b-6b5a-4c7f-a08d-5cd446faf6e8/image.png)
정답
```
#pond {
  display: flex;
  flex-direction: row-reverse;
}
```
`flex-direction`으로 주축을 `row(행)` 로 하되 `reverse`로 내부 요소들의 컨텐츠 방향을 반대로 배치한다.
### ▶ 9단계
문제
![](https://velog.velcdn.com/images/ukja2/post/82547e3d-d9fd-498a-82ec-200873f94562/image.png)
정답
```
#pond {
  display: flex;
  flex-direction: column;
}
```
주축 방향을 `열(column)`으로 설정하여 요소들을 수직으로 순서대로 배치한다. 

### ▶ 10단계
문제
![](https://velog.velcdn.com/images/ukja2/post/39899d87-f5c3-434f-ae0d-6dc5d277d5f3/image.png)
정답
```
#pond {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```
우선 주축을 `row-reverse`로 설정한다
![](https://velog.velcdn.com/images/ukja2/post/8dab0bca-8cca-4098-86ba-208c37ad96e9/image.png)
이후 주축이 `row-reverse`인 상태에서 `justify-content`로 오른쪽을 시작점으로 `flex-end` 속성을 통해 끝자리로 배치한다.
![](https://velog.velcdn.com/images/ukja2/post/e228a707-6cba-4bb1-99c6-9d53a3e0147e/image.png)

### ▶ 11단계
문제
![](https://velog.velcdn.com/images/ukja2/post/ab5c03ea-ca57-4edf-be34-92807bd6e023/image.png)
정답
```
#pond {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
```
우선 주축을 `열(column)`으로 설정한다.
![](https://velog.velcdn.com/images/ukja2/post/5023fde3-868f-4449-90f9-20d8cf2d374c/image.png)
이후 주축을 기준으로 내부 요소들을 가장 끝 지점으로 배치한다.
![](https://velog.velcdn.com/images/ukja2/post/5eafe960-8091-406a-a2ac-90e2b17c08cb/image.png)

### ▶ 12단계
문제
![](https://velog.velcdn.com/images/ukja2/post/5e9262ea-ee32-4860-af7b-f8225796da89/image.png)
정답
```
#pond {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}
```
주축의 방향을 `열(column)` , 콘텐츠 방향을 역방향으로 설정한다.
![](https://velog.velcdn.com/images/ukja2/post/dd34e768-d3d2-4637-a528-15ba2977fd0b/image.png)
이후 `space-between` 속성으로 처음과 끝에 해당하는 내부 요소들을 `container` 양 끝에 배치하고 중간 요소를 일정 간격으로 배치한다.
![](https://velog.velcdn.com/images/ukja2/post/f43a9e96-47c2-47f3-8783-0aff5c68d379/image.png)

### ▶ 13단계
문제
![](https://velog.velcdn.com/images/ukja2/post/d881d62f-e015-474d-a7e0-2f1cb0ec0198/image.png)
정답

```
#pond {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-end;
}
```
1. 주축을 행(row), 컨텐츠 방향을 반대로 설정한다.
![](https://velog.velcdn.com/images/ukja2/post/056497df-6ce4-4d92-9914-8b0d2d5a9a9a/image.png)
2. 내부 요소들을 중앙으로 정렬한다.
![](https://velog.velcdn.com/images/ukja2/post/e41414a9-ae05-4f89-8126-6a93a2164fe9/image.png)
3. 교차축을 기준으로 내부 요소들을 가장 끝자리로 배치한다.
![](https://velog.velcdn.com/images/ukja2/post/ea77b993-e25d-43ad-b643-a5915124f601/image.png)

### ▶ 14단계
문제
![](https://velog.velcdn.com/images/ukja2/post/cc1725ba-b350-4afe-8c1c-81dbf7a4706f/image.png)
정답
```
.yellow {
order: 1;
}
```
flexbox에서 행(row)과 열(column)을 굳이 바꾸지 않더라도 `order`를 통해 순서를 조절할 수 있다.
숫자가 낮을 수록 높은 우선 순위를 가지기 때문에 -1, 0, 1 의 순서대로 배치된다 했을 때 1을 입력하면 적절한 수련잎 위치로 이동할 수 있게된다.

### ▶ 15단계
문제
![](https://velog.velcdn.com/images/ukja2/post/82a35a6e-4af7-4bd2-8df9-afe8895366e9/image.png)
정답
```
.red {
order: -1
}
```
낮은 숫자가 우선 순위를 가지기에 `-1`이 정답이 된다.

### ▶ 16단계
문제
![](https://velog.velcdn.com/images/ukja2/post/2951fa99-e770-4f55-97de-f775b4566a0b/image.png)
정답
```
.yellow {
align-self: flex-end;
}
```
`align-self` 는 각각의 개별 요소에 적용할 수 있는 속성이다. `.yellow` 선택자에 따로 `flex-end`를 적용해 교차축의 끝자리에 배치할 수 있다.

### ▶ 17단계
문제
![](https://velog.velcdn.com/images/ukja2/post/45f9a91a-cd74-46f3-96c3-2d228f7b66ab/image.png)
정답
```
.yellow {
order:1;
align-self:flex-end;
}
```
우선 `.yellow`의 우선 순위를 뒤로 설정하기 위해 `1`을 적용하면 다음과 같이 된다.
![](https://velog.velcdn.com/images/ukja2/post/9ae2c164-1bcf-4daa-9d7c-ab5ca427add7/image.png)
이후 `.yellow`란 개별 요소의 위치를 변경하기 위해 
`align-self` 속성으로 교차축의 끝자리에 배치하면 된다.

### ▶ 18단계
문제
![](https://velog.velcdn.com/images/ukja2/post/49be1f4e-3969-4ddd-a0de-a6de865d96e9/image.png)
정답
```
#pond {
  display: flex;
  flex-wrap: wrap;
}
```
`flexbox`는 기본적으로 내부 요소의 크기가 `container` 의 크기를 넘어가면 자체적으로 크기가 줄어들게 된다.
이를 해결하기 위해 `flex-wrap` 속성이 존재하는데 `flex-wrap: wrap` 을 적용하게 된다면 container 크기를 초과하는 내부 요소들이 다수의 행으로 분리되어 크기를 유지한 채 정렬된다.
![](https://velog.velcdn.com/images/ukja2/post/e5c4f5a4-d661-49bd-878d-ec13df72d94e/image.png)


### ▶ 19단계
문제
![](https://velog.velcdn.com/images/ukja2/post/45ce56de-4b5e-4e4b-8b47-a4ada760e6a5/image.png)

정답
```
#pond {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
```
`flex-wrap:wrap` 으로 `container` 의 크기에 맞게 정렬한다.
![](https://velog.velcdn.com/images/ukja2/post/cbff7292-b48a-4511-b512-4fa859c0802b/image.png)
이후 `주축` 을 `열(column)` 로 설정하면 색에 맞는 수련잎 위로 개구리가 정렬된다.

![](https://velog.velcdn.com/images/ukja2/post/3636578c-48b5-44ef-b543-b76b5ac737d5/image.png)

### ▶ 20단계
문제
![](https://velog.velcdn.com/images/ukja2/post/8f50d929-9f9c-4a9a-9da8-d820ce3fdacb/image.png)

정답
```
#pond {
  display: flex;
  flex-flow: column wrap;
}
```
이전 문제와 동일한 문제이다. 하지만 `flex-flow`를 사용하는데, 이는 `flex-direction` 과 `flex-wrap`이 자주 사용되기 때문에
이 두 속성을 함께 사용할 수 있게 만드는 속성이다. 

### ▶ 21단계
문제
![](https://velog.velcdn.com/images/ukja2/post/53bd1632-d6c5-4afc-bc65-7acd3400bf46/image.png)
정답
```
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
```
`align-content`는  여러 줄들 사이의 간격을 지정하는 속성이다.
`align-items`는 컨테이너 안에서 어떻게 모든 요소들이 정렬하는지를 지정한다. 
예를 들어 한 줄만 있는 경우, `align-content`는 효과가 없다.

문제에서는 `flex-start`를 통해 여러 줄의 개구리를 container의 꼭대기에 정렬할 수 있게 된다.

### ▶ 22단계
문제
![](https://velog.velcdn.com/images/ukja2/post/f2ea97cd-40f3-4cb7-8b55-1405ce7f37aa/image.png)
정답
```
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}
```
21번 문제와 동일한 방법으로 `flex-end`를 통해 끝자리로 정렬할 수 있다.

### ▶ 23단계
문제
![](https://velog.velcdn.com/images/ukja2/post/5133f5a6-380b-4a2d-8ada-cfd57123c7ac/image.png)
정답
```
#pond {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  align-content:center;
}
```
`flex-direction`을 `column-reverse` 로 설정하면 `주축`은 열(column) 컨텐츠는 원래의 역방향으로 되기 때문에 노란색 개구리가 첫 번째로 수직으로 정렬된다.
![](https://velog.velcdn.com/images/ukja2/post/e0345cec-528c-4262-ae83-cbf2fe1ba7f5/image.png)

이후 교차축을 중앙으로 정렬하면 된다.
![](https://velog.velcdn.com/images/ukja2/post/f2da8016-18a3-4764-9707-78030db08a2d/image.png)

### ▶ 24단계
문제
![](https://velog.velcdn.com/images/ukja2/post/deb88a93-5dc6-4170-87eb-f0c3ec3e443d/image.png)

정답
```
#pond {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap-reverse;
  align-content: space-between;
  justify-content: center;
}
```
지금까지 연습한 내용을 토대로 응용하는 마지막 문제이다.

1. 우선 `주축`을 `열(column)` /  `콘텐츠 방향을 역순`으로 설정한다.
![](https://velog.velcdn.com/images/ukja2/post/8210771c-4605-44df-b724-5791723ce4eb/image.png)

2. 이후 `빨간 개구리가 1번` `녹색 개구리가 2번` `노란색 개구리가 3번`이라고 했을 때 `flex-wrap`을 wrap으로 정렬해보자

![](https://velog.velcdn.com/images/ukja2/post/0cd2a7e1-965a-476e-a114-3ea857227347/image.png)
3. 1번과 2번이 꽉찼으니 3번인 노란색 개구리가 다음 열로 넘어가게 된다. 그렇다면 이를 반대로 `wrap-reverse`로 나타내보면 이렇게 된다. 

![](https://velog.velcdn.com/images/ukja2/post/9ce909a5-adba-4f06-a42e-bc010f966bfd/image.png)


4. 이후 `align-content`로 교차축인 행을 `space-between`으로 내부 요소들을 양끝에 배치시키게 된다면 다음과 같이 된다.
![](https://velog.velcdn.com/images/ukja2/post/d4a587d3-3bcf-4d51-a9d2-58947685be04/image.png)

5. 마지막으로 주축을 설정하는 속성인 `justify-content`로 가운데 정렬을 해준다면?
![](https://velog.velcdn.com/images/ukja2/post/ad2cc4b3-7ee0-498c-a6e9-4a5b44504efc/image.png)
