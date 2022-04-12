---
title: 'WebdriverIO 설치하기'
description: 'Typescript 기반의 WebdriverIO를 설치하는 법에 대해 설명하는 글입니다.'
createdAt: '2022-02-20'
updatedAt: '2022-03-04'
coverImagePath: null
coverImageUrl: null
coverBackgroundColor: null
category: { main: 'Test Automation', sub: 'WebdriverIO' }
tags: ['webdriverio', 'wdio', 'e2e', 'automation', 'test', '자동화', '테스트']
series: { name: 'WebdriverIO', number: 2 }
published: true
---

> :warning: 경고  
> 이 포스트는 WebdriverIO 의 최신 버전 (>=7.x)에 대한 설치 가이드입니다.  
> 이 전 버전을 원하시는 경우 [이 전 버전의 WebdriverIO 웹사이트](https://webdriver.io/versions)를 참조해 주세요.

## WebdrverIO 시스템 요구사항

우선 [Node.JS](https://nodejs.org/ko)가 설치되어 있어야 합니다.  
WebdriverIO는 Node.JS의 LTS 버전을 지원하며 LTS 릴리즈 목록은 [여기](https://nodejs.org/ko/about/releases)에서 확인 가능합니다.  
(현재 Node.JS의 최소 LTS 버전은 v12입니다.)

> Node.JS v16부터 동기 모드를 지원하지 않는 관계로 v16 이상의 Node.JS LTS 버전을 추천드립니다.  
> 자세한 내용은 [여기](https://webdriver.io/docs/sync-vs-async)에서 확인 가능합니다.

## 필자의 개발 환경

저는 Intel Chipset의 Mac 환경에서 현재 최신 LTS 버전인 v17.5.0 버전을 사용하겠습니다.  
제 개발 환경에 대한 자세한 스펙은 아래와 같습니다.

- OS: macOS Big Sur ver. 11.4
- Chipset: Intel Core i7
- Node.JS: v17.5.0 LTS

Node.JS 설치에 대해서는 아래 포스트에서 다루었으니 해당 포스트에서 확인하시면 됩니다.

- [Mac환경에서 NVM으로 Node 설치하기](https://blog.moroo.dev/posts/nvm-installation-with-mac)

## Node.JS 버전 확인하기

설치에 앞서 현재 설치된 Node.JS의 버전을 확인합니다.  
터미널에서 `node --verion` 명령어 입력 시 현재 설치된 노드의 버전이 출력됩니다.

```bash
node --verion
v17.5.0
```

버전이 v16이상인 노드가 정상적으로 설치되어 있다면 이제 본격적으로 WebdriverIO를 설치하도록 하겠습니다.

## WebdriverIO 설치하기

WebdriverIO의 설치 명령어는 `npm init wdio 폴더명` 입니다.  
저는 webdriverio라는 폴더를 생성하고 해당 폴더에 WebdriverIO를 설치하겠습니다.

```bash
mkdir webdriverio
cd webdriverio
npm init wdio .
```

터미널에서 위와 같이 입력을 하면 `create-wdio` 패키지를 설치할 것이냐고 묻는데 `y`를 눌러주시면 됩니다.

```bash
Need to install the following packages:
  create-wdio
Ok to proceed? (y) y
```

:information*source: \_create-wdio 패키지는 WebdriverIO 설치를 도와주는 스타터 패키지입니다.*

create-wdio가 설치되고 create-wdio가 WebdriverIO의 CLI 패키지인 @wdio/cli를 설치합니다.  
@wdio/cli 설치가 완료되면 WebdriverIO 설정에 필요한 기본적인 요구사항에 대해 질문합니다.

전체 질문과 보기는 아래와 같습니다.

```bash
? Where is your automation backend located? # 설치 위치
❯ On my local machine # 로컬에 설치
  In the cloud using Experitest # Experitest 클라우드 환경에 설치
  In the cloud using Sauce Labs # Sauce Labs 클라우드 환경에 설치
  In the cloud using Browserstack or Testingbot or LambdaTest or a different service # Browserstack, Testingbot, LambdaTest, 기타 서비스 클라우드 환경에 설치
  I have my own Selenium cloud # 자체 셀레니움 서버 환경에 설치

? Which framework do you want to use? (Use arrow keys) # 사용할 테스트 프레임워크 종류
❯ mocha # Mocha 사용
  jasmine # Jasmine 사용
  cucumber # Cucumber 사용

? Do you want to use a compiler? (Use arrow keys) # 사용할 컴파일러 종류
  Babel (https://babeljs.io/) # Babel 사용
❯ TypeScript (https://www.typescriptlang.org/) # Typescript 사용
  No! # 사용하지 않음

? Where are your test specs located? # Specs 파일 위치 지정
(./test/specs/**/*.ts) # 기본값

? Do you want WebdriverIO to autogenerate some test files? # 기본 테스트 파일 생성 여부
(Y/n)

? Do you want to use page objects (https://martinfowler.com/bliki/PageObject.html)? # 페이지 오브젝트 패턴 사용 여부 (관련 파일 설치 여부)
(Y/n)

? Where are your page objects located? # 페이지 오브젝트 패턴 관련 파일 위치 지정
(./test/pageobjects/**/*.ts) # 기본값

? Which reporter do you want to use? (Press <space> to select, <a> to toggle all, <i> to invert selection) # 설치할 리포터 선택
❯◉ spec
 ◯ dot
 ◯ junit
 ◯ allure
 ◯ sumologic
 ◯ concise
 ◯ reportportal
 ◯ video
 ◯ json
 ◯ cucumber
 ◯ mochawesome
 ◯ timeline
 ◯ html
 ◯ markdown
 ◯ delta
 ◯ tesults
(Move up and down to reveal more choices)

? Do you want to add a plugin to your test setup? (Press <space> to select, <a> to toggle all, <i> to invert selection) # 플러그인 설치 여부
❯◉ wait-for # WDIO Wait For 기능 사용
 ◯ angular-component-harnesses # Angular Harnesses 기능 사용

? Do you want to add a service to your test setup? # 설치할 서비스 선택
 ◯ chromedriver
 ◯ sauce
 ◯ testingbot
 ◯ selenium-standalone
❯◉ devtools
 ◯ browserstack
 ◯ appium
 ◯ firefox-profile
 ◯ crossbrowsertesting
 ◯ eslinter-service
 ◯ lambdatest
 ◯ zafira-listener
 ◯ reportportal
 ◯ docker
 ◯ wdio-ui5
 ◯ wiremock
 ◯ ng-apimock
 ◯ slack
 ◯ intercept
 ◯ docker
 ◯ image-comparison
 ◯ novus-visual-regression
 ◯ rerun
 ◯ winappdriver
 ◯ ywinappdriver
 ◯ performancetotal
 ◯ cleanuptotal
 ◯ aws-device-farm
 ◯ ocr-native-apps
 ◯ ms-teams
(Move up and down to reveal more choices)

? What is the base url? # Base URL 설정
(http://localhost) # 기본값

? Do you want me to run `npm install` # 관련 패키지 설치 여부
(Y/n)

```

Typescript, Mocha, Devtools를 사용할것이므로 아래와 같이 설정합니다.

```bash
? Where is your automation backend located?
On my local machine # 로컬에서 실행하므로 선택해 줍니다.
? Which framework do you want to use?
mocha # Mocha를 사용하므로 선택해 줍니다.
? Do you want to use a compiler?
TypeScript (https://www.typescriptlang.org/) # 타입스크립트를 사용하므로 선택해 줍니다.
? Where are your test specs located?
./test/specs/**/*.ts # 기본값을 선택해 줍니다.
? Do you want WebdriverIO to autogenerate some test files?
Yes # 기본 설정을 확인해야 하므로 Yes를 선택해 줍니다.
? Do you want to use page objects (https://martinfowler.com/bliki/PageObject.html)?
Yes # 이것도 마참가지로 기본 설정을 확인해야 하므로 Yes를 선택해 줍니다.
? Where are your page objects located?
./test/pageobjects/**/*.ts # 기본값을 선택해 줍니다.
? Which reporter do you want to use?
spec # 일단 Spec 하나만 선택합니다. 나중에 추가할 예정입니다.
? Do you want to add a plugin to your test setup?
wait-for # 기본적인 Waitr ~ For 기능을 확인할 것이므로 선택해 줍니다.
? Do you want to add a service to your test setup?
devtools # 일단 Devtools 하나만 선택합니다. 나중에 추가할 예정입니다.
? What is the base url? # 로컬에서 실행하므로 기본값을 선택해 줍니다.
http://localhost
? Do you want me to run `npm install` # 따로 설치할 필요가 없으므로 Yes를 선택해 줍니다.
Yes
```

여기까지 문제가 없었다면 설치는 완료된 것입니다.  
하지만, 타입스크립트를 사용할 것이므로 추가 설정이 필요합니다.

## Typesctript 설정

### tsconfig.json 작성

설치가 완료되면 `./test` 폴더에 `tsconfig.json` 파일이 있는데 루트 폴더로 이동해 줍니다.  
그리고 아래와 같이 `types` 항목에 `@wdio/devtools-service`를 추가해 줍니다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "node",
      "webdriverio/async",
      "@wdio/mocha-framework",
      "@wdio/devtools-service", // 여기에 추가해 줍니다.
      "expect-webdriverio"
    ],
    "target": "ES5",
    "baseUrl": ".",
    "paths": {
      "@test/*": ["test/*"],
      "@types/*": ["types/*"]
    },
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["./types/*.d.ts", "./test/**/*.ts"],
  "exclude": ["./node_modules"]
}
```

### Types 설정

Custom Commands 및 Custom Matchers 등 확장이 필요하므로 타입 확장을 할 수 있게 루트 폴더에 types 폴더를 생성하고 wdio.d.ts 파일을 생성합니다. ( ./types/wdio.d.ts )  
그리고 wdio.d.ts 파일에 아래와 같이 작성합니다.

```typescript
// wdio.d.ts
declare global {
  namespace WebdriverIO {
    interface Browser {
      // browserCustomCommand: (arg: any) => Promise<void>
    }
    interface MultiRemoteBrowser {
      // browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
      // elementCustomCommand: (arg: any) => Promise<number>
    }
  }
}
```

### wdio.conf.ts 설정 변경

wdio 설치 시 typescript로 선택하면 wdio.conf.ts 파일의 `autoCompileOpts` 값이 자동으로 입력되는데 우리는 tsconfig.json 파일을 루트 폴더로 이동하였으므로 `autoCompileOpts`의 tsconfig.json 위치도 변경해 줘야 합니다.

아래와 같이 작성합니다.

```typescript
// wdio.conf.ts
export const config: WebdriverIO.Config = {
  ...
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    //tsConfigPathsOpts: {
    //    baseUrl: './'
    //}
  },
  ...
}
```

## ESLint & Prettier 설정

터미널에서 아래 명령어를 실행합니다.

```bash
npm install --save-dev eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
```

루트 폴더에 `.eslintrc.json` 파일을 생성하고 본인의 설정에 맞게 Eslint를 작성해 줍니다.  
저는 아래와 같이 작성하였습니다.

```json
{
  "root": true,
  "env": {
    "node": true,
    "es2021": true,
    "commonjs": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "ignorePatterns": ["node_modules"],
  "rules": {
    "@typescript-eslint/no-empty-interface": "off"
  }
}
```

루트 폴더에 `.prettierrc.json` 파일을 생성하고 본인의 설정에 맞게 Prettier을 작성해 줍니다.  
제 설정은 아래와 같습니다.

```json
{
  "printWidth": 80,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

여기까지 진행하셨으면 기본 설정은 끝났습니다.  
`Typescript`, `ESLint`, `Prettier`에 대한 자세한 설명은 여기서 다루기에는 양이 방대하며 포스트 내용에서도 벗어나므로 추후 기회가 되면 따로 포스트하도록 하겠습니다.

다시 본론으로 돌아와 이제 실제 구동이 되는지 확인해 보도록 하겠습니다.

## WebdriverIO 실행 확인

터미널에서 아래 명령어를 입력하고 실행합니다.

```bash
npx wdio run ./test/wdio.conf.ts
```

WebdriverIO 설치 시 기본 예재를 추가했으므로, 예재 테스트가 실행이 되면서 로그들이 출력되고 최종적으로 아래와 같이 테스트 결과가 출력됩니다.

```bash
 "spec" Reporter:
------------------------------------------------------------------
[Chrome 98.0.4758.109 darwin #0-0] Running: Chrome (v98.0.4758.109) on darwin
[Chrome 98.0.4758.109 darwin #0-0] Session ID: dfd4fbae-55d3-494e-ba7b-c2e4c83d9d0b
[Chrome 98.0.4758.109 darwin #0-0]
[Chrome 98.0.4758.109 darwin #0-0] » /test/specs/example.e2e.ts
[Chrome 98.0.4758.109 darwin #0-0] My Login application
[Chrome 98.0.4758.109 darwin #0-0]    ✓ should login with valid credentials
[Chrome 98.0.4758.109 darwin #0-0]
[Chrome 98.0.4758.109 darwin #0-0] 1 passing (3.5s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:07
```

여기까지 문제가 없었다면 WebdriverIO 설치는 끝났다고 보시면 됩니다.  
지금까지 작성한 코드는 [깃허브](https://github.com/morooLee/webdriverio/tree/a37c7b8848e0644ea23927ece47acff0ae91ec36)에서 확인 가능합니다.

이제 다음으로 `WebdriverIO Config` 설정에 대해 배워봅시다.

## 참고한 사이트

> _WebdriverIO_
>
> - Getting Started: https://webdriver.io/docs/gettingstarted
> - TypeScript Setup: https://webdriver.io/docs/typescript
> - WDIO CLI Options: https://webdriver.io/docs/clioptions
