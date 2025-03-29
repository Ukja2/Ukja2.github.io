---
layout: post
title: Getter & Setter
date: 2025-03-29 00:00 +0800
tags: [Java]
categories: [Java]
toc:  true
---

#### Getter & Setter?

클래스 내부의 private 필드에 접근하거나 값을 설정하는 방법을 제공하는 메서드들이다.

Getter: 필드의 값을 반환하는 메서드

Setter: 필드의 값을 설정하는 메서드


#### 왜 필요한가?
자바에서는 private 접근 제어자를 사용해서 클래스의 필드를 외부에서 직접 접근하지 못하도록 막을 수 있는데, Getter와 Setter는 이런 제한을 우회해서 필드에 접근하거나 값을 변경할 수 있게 해주는 역할을 한다.


#### 예시
```
public class Person {

    // 필드는 private으로 설정 (외부에서 직접 접근 불가)
    private String name;
    private int age;

    // Getter: name 필드의 값을 반환
    public String getName() {
        return name;
    }

    // Setter: name 필드에 값을 설정
    public void setName(String name) {
        this.name = name;
    }

    // Getter: age 필드의 값을 반환
    public int getAge() {
        return age;
    }

    // Setter: age 필드에 값을 설정
    public void setAge(int age) {
        this.age = age;
    }
}
```