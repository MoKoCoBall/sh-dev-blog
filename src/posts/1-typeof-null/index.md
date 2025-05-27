---
title: "[JavaScript] typeof 동작 원리와 의문(null, NaN) 해결하기"
date: "2025-05-27"
emoji: "🤔"
tags: ["js"]
preview: "typeof 출력 결과를 JS 엔진 구현을 살펴보며 이해하기"
---

> JavaScript 를 공부하다 보면 우리는 이런 이상한(?) 출력값을 본 적이 있을거에요.  
> `typeof null`의 값이 `object`라고?, `typeof NaN`의 값이 `number`라고?  
> 왜 이렇지? 라는 생각은 가졌지만 진짜 이유는 모르는 분들이 많을거에요.
> 오늘은, **JS 엔진 내부 구현**을 통해서 이 값들이 왜 저렇게 나오는지에 대해 알아보고, 의문을 가졌던 **NaN**에 대해서도 알아볼게요.

# typeof 함수

대부분은 알고 있겠지만, `typeof`는 피연산자의 타입을 문자열로 반환하는 함수에요.

JS 를 이용하면 다음과 같은 값들을 볼 수 있어요.

```javascript
typeof undefined; // "undefined"
typeof null; // "object"
typeof NaN; // "number"
typeof function () {}; // "function"
typeof true; // "boolean"
typeof []; // "object"
typeof "Hello"; // "string"
```

이런 값을 가지고 있다는 것을 개발자 도구를 통해서도 볼 수 있고, JS 코드를 간단하게 작성해도 알 수 있어요.

이 `typeof`를 표로 정리하면 다음과 같아요.

| 값                 | typeof 결과 |
| ------------------ | ----------- |
| undefined          | "undefined" |
| null               | "object"    |
| true, false        | "boolean"   |
| 123, NaN, Infinity | "number"    |
| "hello"            | "string"    |
| function() {}      | "function"  |
| [], {}             | "object"    |

출력값이 이렇게 간단하지만 몇 가지 의문이 들 수 있습니다.

> 1. `typeof null`이 왜 `"object"`일까?
> 2. `typeof function(){}`은 객체인데 왜 `"object"`가 아니고 `"function"`일까?
> 3. `typeof NaN`이 왜 `"number"`일까?

1번과 2번에 대한 해답은 `typeof`의 내부 구현을 보면 알 수 있고, 3번에 대한 해답은 `NaN`에 대한 이해를 통해 알 수 있어요.

물론 브라우저마자 JS 엔진은 다르지만, 모두 **ECMAScript(ECMA-262) 명세**를 따르기 때문에 결과는 동일하게 나타납니다.

가장 유명한 **V8** 엔진이 있지만, 내부 구현이 너무 복잡하게 얽혀 있는 관계로 다른 구현을 통해 `typeof`에 대해 알아보도록 할게요.

혹시라도 V8 구현이 궁금하다면 [V8 깃허브](https://github.com/v8)에서 확인할 수 있다.

---

# JS 엔진의 typeof 구현

우선 **type tag**을 통해 타입을 저장하는 **작은 3비트를 하위 비트에 저장**하여 타입을 나타내요.

표로 나타내면 다음과 같이 나타낼 수 있어요.

| 타입 태그 | 의미    | 설명                     |
| --------- | ------- | ------------------------ |
| 000       | object  | 데이터는 객체 참조       |
| 1         | int     | 데이터는 31비트 정수     |
| 010       | double  | 데이터는 부동소수점 참조 |
| 100       | string  | 데이터는 문자열 참조     |
| 110       | boolean | 데이터는 boolean 값      |

JS 엔진에서의 `typeof`내부 구현은 다음과 같아요. 참고로, `void`는 `undefined`에 대응해요.

## 내부 코드

```C
    JS_PUBLIC_API(JSType)
    JS_TypeOfValue(JSContext *cx, jsval v)
    {
        JSType type = JSTYPE_VOID;
        JSObject *obj;
        JSObjectOps *ops;
        JSClass *clasp;

        CHECK_REQUEST(cx);
        if (JSVAL_IS_VOID(v)) {  // void 타입인지 아닌지 확인 (undefined)
            type = JSTYPE_VOID;
        } else if (JSVAL_IS_OBJECT(v)) {  // object 타입 나누기
            obj = JSVAL_TO_OBJECT(v);
            // 함수 판별 로직
            if (obj &&
                (ops = obj->map->ops,
                 ops == &js_ObjectOps
                 ? (clasp = OBJ_GET_CLASS(cx, obj),
                    clasp->call || clasp == &js_FunctionClass)
                 : ops->call != 0)) {
                type = JSTYPE_FUNCTION; // function 타입 확인
            } else {
                type = JSTYPE_OBJECT; // object 타입 확인
            }
        } else if (JSVAL_IS_NUMBER(v)) {
            type = JSTYPE_NUMBER; // number 타입 확인
        } else if (JSVAL_IS_STRING(v)) {
            type = JSTYPE_STRING; // string 타입 확인
        } else if (JSVAL_IS_BOOLEAN(v)) {
            type = JSTYPE_BOOLEAN; // boolean 타입 확인
        }
        return type;
    }
```

대부분은 코드를 보면 내부 로직까지는 이해하지 못하더라도, 어떤 방식으로 동작하는지에 대해 알 수 있어요.

이제 처음에 궁금했던 3가지에 대해 답을 할 수 있어요.

---

# 1️⃣ typeof null === "object"

### 사실 이건 자바스크립트의 초기 설계 문제에요.

분명 자바스크립트에서 `null`은 원시 타입이지만, `"object"`를 반환하기 때문에 이는 버그이고 당시 JS를 설계한 브렌던 아이크(Brendan Eich)도 이를 인정했어요.

이런 버그를 왜 방치할까요? 이유는 간단해요.

> 너무 많은 코드가 `typeof null === object`을 전제로 하여 작성되었기 때문이에요.

그 결과, 이제는 우리 모두가 아는 버그가 된 것이죠.

내부적으로는 JS 엔진이 `null`을 0의 주소를 가진 객체 참조와 같이 처리했고, 이로 인해 `typeof null`의 값이 오늘과 같은 `"object"`가 된 것이에요.

`null`의 값이 0인 이유는 C나 C++의 영향을 받았어요. `NULL`포인터의 값이 0으로 정의되어 있기 때문이에요.

```C
int* ptr = NULL; // NULL 의 값은 0 (C 언어)
```

결론적으로, `typeof null`의 값은 버그지만 앞으로도 수정되지 않을 버그에요.

---

# 2️⃣ typeof function(){} === "function"

### 함수도 분명 객체인데, 왜 function 이라는 타입이 따로 있을까요?

이 문제도 내부 코드를 확인하면 해결 가능해요.

이 두 조건을 이용해서 `function`타입이라는 것을 알 수 있어요.

```javascript
clasp->call || clasp == &js_FunctionClass
```

굳이 이렇게 타입을 나눈 이유는 단 하나에요.

> 함수의 **호출 가능하다는 특성** 때문이에요.

이 속성이 함수가 아닌 객체와 함수에 차별을 두게 했고, 이는 **ECMAScript 명세**에도 적혀 있어요.

> If Type(x) is Object:
>
> - If x implements [[Call]], then return "function".
> - Otherwise, return "object".

구체적으로는 `[[Call]]`이 있어야 `function`으로 파악해요. 이는 호출 가능한 함수에만 존재하는 **내부 메소드**에요.

---

# 3️⃣ typeof NaN === "number"

### NaN 은 Not a Number 인데, 왜 이게 number 일까요?

`NaN`은 실제로 **숫자가 아님**을 의미하는 값이에요. 하지만 아이러니하게도 이 값은 **숫자로 표현**되어 있어요.

> 숫자 중에서 유효하지 않은 숫자임을 나타내는 **특수한 값**이 `NaN`의 정체에요.

분명 `NaN`은 숫자가 아님을 나타내기 위해 있는 값이에요.

다음과 같은 코드의 출력이 `NaN`을 반환하기 때문이에요.

```javascript
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
```

그렇더라도 `NaN`이 숫자인 이유는 자바스크립트의 숫자 저장 방식 때문이에요.

자바스크립트는 **IEEE 754 부동소수점** 형식을 이용해서 **정수, 실수, NaN, Infinity** 를 표현해요.

결국 `NaN`은 숫자라는 체계 안에서 정의된 특수한 값이기 때문에, `typeof` 결과가 `"number"`가 되는 거예요.

`NaN`의 재밌는 성질이라면 `===`연산자를 이용할 때 둘은 절대 같지 않다는 점이 있어요.

```javascript
NaN === NaN; // false
```

`NaN`의 비교를 원한다면, `isNaN()`등의 함수를 이용해야 해요.

더 자세한 얘기를 다루고 싶지만, `typeof`에 대한 얘기를 다루는 글이기 때문에 저런 식으로 비교할 수 있다는 정도만 다룰 생각이에요.

---

`typeof null === "object"`처럼 당연하지 않은 결과 뒤에는, 자바스크립트 엔진 내부 구현과 자바스크립트의 역사가 숨어 있었어요.

외워서 넘기기보다는, **"왜?"**라는 질문을 던져보면서 공부하면 자바스크립트가 더 흥미롭게 느껴질지도 몰라요.

앞으로도 자바스크립트에서 생기는 궁금증을 하나씩 파헤쳐보는 글로 돌아올게요!

댓글과 피드백은 언제든지 환영입니다.😊

---

출처

- https://2ality.com/2013/10/typeof-null.html
- https://2ality.com/2012/02/nan-infinity.html
- https://tc39.es/ecma262/#sec-typeof-operator
