# MovieApp

MovieApp은 영화 정보를 탐색하고 관리할 수 있는 웹 애플리케이션입니다. 사용자는 다양한 영화의 상세 정보를 확인하고, 좋아하는 영화를 저장할 수 있습니다.

## 주요 기능

-   영화 목록 조회
-   영화 상세 정보 확인
-   좋아요 기능
-   다크 모드 지원
-   반응형 디자인

## 기술 스택

-   Next.js
-   React
-   TypeScript
-   Apollo Client
-   GraphQL
-   Tailwind CSS

## 설치 방법

1. 저장소를 클론합니다:

    ```
    git clone https://github.com/your-username/movie-app.git
    ```

2. 프로젝트 디렉토리로 이동합니다:

    ```
    cd movie-app
    ```

3. 의존성을 설치합니다:

    ```
    npm install
    ```

4. 환경 변수를 설정합니다:
   `.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다:
    ```
    NEXT_PUBLIC_GRAPHQL_URL=your_graphql_endpoint
    ```

## 실행 방법

개발 모드로 실행:

```
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 사용법

1. 홈페이지에서 영화 목록을 확인합니다.
2. 영화 카드를 클릭하여 상세 정보를 확인합니다.
3. 영화 상세 페이지에서 좋아요 버튼을 클릭하여 영화를 저장합니다.
4. 상단의 토글 버튼을 사용하여 다크 모드를 켜고 끌 수 있습니다.

## 구조

```
next14-graphql
├─ app
│  ├─ api
│  │  └─ graphql
│  │     └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ movie
│  │  └─ [id]
│  │     └─ page.tsx
│  └─ page.tsx
├─ components
│  ├─ BackButton.tsx
│  ├─ DarkModeToggle.tsx
│  └─ MovieList.tsx
├─ context
│  ├─ ApolloProviderWrapper.tsx
│  └─ ThemeContext.tsx
├─ lib
│  ├─ apolloClient.ts
│  └─ type.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```
