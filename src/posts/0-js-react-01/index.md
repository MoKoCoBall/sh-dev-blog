---
title: "JavaScript 로 React 만들기 - 1"
date: "2025-05-08"
emoji: "🌳"
tags: ["react", "javascript"]
preview: "VDOM 과 DOM 에 대해 공부하고 간단하게 구현해보기"
---

# DOM 이 뭐야?

DOM(Document Object Model)은 HTML 문서를 트리 구조로 표현한 것입니다. 브라우저가 웹 페이지를 로드하면 DOM을 생성하고, 이를 통해 JavaScript로 요소를 추가, 변경, 삭제할 수 있습니다.

# VDOM은 무엇인가?

Virtual DOM(VDOM)은 실제 DOM의 가벼운 복사본입니다. React는 VDOM을 사용하여 성능을 최적화합니다. 변경사항이 있을 때 전체 DOM을 다시 그리는 대신, VDOM에서 변경된 부분만 실제 DOM에 적용합니다.

# 간단한 VDOM 구현하기

```javascript
// 가상 DOM 노드 생성
function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

const test () => {return test};

render(vApp, document.getElementById("root"));
```

이렇게 간단한 VDOM을 구현해보았습니다. 실제 React의 구현은 더 복잡하지만, 이를 통해 기본 개념을 이해할 수 있습니다.
