---
layout: post
title: 의존성 주입
date: 2025-04-10 01:00 +0800
tags: [Spring]
categories: [Spring]
toc:  true
---

## 의존성 주입(Dependency Injection, DI)?

이는 Spring에서 객체를 직접 만들지 않고, 필요한 객체를 외부에서 주입받는 것이다.
ㅇ


예를 들어
```
public class Car {
    private Engine engine = new Engine(); // 직접 생성
}
```
Car 객체는 스스로 Engine을 만들고 있다. 이러면 Engine을 바꾸거나 테스트할 때 매우 불편하게 되는데

```

public class Car {
    private Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }
}

```

위의 코드처럼 외부에서 engine을 주입함으로서 Engine 객체를 직접 만들지 않아도 된다.

---

## 의존성 주입 방식

### 1. 필드 주입 방식
```

@Component
public class Car {

    @Autowired
    private Engine engine;
}
```

스프링에서 제공하는 @Autowired 어노테이션을 통해 필드에 주입한다.

- final을 사용할 수 없어 불변성을 보장하지 못한다는 단점이 있다.
- 하지만 가독성이 좋은편

### 2. 생성자 주입 방식

```
@Component
public class Car {

    private final Engine engine;

    @Autowired  
    public Car(Engine engine) {
        this.engine = engine;
    }
}
```
- final을 사용할 수 있어 불변성을 보장한다.
- 테스트하기 용이하다.
- 가장 보편적으로 사용된다.
 
### 3. 세터 주입 방식

 ```

 @Component
public class Car {

    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}

```

이렇게 set 메서드에 @Autowired 붙여서 주입하는 방식으로 
- 필수는 아닌 의존성, 선택적으로 넣고 싶을 때 사용한다.