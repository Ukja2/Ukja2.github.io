---
title: useEffect 의존성 배열 제대로 쓰기
date: 2026-09-01
tags: [Dev]
description: 빈 배열, 배열 생략, 값 넣기의 차이
---

`useEffect`의 두 번째 인자(의존성 배열)를 뭘 넣느냐에 따라 언제 실행되는지가 완전히 달라진다.

## 세 가지 경우

```jsx
useEffect(() => { ... })          // 매 렌더링마다 실행
useEffect(() => { ... }, [])      // 처음 마운트될 때 딱 한 번만 실행
useEffect(() => { ... }, [count]) // count가 바뀔 때마다 실행
```

## 흔한 실수: 의존성을 빠뜨리는 것

```jsx
useEffect(() => {
  console.log(count)
}, []) // count를 쓰는데 배열엔 없음
```

이렇게 하면 `count`가 바뀌어도 effect는 처음 값의 `count`만 계속 참조한다(클로저에 갇힘). 이런 버그는 콘솔 경고로는 안 잡히고 동작이 이상하게 느껴질 때만 알아챌 수 있어서 까다롭다.

## 함수나 객체를 의존성에 넣을 때 주의

```jsx
const options = { limit: 10 }
useEffect(() => {
  fetchData(options)
}, [options]) // options는 매 렌더링마다 새로운 객체라 무한 실행됨
```

객체/배열/함수는 매 렌더링마다 새로 만들어지기 때문에, 의존성에 그대로 넣으면 매번 "바뀐 것"으로 취급된다. 필요한 원시값만 꺼내서 의존성에 넣거나, `useMemo`/`useCallback`으로 감싸야 한다.

## 정리

의존성 배열은 "이 effect가 참조하는 값들"을 있는 그대로 적는 것이지, 원하는 실행 타이밍을 임의로 정하는 곳이 아니다.
