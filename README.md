## 📖 프로젝트 소개
* 스튜디오메이트 FE 포켓몬 도감 과제입니다.
## ⚙️ 개발 환경
개발 환경은 아래와 같습니다.
* React.JS
* TypeScript
* Zustand
* Styled-component
* react-router-dom
* axios
* react-intersection-observer
## 🖥️ 로컬 실행 방법 
1. `package.json`에 설치된 라이브러리를 다운받기 위해서 아래의 명령어를 실행해 주세요.
    ```
    npm i
    ```
2. 웹 서버를 실행 해주세요.
    ```
    npm start
    ```
## 기술 스택 선택 이유
1. TypeScript
* 선언 및 컴파일 단계에서 오류를 캐치할 수 있습니다.
* 함수명으로만 의도를 캐치하기 어려운 경우, 추가적인 정보로 협업하는 과정에서 용이합니다.
2.  Zustand
*  프로바이더로 감싸지 않아도 되기때문에  렌더링 트리를 단순화시킬 수 있습니다.
* 학습의 러닝커브가 낮고, 간결합니다.
3. Styled-Component
* 컴포넌트 단위로 스타일을 지정할 수 있습니다.
* 컴포넌트의 props를 참조하여 원하는 스타일을 구현하기 용이합니다.
* 유니크한 클래스를 자동으로 생성하기 때문에 코드 경량화의 장점이 있습니다.
## 폴더구조
```
src
├─api
├─components
│  └─common
├─constant
├─hook
├─page
│  ├─main
│  │  └─components
│  ├─pokemonDetail
│  │  └─components
│  └─pokemonList
│      └─components
├─store
├─styles
├─types
└─util
```
