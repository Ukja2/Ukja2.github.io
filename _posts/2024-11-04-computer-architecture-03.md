---
layout: post
title: ( Computer Architecture ) 컴퓨터 산술과 논리 연산
date: 2024-11-04 15:39 +0800
last_modified_at: 2024-11-04 01:08:25 +0800
tags: [Computer Architecture]
categories: [Computer Architecture]
toc:  true
---

# 3. 컴퓨터 산술과 논리 연산

### 3.1 ALU의 구성 요소
- 산술 연산장치 : 산술 연산들(+, -, ×, ÷)을 수행
- 논리 연산장치 : 논리 연산들(AND, OR, XOR, NOT 등)을 수행
- 시프트 레지스터(shift register) : 비트들을 좌측 혹은 우측으로 이동시키는 기능을 가진 레지스터
- 보수기(complementer) : 2진 데이터를 2의 보수로 변환 (음수화)
- 상태 레지스터(status register) : 연산 결과의 상태를 나타내는 플래그(flag)들을 저장하는 레지스터

## 3.2 정수의 표현
- 2진수 체계 : 0, 1, 부호 및 소수점으로 수를 표현
[예] -13.62510 = -1101.1012

- 부호 없는 정수 표현의 예
00111001 = 57
00000000 = 0
00000001 = 1
10000000 = 128
11111111 = 255

#### 음수 표현 방법
- 부호화-크기 표현(signed-magnitude representation)
- 1의 보수 표현(1's complement representation)
- 2의 보수 표현(2's complement representation)

### 3.2-1 부호화- 크기 표현
- 맨좌측 비트는 부호 비트, 나머지 (n-1)개의 비트들은 수의 크기(magnitude)를 나타내는 표현 방식
[예] + 9 = 0 0001001 + 35 = 0 0100011
[예] - 9 = 1 0001001 - 35 = 1 0100011

- 부호화-크기로 표현된 2진수를 10진수로 변환
![](https://velog.velcdn.com/images/ukja2/post/f60edf80-4e7f-4b52-9022-af9f415b7827/image.png)

![](https://velog.velcdn.com/images/ukja2/post/b627db6e-6793-43e0-a63d-611d3945e0d1/image.png)

- 결점

▪ 덧셈과 뺄셈을 수행하기 위해서는 부호 비트와 크기를 비교하여 처리하는 복잡한 과정 필요

▪ 0에 대한 표현이 두 개 존재
0 0000000 = + 0
1 0000000 = - 0

➔ n-비트 단어로 표현할 수 있는 수들이 2^n 개가 아닌, (2^n -1)개로 감소

### 3.2-2 보수 표현

- 1의 보수(1's complement) 표현

▪ 모든 비트들을 반전 (0 → 1, 1→ 0)

- 2의 보수(2's complement) 표현

▪ 모든 비트들을 반전하고, 결과값에 1을 더한다

![](https://velog.velcdn.com/images/ukja2/post/ae606fca-34ee-4c3d-a7b7-33bc547a5317/image.png)

- 8-비트 2진수로 표현할 수 있는 10진수의 범위

▪ 1의 보수 : - (2^7 - 1) ∼ + (2^7 - 1)

▪ 2의 보수 : - 2^7 ∼ + (2^7 - 1)
![](https://velog.velcdn.com/images/ukja2/post/0aa8fdb7-9bb9-40bf-b682-e091fa015558/image.png)


#### 2의 보수 -> 10진수 변환
![](https://velog.velcdn.com/images/ukja2/post/8a82b413-52de-480d-8850-114a4e7bfb65/image.png)


### 3.2-3 비트 확장 (Bit Extension)
- 데이터의 길이(비트 수)를 늘리는 방법
[예제] 10진수 21과 -21에 대한 8-비트 길이의 부호화 크기 표현을 16-비트 길이로 확장하라.

+21 = 00110101
+21 = 0000000000010101
-21 = 10010101
-21 = 1000000000010101

- 2의보수 표현의 경우: 확장되는 상위비트들을 부호비트와 같은 값으로 세트
-  부호-비트확장(sign-bit extension)이라 함
[예제] 10진수 21과 -21에 대한 8-비트 길이의 2의 보수 표현을 16-비트 길이로 확장하라.

+21 = 00010101
+21 = 0000000000010101
-21 = 11101011
-21 = 1111111111101011

## 3.3 논리 연산
- 기본적인 논리 연산들
1. AND 연산
2. OR 연산
3. NOT 연산
4. XOR 연산
5. NOT 연산 : 데이터 단어의 모든 비트들을 반전(invert)

#### 선택적-세트연산 / 선택적-보수연산
- 선택적-세트(selective-set) 연산 : B 레지스터의 비트들 중에서 1로 세트된 비트들과 같은 위치에 있는 A 레지스터의 비트들을 1로세트<OR 연산이용>
![](https://velog.velcdn.com/images/ukja2/post/0557df62-bfd3-401a-a567-82e485298374/image.png)

- 선택적-보수(selective-complement) 연산 : B 레지스터의 비트들중에서 1로 세트된 비트들에 대응되는 A레지스터의 비트들을 보수로 변환 <XOR 연산이용>

![](https://velog.velcdn.com/images/ukja2/post/a066fd09-abb4-4fc9-a48e-a6173848c694/image.png)

#### 마스크 연산
- 마스크(mask) 연산: B 레지스터의 비트들중에서 값이 0인 비트들과 같은 위치에 있는 A레지스터의 비트들을 0으로 바꾸는(clear하는) 연산 <AND 연산이용>

![](https://velog.velcdn.com/images/ukja2/post/156a9d96-f30e-4ff0-b341-d6bc35d6c368/image.png)

#### 삽입 연산
- 삽입(insert) 연산 : 새로운 비트값들을 데이터단어 내의 특정 위치에 삽입
- 방법 
① 삽입할 비트 위치들에 대하여 마스크(AND) 연산수행
② 새로이 삽입할 비트들과 OR 연산을수행
![](https://velog.velcdn.com/images/ukja2/post/88a7b85b-cd1b-48ec-a8f8-c37a1d183903/image.png)

#### 비교 연산
- 비교(compare) 연산 

▪ A와B 레지스터의 내용을 비교→XOR 연산 

o 만약 대응되는 비트들의 값이 같으면, A 레지스터의 해당 비트를‘0’으로 세트 

o 만약 서로다르면, A 레지스터의 해당 비트를 ‘1’로세트 

o 모든 비트들이 같으면(A = 00000000), Z 플래그를 1로세트

![](https://velog.velcdn.com/images/ukja2/post/c49351b3-635a-40b3-a89e-d858dd4a4a6f/image.png)

## 3.4 시프트(shift)연산

### 논리적시프트(logical shift)
레지스터 내의 데이터 비트들을 왼쪽 혹은 오른쪽으로 한칸씩이동

▪ 좌측시프트(left shift)

o 모든 비트들을 좌측으로 한칸씩이동
 
o 최하위비트(A1)로는‘0’이들어오고, 최상위비트(A4)는버림
![](https://velog.velcdn.com/images/ukja2/post/cbf8e6ca-5a3d-44fc-a819-460c541841c8/image.png)


▪ 우측시프트(right shift)

o 모든 비트들이 우측으로 한칸씩이동

o 최상위비트(A4)로‘0’이 들어오고, 최하위비트(A0)는 버림

###  순환시프트(circular shift) 
회전(rotate)이라고도 부르며, 최상위 혹은 최하위에 있는 비트를 버리지않고 반대편 끝에있는 비트 위치로이동

▪ 순환좌측-시프트(circular shift-left) : 최상위 비트인 A4가 최하위비트 위치인A1으로 이동
![](https://velog.velcdn.com/images/ukja2/post/0f66b088-706b-4f59-9b5b-4456c47683e2/image.png)


▪ 순환우측-시프트(circular shift-right):  A4→A3, A3→A2, A2→A1, A1 →A4

###  산술적시프트(arithmetic shift)
수(number)를 나타내는 데이터에 대한 시프트

- 방법: 시프트 과정에서 부호비트는 그대로 유지시키고, 수의 크기를 나타내는 비트들만 시프트

(1) 산술적좌측-시프트(arithmetic shift-left)

A4 (불변), A3 <- A2, A2 <- A1, A1 <- 0

(2) 산술적우측-시프트(arithmetic shift-right)

A4 (불변), A4 → A3, A3 → A2, A2 → A1

### C 플래그를 포함한 시프트 연산

- C플래그를 포함한 좌측-시프트(SHLC: shift left with carry)

- C플래그를 포함한 우측-시프트(SHRC: shift right with carry)
 
 ![](https://velog.velcdn.com/images/ukja2/post/648b90a5-81b8-44e3-b0ec-72166e9b0df7/image.png)

- RLC(rotate left with carry): C 플래그를 포함하는 좌측 순환 시프트(회전) 연산
- RRC(rotate right with carry): C 플래그를 포함하는 우측 순환 시프트(회전) 연산

![](https://velog.velcdn.com/images/ukja2/post/b86ccfd1-20e4-428b-9859-ea40fe2794cf/image.png)

## 3.5 정수의 산술 연산

## 3.6 부동소수점 수의 표현
- 부동소수점표현(floating-point representation) : 소수점의 위치를 이동시킬 수 있는 수표현 방법
➔ 수표현 범위확대

- 부동소수점수(floating-point number)의 일반적인 형태
![](https://velog.velcdn.com/images/ukja2/post/bb1d66de-893c-4a2b-8dac-1812d86b95c1/image.png)

단, S : 부호(sign), M : 가수(mantissa),  B : 기수(base),  E : 지수(exponent)

 - 10진 부동소수점 수(decimal floating-point number)
 ![](https://velog.velcdn.com/images/ukja2/post/243a3267-8f3a-4d03-a69f-a45b7e8e805b/image.png)

-  2진 부동소수점 수(binary floating-point number)
![](https://velog.velcdn.com/images/ukja2/post/a7d09fea-b75e-4380-999f-6d51c37adbf6/image.png)
- 단일-정밀도(single-precision) 부동소수점 수 : 32 비트
- 복수-정밀도(double-precision) 부동소수점수 : 64 비트

### 같은 수에 대한 부동소수점 표현
같은 수에 대한 부동소수점 표현이 여러가지가 존재
- 0.1101  × 2^5
- 11.01   × 2^3
- 0.001101 × 2^7

 - 정규화된 표현(Normalized representation)
 - 수에 대한 표현을 한 가지로 통일하기 위한 방법
>±0.1bbb...b × 2E
 
 ▪ 위의 예에서 정규화된 표현은 `0.1101  × 2^5`
 
 ### 부동소수점 표현의 예 (0.1101 x 2^5)

- 부호(S) 비트=  0
- 지수(E) =  00000101 
- 가수(M) = 1101 0000 0000 0000 0000 000

- 소수점 아래 첫 번째 비트는 항상 1이므로, 반드시 저장 할필요는 없음 → 가수 23 비트를 이용하여 소수점 아래24 자리수까지 표현가능

### IEEE 754 표준 부동소수점 수의 형식
- 부동 소수점 수의 표현방식의 통일을 위하여 미국전기전자공학회(IEEE)에서 정의한 표준
#### 32-비트 단일-정밀도 부동소수점 수의 표현
![](https://velog.velcdn.com/images/ukja2/post/d11573c7-f140-49a2-bf77-fecbb884ca4e/image.png)

- 가수: 부호화-크기표현 사용
- 지수필드: 바이어스 127 사용
- 1.M ×2E의 형태를 가지며, 소수점 아래의 M 부분만 가수필드에 저장(소수점 왼쪽의 저장되지 않는 1을 hidden bit라고 부름)

#### 64-비트 복수-정밀도 부동소수점 수의 표현
![](https://velog.velcdn.com/images/ukja2/post/17385705-bdd5-4d3d-9a0c-8e49edda27c7/image.png)

![](https://velog.velcdn.com/images/ukja2/post/9e65cb4a-0a31-4f76-a20f-fbc6104ec69b/image.png)
