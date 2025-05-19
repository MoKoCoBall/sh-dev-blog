---
title: "[HTML 이해하기 - 1] HTML 태그 파싱하기"
date: "2025-05-11"
emoji: "🔍"
tags: ["html"]
preview: "HTML에 대해 이해하고 HTML 태그를 파싱해보며 돔 트리 생성 과정을 이해하기"
---

# HTML이 언어라고?

개발을 막 시작한 사람들은 이런 대화 한 번쯤 들어 봤을거에요.

> 🙋‍♀️: 너 무슨 언어 할 줄 알아?  
> 🧑‍💻: 나? **HTML** 잘 해!  
> 🙄: ...? 그건 언어가 아니잖아!

HTML은 이름부터 Language가 들어가는데 **언어가 아니라고?**

그럼 도대체 HTML은 뭐고, 왜 언어라고 하면 안 되는 걸까요?

## HTML은 언어가 아니다!

HTML은 **HyperText Markup Language**의 약자로써 **프로그래밍 언어**가 아닌 **마크업 언어**에요.

프로그래밍 언어가 되기 위해서는 기본적으로 갖춰야 하는 몇 가지 조건이 있어요. **반복문, 조건문, 변수**등이 해당한다고 할 수 있어요.

실제로 HTML은 위 기능들을 수행하지 못하고 단순히 **구조와 의미를 표현**하는 정도의 역할을 하는 마크업 언어에요.

그럼 HTML의 실체는 무엇일까요?

# HTML은 문자열이다

사실 HTML은 특별하지 않고 단순히 구조를 표현하는 **문자열**에 불과해요. 우리는 이 문자열을 가공해 구조를 만들고 그것을 웹페이지를 만드는 데에 사용하는 것 뿐이에요.

결국은 우리가 웹페이지를 위해 만든 이런 간단한 HTML 파일은

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

이렇게 단순한 문자열 하나로 처리되는 것이죠!

```javascript
const htmlExample = `<html><body><h1>Hello World</h1></body></html>`;
```

그럼 이 단순한 문자열이 어떻게 웹페이지가 되는 걸까요?

# HTML이 웹페이지가 되는 과정

HTML은 **파싱 Parsing**을 통해서 특정 의미를 가지는 부분으로 분리되고 데이터의 구조를 가져요.

지금 작성한 간단한 HTML이 어떻게 분리되고 구조가 변하는지 살펴보면서 공부해봐요!

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Parser</title>
  </head>
  <body>
    <h1 class="hello">
      <div>Hello World</div>
      <p>HTML</p>
    </h1>
  </body>
</html>
```

이 HTML은 이런 트리 구조를 가지게 돼요!

# 돔 트리(DOM Tree)

![DOMTREE](/images/0/img1.png)

이 트리는 돔 트리라는 이름을 가지고 있어요. **렌더링 엔진이 자동적으로** HTML태그를 **파싱**한 후에 이런 트리구조를 만들어줘요.

그렇지만, HTML 태그만을 이용해서 만든 돔 트리는 집으로 치면 뼈대에 불과해요. 물론 웹페이지를 만들 순 있지만 쓸만한 웹페이지는 될 수 없어요.

그렇기 때문에 스타일에 관한 트리와 그것을 합쳐준 트리가 추가로 필요해요. 이 작업은 **렌더링 엔진**이 해줘요!

# 렌더링 엔진(Rendering Engine)의 동작

![RENDERTREE](/images/0/img0.png)

## 그림에서 나온 3가지 트리

- **돔 트리(DOM Tree)**: HTML을 파싱해서 만든 **문서 구조 트리**예요. 화면에 어떤 요소가 있는지를 나타내요.
- **CSSOM**: CSS를 파싱해서 만든 **스타일 정보 객체**예요. 각 요소가 어떤 스타일을 갖는지를 담고 있어요.
- **렌더 트리(Render Tree)**: DOM과 CSSOM이 **합쳐져** 만들어진 트리예요. **실제로 브라우저가 화면에 그릴 요소와 스타일**만 포함돼요.

그리고 실제로 웹사이트가 렌더링 엔진은 **Layout**, **Painting**이라는 과정을 추가로 진행해요. 이번 글에선 다루지 않을 내용이라 빼 놨어요.

돔 트리와 CSSOM을 만들 때 기본적으로 우리는 **문자열**을 받기 때문에 이를 처리하는 알고리즘인 파싱이 반드시 필요해요!

> 참고로, 렌더 트리는 **문자열**이 아닌 **돔 트리와 CSSOM을 기반**으로 병합해서 만들어지는 트리에요!

그래서 파싱이 무엇이고 어떻게 하는 걸까요?

# 파싱(Parsing)

앞서 파싱을 통해서 **HTML을 돔 트리로 만든다** 라는 사실을 알았어요.

### 파싱은 일정한 규칙을 가진 문자열을 의미 있는 구조로 바꾸는 과정이에요.

우리가 현재 하는 HTML 파싱을 예로 들자면 **태그 등의 일정한 구조를 가진 HTML이라는 마크업 언어를 의미 있는 구조인 트리구조**로 바꾸는 것이죠.

# HTML 파싱 구현해보기

기본적인 과정은 살펴봤으니 이제 우리는 파싱을 통해서 HTML태그를 구현해 볼 거에요!

이번 HTML 파서는 **TypeScript**를 사용했고 **스택 Stack**이라는 자료구조를 이용해서 구현했어요.

우선 HTML의 구조가 어떻게 생겼는지 정의된 interface부터 보고 이야기를 시작할게요.

# HTML Interface

```javascript
interface HTMLNode {
  type: "element" | "text";
  tagName?: string;
  attributes?: Record<string, string>;
  children: HTMLNode[];
  content?: string;
}
```

우리가 이용할 **HTMLNode의 interface**는 위와 같이 생겼어요! 처음엔 어려울 수 있으니 각각의 요소에 대해서 간단하게 설명할게요.

- **type**: **텍스트인지 아닌지 구분**해요. element면 텍스트가 아니에요.
- **tagName**: 우리가 사용한 **HTML 태그의 이름**이에요.
- **attributes**: 태그 안에 들어가는 **속성의 이름**이에요 class, id, onclick등이 여기 속해요.
- **children**: **자식 노드의 배열**이에요. HTML 요소가 포함하는 하위 요소나 텍스트 요소를 포함해요. 조금 더 자세히 다룰게요.
- **content**: 텍스트 노드의 내용을 저장해요.

children 은 예시를 들자면 이런 내용이에요!

```html
<!-- div의 children은 <p>Children</p>과 <button>Click</button> 두 가지 요소임 -->
<div>
  <p>Children</p>
  <button>Click</button>
</div>
```

저런 식으로 하위 태그가 전부 들어가게 돼요.

그럼 본격적으로 파싱 구현부를 살펴볼게요. 구현의 순서는 다음과 같아요.

> 1. 여는 태그(&lt;) 확인하기
> 2. &lt;div&gt;인지 &lt;/div&gt;인지 확인하기
> 3. &lt;/인 경우 태그의 끝이므로 pop
> 4. &lt;div&gt;인 경우 &lt;img/&gt;등이 아니라면 새로운 노드 push
> 5. 텍스트라면 텍스트 노드 생성

위를 이용해서 단계별로 구현해볼게요.

# Root Element 생성

```javascript
const rootNode: HTMLNode = {
  type: "element",
  tagName: "root",
  children: [],
};
```

우선 트리의 루트가 될 HTMLNode를 생성해요. **루트를 기반으로 해서 모든 트리 구조가 완성이 돼요**.

# 기본 변수 정의

```javascript
let currentPosition = 0;
const stack: HTMLNode[] = [rootNode]; // 스택을 활용하여 노드의 계층 구조를 관리
```

이제 스택이라는 자료구조를 이용해요. 정말 간단하게만 설명하자면 &lt;&gt; 등의 구조가 대칭적으로 있는 경우에 자주 사용하고 **가장 나중에 들어온 요소가 가장 먼저 나가는** 자료구조에요.

스택의 간단한 연산이 뭔지 궁금하다면 [스택 연산](https://www.acmicpc.net/problem/10828) 알고리즘 문제지만 연산이 잘 정리되어 있으니 참고하시면 좋아요.

그리고 currentPosition의 역할은 문자열인 HTML에서 **어느 위치에 있는지**를 알려주는 역할을 해요.

# 여는 태그 확인

```javascript
function parse(htmlString: string): HTMLNode {
  // Root Element 생성
  // 기본 변수 정의

  // 여는 태그 확인하기
  while (currentPosition < htmlString.length) {
    if (htmlString[currentPosition] === "<") {
      // 나머지 코드
    }
  }
}
```

&lt;를 만나는 경우 **태그의 시작**이기 때문에 알고리즘이 시작돼요.

# 닫는 태그인 경우

```javascript
if (htmlString[currentPosition + 1] === "/") {
  const endTagStart = currentPosition;
  currentPosition = htmlString.indexOf(">", currentPosition) + 1;

  // 루트 노드를 제외한 나머지 요소 pop
  if (stack.length > 1) {
    stack.pop();
  }
}
```

예를 들면 &lt;/div&gt; 인 경우 닫는 태그이기 때문에 &lt; / 를 순서로 만나면 나머지 요소들을 **루트 노드를 제외하고 제거**해줘요.

# 여는 태그인 경우 (자식 노드를 확인해야 하는 경우)

```javascript
else {
        const tagStart = currentPosition;

        let tagEnd = htmlString.indexOf(">", currentPosition);
        // 잘못된 입력 처리
        if (tagEnd === -1) {
          tagEnd = htmlString.length;
        }

        const tagContent = htmlString.substring(tagStart + 1, tagEnd);
        const spaceIndex = tagContent.indexOf(" ");

        const tagName =
          spaceIndex !== -1 ? tagContent.substring(0, spaceIndex) : tagContent;

        // 자체 닫는 태그인지 확인 <img /> 등
        const selfClosing = tagContent.endsWith("/");

        const newNode: HTMLNode = {
          type: "element",
          tagName: tagName.toLowerCase(),
          attributes: {},
          children: [],
        };

        // 속성 추출
        if (spaceIndex !== -1) {
          const attrString = tagContent.substring(spaceIndex + 1);
          const attrMatches = attrString.match(/(\w+)\s*=\s*"([^"]*)"/g);

          if (attrMatches) {
            attrMatches.forEach((attr) => {
              const [name, value] = attr.split("=").map((s) => s.trim());
              if (newNode.attributes) {
                newNode.attributes[name] = value.replace(/"/g, "");
              }
            });
          }
        }

        stack[stack.length - 1].children.push(newNode);

        if (!selfClosing) {
          stack.push(newNode);
        }

        currentPosition = tagEnd + 1;
      }
```

이 코드에서 가장 어려운 부분이에요.

간단하게 논리만 말하자면 다음과 같이 정리할 수 있어요.

> 1. &lt;와 &gt;사이의 문자들을 tagContent에 저장해요.
> 2. indexOf를 이용해 태그를 추출해요.
> 3. 단일 태그인지 확인해요. 예를 들면 &lt;img/&gt;가 있어요.
> 4. 정규 표현식을 이용해 attribute를 추출해요.
> 5. 새로운 노드를 children에 추가해줘요. 단일 태그라면 넣지 않아요. (단일 태그는 자식을 가질 수 없기 때문)

정규 표현식을 자세히 다루지는 않을 예정이지만 이것도 간단하게만 말하자면 **문자열에서 특정한 패턴을 찾아내거나, 추출하거나, 대체하는 경우에 사용하는 식**이라고 보면 돼요.

**문법이 정해져 있기 때문에 숙지를 반드시 해야 사용 가능해요.** 영어로 되어있긴 하지만 정규 표현식에 대한 설명은 여기서 찾아보면 돼요. [정규 표현식](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet)

# 텍스트 노드 처리

```javascript
else {
      const textStart = currentPosition;
      let textEnd = htmlString.indexOf("<", currentPosition);
      if (textEnd === -1) {
        textEnd = htmlString.length;
      }

      const text = htmlString.substring(textStart, textEnd).trim();

      if (text) {
        const textNode: HTMLNode = {
          type: "text",
          content: text,
          children: [],
        };

        stack[stack.length - 1].children.push(textNode);
      }

      currentPosition = textEnd;
    }
```

마지막으로 텍스트 노드에 대한 처리를 해요.

마찬가지로 잘못된 입력에 대해 처리하고 텍스트가 맞다면 type이 text인 텍스트 노드를 만들어줘요.

**텍스트도 단일 태그와 마찬가지로 자식을 가질 수 없기 때문**에 빈 배열을 값으로 해요.

### 이 과정을 마무리하면 HTML태그 파싱이 모두 끝나요!

간단하게 전체 코드를 살펴보자면 다음과 같이 볼 수 있어요.

# 전체 코드

```javascript
function parse(htmlString: string): HTMLNode {
  // 루트 노드 생성
  const rootNode: HTMLNode = {
    type: "element",
    tagName: "root",
    children: [],
  };

  let currentPosition = 0;
  const stack: HTMLNode[] = [rootNode]; // 스택을 활용하여 노드의 계층 구조를 관리

  while (currentPosition < htmlString.length) {
    if (htmlString[currentPosition] === "<") {
      if (htmlString[currentPosition + 1] === "/") {
        const endTagStart = currentPosition;
        currentPosition = htmlString.indexOf(">", currentPosition) + 1;

        // 루트 노드를 제외한 나머지 요소 pop
        if (stack.length > 1) {
          stack.pop();
        }
      } else {
        const tagStart = currentPosition;

        let tagEnd = htmlString.indexOf(">", currentPosition);
        if (tagEnd === -1) {
          tagEnd = htmlString.length;
        }

        const tagContent = htmlString.substring(tagStart + 1, tagEnd);
        const spaceIndex = tagContent.indexOf(" ");

        const tagName =
          spaceIndex !== -1 ? tagContent.substring(0, spaceIndex) : tagContent;

        // 자체 닫는 태그인지 확인 <img /> 등
        const selfClosing = tagContent.endsWith("/");

        const newNode: HTMLNode = {
          type: "element",
          tagName: tagName.toLowerCase(),
          attributes: {},
          children: [],
        };

        // 속성 추출
        if (spaceIndex !== -1) {
          const attrString = tagContent.substring(spaceIndex + 1);
          const attrMatches = attrString.match(/(\w+)\s*=\s*"([^"]*)"/g);

          if (attrMatches) {
            attrMatches.forEach((attr) => {
              const [name, value] = attr.split("=").map((s) => s.trim());
              if (newNode.attributes) {
                newNode.attributes[name] = value.replace(/"/g, "");
              }
            });
          }
        }

        stack[stack.length - 1].children.push(newNode);

        if (!selfClosing) {
          stack.push(newNode);
        }

        currentPosition = tagEnd + 1;
      }
    } else {
      const textStart = currentPosition;
      let textEnd = htmlString.indexOf("<", currentPosition);
      if (textEnd === -1) {
        textEnd = htmlString.length;
      }

      const text = htmlString.substring(textStart, textEnd).trim();

      if (text) {
        const textNode: HTMLNode = {
          type: "text",
          content: text,
          children: [],
        };

        stack[stack.length - 1].children.push(textNode);
      }

      currentPosition = textEnd;
    }
  }

  return rootNode;
}
```

이를 통해서 간단한 예제의 출력이 어떻게 되는지도 한번 확인해볼게요!

# 예시 코드

```javascript
// Parsing Example
import parse, { HTMLNode } from "./parse.js";

const htmlString = `
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <div class="hello">Hello</div>
    <div class="world">World</div>
    <div class="button">
      <button>Click me</button>
      <p><img src="*" alt="image" />Image</p>
      <span id="span">Hello World</span>
    </div>
  </body>
</html>`;

const parsedResult: HTMLNode = parse(htmlString);

console.log(JSON.stringify(parsedResult, null, 2));
```

이런 간단한 HTML을 문자열로 받고 만든 파서를 이용해서 출력을 살펴보면

# 예시 출력

```text
// Output
{
  "type": "element",
  "tagName": "root",
  "children": [
    {
      "type": "element",
      "tagName": "html",
      "attributes": {},
      "children": [
        {
          "type": "element",
          "tagName": "head",
          "attributes": {},
          "children": [
            {
              "type": "element",
              "tagName": "title",
              "attributes": {},
              "children": [
                {
                  "type": "text",
                  "content": "Hello",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tagName": "body",
          "attributes": {},
          "children": [
            {
              "type": "element",
              "tagName": "div",
              "attributes": {
                "class": "hello"
              },
              "children": [
                {
                  "type": "text",
                  "content": "Hello",
                  "children": []
                }
              ]
            },
            {
              "type": "element",
              "tagName": "div",
              "attributes": {
                "class": "world"
              },
              "children": [
                {
                  "type": "text",
                  "content": "World",
                  "children": []
                }
              ]
            },
            {
              "type": "element",
              "tagName": "div",
              "attributes": {
                "class": "button"
              },
              "children": [
                {
                  "type": "element",
                  "tagName": "button",
                  "attributes": {},
                  "children": [
                    {
                      "type": "text",
                      "content": "Click me",
                      "children": []
                    }
                  ]
                },
                {
                  "type": "element",
                  "tagName": "p",
                  "attributes": {},
                  "children": [
                    {
                      "type": "element",
                      "tagName": "img",
                      "attributes": {
                        "src": "*",
                        "alt": "image"
                      },
                      "children": []
                    },
                    {
                      "type": "text",
                      "content": "Image",
                      "children": []
                    }
                  ]
                },
                {
                  "type": "element",
                  "tagName": "span",
                  "attributes": {
                    "id": "span"
                  },
                  "children": [
                    {
                      "type": "text",
                      "content": "Hello World",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

이렇게 파싱을 구현해보면서 우리는 **HTML 파싱을 통해 돔 트리가 어떻게 생기는지에 대한 원리**를 이해 할 수 있었어요.

다음에는 CSS를 이용해서 만드는 트리인 **CSSOM**에 대해서도 파싱해보고 구조를 만들어보도록 할게요.

😊 틀린 부분이나 개선방향, 코드에 대한 궁금증 등은 댓글로 편하게 남겨주세요.

코드는 제 [깃허브](https://github.com/MoKoCoBall/html-css-parser)에서도 확인 할 수 있어요!
