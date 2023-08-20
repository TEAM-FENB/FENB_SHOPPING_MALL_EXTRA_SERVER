- [FENB_SHOPPING_MALL_EXTRA_SERVER](#fenb_shopping_mall_extra_server)
  - [API 문서](#api-문서)
  - [기술 스택과 선정이유](#기술-스택과-선정이유)
    - [기술 스택](#기술-스택)
    - [선정 이유](#선정-이유)
  - [기능](#기능)
    - [1. 로그인](#1-로그인)
      - [접근방법](#접근방법)
      - [아쉬운점](#아쉬운점)
    - [2. 데이터베이스](#2-데이터베이스)
      - [접근방법](#접근방법-1)
      - [아쉬운점](#아쉬운점-1)
    - [3. 테스트](#3-테스트)
      - [아쉬운점](#아쉬운점-2)
    - [4. AWS](#4-aws)
      - [접근방법](#접근방법-2)
      - [아쉬운점](#아쉬운점-3)

# FENB_SHOPPING_MALL_EXTRA_SERVER

486 신발 쇼핑몰 서버

<br />

## API 문서

[POSTMAN API Document](https://documenter.getpostman.com/view/19882664/2s9Xy6q9fm)

<br />

## 기술 스택과 선정이유

### 기술 스택

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![PM2](https://img.shields.io/badge/pm2-black?style=for-the-badge)

### 선정 이유

- 프론트엔드 개발자가 서버 구현한 이유
  - 로컬환경에서만의 완성이 아닌, 실제 주소로 접속할 수 있는 프로젝트를 만들어 프로젝트의 퀄리티를 향상시키고 싶었음
- 몽고DB를 선택한 이유
  - 목업 서버를 구축할 때, 처음 데이터 구조를 설계한대로 진행되지 않았음
  - 실제 데이터베이스와 연결할 때 데이터 구조가 또다시 변경될 것으로 판단되어 스키마에 영향을 받지 않는 몽고DB를 선택
- AWS를 선택한 이유
  - netlify나 vercel로 클라이언트를 배포했지만, 서버와 클라이언트를 클라우드로 배포해보고 싶었음
  - 여러 분야에 대해 약간의 지식이 협업하는데 큰 도움이 될것이라고 생각
- JWT를 선택한 이유
  - 쿠키로 토큰을 전달하나 보안 강화를 위해 암호화할 수 있는 JWT를 사용

<br />

## 기능

### 1. 로그인

#### 접근방법

- 토큰 관리
  - 세션으로 관리시 서버 과부하로 서버 비용 증가 우려
  - 쿠키로 관리하여 서버 비용 절약
- 보안
  - HTTPS 통신, JWT 암호화로 보안 강화
  - 서버에서 JWT Token 생성 후, 클라이언트에 전달

#### 아쉬운점

- 서버 부하로 인한 비용 걱정없이 세션 방식으로 토큰을 관리하고 싶다.

---

### 2. 데이터베이스

#### 접근방법

- 몽고DB와 몽구스 API를 활용하여 CRUD 구현

#### 아쉬운점

- 몽고DB API와 몽구스 API를 혼용하다 보니 가독성이 좋지 않았다.
  - 가독성 향상을 위해 몽구스 API만을 사용해봐야겠다.
- 실무에서는 SQL을 사용하는 경우가 많아 몽고DB를 잘 쓰이지 않아 MySQL을 활용하여 데이터베이스를 구축해보고 싶다.

---

### 3. 테스트

#### 아쉬운점

- 기능 구현에 급급했기 때문에 처음에는 생각하지 못했다.
- 여러 기능이 추가되고 수정하는 과정에서 제대로 동작이 되는지 확인하는 과정이 너무 시간을 많이 소비되었다.
  - 이때 자동화로 테스트를 할 수 있는 방법이 있다는 것을 알게되었다.
- 또한, 자바스크립트이다보니 일일이 타입을 확인하여 에러를 잡는 일도 시간이 많이 소모 되었다.
- Jest와 Typescript를 사용하여 자동화 테스트를 해봐야겠다.

---

### 4. AWS

#### 접근방법

- 배포
  - 정적인 클라이언트는 S3 배포
  - 지속적인 서버 실행을 위해 EC2 배포
  - 도메인 구입하여 실제로 서비스 배포
- 부하 방지
  - 서버 부하를 줄이기 위해 CloudFront 사용
- 보안
  - 서버에 HTTPS 통신을 위해 LoadBalancers 사용

#### 아쉬운점

- 블로그 글을 보면서 속성으로 배우고 적용하다보니 제대로 배우지 못해 아쉽다.
- AWS 인터넷 강의를 통해 공부해봐야겠다.

---
