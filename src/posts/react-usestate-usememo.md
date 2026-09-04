---
title: useState와 useMemo, 언제 써야 할까
date: 2026-08-30
tags: [Dev]
description: 상태와 파생값을 구분해서 생각하면 헷갈리지 않는다
---

리액트 훅을 쓰다 보면 "이걸 상태로 관리해야 하나, 그냥 계산해서 써야 하나" 헷갈릴 때가 있다.

## useState는 "상태"에만

```jsx
const [count, setCount] = useState(0)
```

`count`처럼 그 자체로 값을 바꿀 이유가 있는 데이터에만 `useState`를 쓴다.

## 파생값은 그냥 계산하면 된다

```jsx
const doubled = count * 2
```

`doubled`는 `count`에서 바로 계산할 수 있는 값이라 굳이 상태로 만들 필요가 없다. 상태로 만들면 `count`가 바뀔 때마다 동기화를 신경 써야 해서 버그가 생기기 쉽다.

## useMemo는 "계산 비용"이 문제일 때만

```jsx
const filtered = useMemo(
  () => hugeList.filter((item) => item.active),
  [hugeList],
)
```

`useMemo`는 값을 저장하는 용도가 아니라, **매 렌더링마다 다시 계산하기엔 비싼 연산**을 건너뛰기 위한 최적화 도구다. 리스트가 작거나 계산이 가벼우면 굳이 안 써도 된다.

## 정리

- 상태로 관리해야 할 값 → `useState`
- 다른 값에서 계산 가능한 값 → 그냥 계산
- 계산 비용이 커서 최적화가 필요할 때만 → `useMemo`
