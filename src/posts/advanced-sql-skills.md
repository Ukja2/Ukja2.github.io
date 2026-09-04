---
title: SQL 고급 스킬 정리
date: 2026-09-04
tags: [DataBase]
description: 윈도우 함수, CTE, 서브쿼리 등 한 단계 나아간 SQL 기법들
---

기본적인 `SELECT ... WHERE ... GROUP BY`를 넘어서, 실무에서 자주 쓰이는 조금 더 고급 SQL 기법들을 정리한다.

## 1. 윈도우 함수 (Window Function)

`GROUP BY`는 여러 행을 한 줄로 뭉개버리지만, 윈도우 함수는 **행을 그대로 유지하면서** 그룹별 계산 결과를 각 행에 붙여준다.

```sql
SELECT
  name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
```

`PARTITION BY`로 그룹을 나누고, 그 안에서 `ORDER BY` 기준으로 순위를 매긴다. "부서별 연봉 순위를 매기되, 각 직원 정보는 그대로 보고 싶다"는 요구에 딱 맞는 방식이다.

- `ROW_NUMBER()`: 무조건 1,2,3... 순서대로 (동점이어도 순위 안 겹침)
- `RANK()`: 동점이면 같은 순위, 다음 순위는 건너뜀 (1,2,2,4)
- `DENSE_RANK()`: 동점이면 같은 순위, 다음 순위는 안 건너뜀 (1,2,2,3)

## 2. CTE (Common Table Expression)

`WITH`으로 임시 결과 집합에 이름을 붙여서, 복잡한 쿼리를 단계별로 읽기 쉽게 쪼갤 수 있다.

```sql
WITH high_spenders AS (
  SELECT customer_id, SUM(amount) AS total
  FROM orders
  GROUP BY customer_id
  HAVING SUM(amount) > 1000000
)
SELECT c.name, h.total
FROM high_spenders h
JOIN customers c ON c.id = h.customer_id;
```

서브쿼리를 여러 겹 중첩하는 대신, `WITH`로 이름 붙은 단계를 순서대로 쌓아 올리면 나중에 다시 읽을 때도 훨씬 이해하기 쉽다.

## 3. 서브쿼리 vs JOIN vs EXISTS

같은 결과를 내는 방법이 여러 개일 때가 많다.

```sql
-- 서브쿼리(IN)
SELECT * FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE grade = 'VIP');

-- EXISTS
SELECT * FROM orders o
WHERE EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id AND c.grade = 'VIP');
```

`IN`은 서브쿼리 결과를 다 모아서 비교하고, `EXISTS`는 조건에 맞는 행이 "하나라도 있으면" 바로 true로 끝낸다. 서브쿼리 결과가 매우 클 때는 `EXISTS`가 더 빠른 경우가 많다.

## 4. CASE WHEN으로 조건부 집계

```sql
SELECT
  department,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count,
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count
FROM employees
GROUP BY department;
```

`GROUP BY`와 `CASE WHEN`을 조합하면, 조건별로 나눠서 한 번에 집계표(피벗)를 만들 수 있다.

## 정리

이 기법들의 공통점은 결국 하나다 — **쿼리를 여러 번 나눠 실행하거나 애플리케이션 코드로 후처리할 걸, DB 안에서 한 번에 해결한다.** 그만큼 DB 서버에 부하가 몰릴 수 있으니, 실행 계획(`EXPLAIN`)을 같이 확인하는 습관을 들이는 게 좋다.
