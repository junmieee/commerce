# Commerce App 

## 프로젝트의 실행 방법

1. 저장소를 클론

git clone https://github.com/junmieee/commerce.git


2. 필요한 패키지를 설치

npm install

3. 개발 서버 실행
npm start



<br/>





<br/>

## 기술 스택

* 프론트엔드

<img src="https://img.shields.io/badge/Next.js-3178C6?style=for-the-badge&logo=nextjs&logoColor=white"><img src="https://img.shields.io/badge/Typecript-3178C6?style=for-the-badge&logo=nextjs&logoColor=white"><img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<br/>


* 백엔드 

<img src="https://img.shields.io/badge/Planet Scale-000000?style=for-the-badge&logo=planetscale&logoColor=white"><img src="https://img.shields.io/badge/ Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">




<br/>


## 구현 기능 

### 회원가입 / 로그인

![화면_기록_2023-08-13_오후_3_51_38_AdobeExpress](https://github.com/junmieee/commerce/assets/76501504/6c1c1c66-70cc-46a2-8a5e-c63ade785ad4)

<img width="1305" alt="스크린샷 2023-09-07 오후 3 40 09" src="https://github.com/junmieee/commerce/assets/76501504/d95d676e-8f0e-4b13-972d-83bdcbffa745">


- **`next-auth/react`** 라이브러리를 사용. 사용자가 Google OAuth를 통해 회원가입 및 로그인할 수 있음
- 로그인 여부에 따라 메뉴 상태 다르게 표시
- **`GoogleLogin`** 컴포넌트에서 **`useSession`** 훅을 통해 현재 세션 정보를 가져온 후, 세션이 있을 경우 로그인된 사용자의 이메일을 표시하고 "Sign out" 버튼으로 로그아웃 기능을 제공하며, 세션이 없을 경우 "구글로 로그인하기" 버튼을 클릭하면 **`signIn('google')`** 함수를 호출하여 구글 OAuth 로그인 프로세스를 시작하도록 했습니다.
- PlanetScale과 Prisma를 사용하여 회원 체계를 구현했습니다. Prisma를 통해 데이터베이스 모델을 정의하고 MySQL 데이터베이스를 관리하며, 사용자 정보, 인증 정보 및 세션 정보를 저장하였습니다.



### 상품 검색 

- 검색을 통해 원한는 상품을 찾을 수 있는 기능
- 사용자가 검색어를 입력하면 해당 검색어를**`useState`** 를 통해 **`keyward`** 상태로 관리
- 검색 시 **`handleSearch`** 함수를 호출하여 현재 페이지를 '/products'로 이동하면서 검색어를 쿼리 파라미터로 전달해 '/api/get-products' 엔드포인트에 검색어를 포함하여 상품 목록을 요청하고 받아옴
- 검색 결과를 **`products`** 상태에 저장하고 렌더링하여 화면에 상품 정보를 표시


### 찜하기

- 상품 상세 페이지에서 로그인한 사용자만 찜하기 기능을 활용할 수 있도록 제한
- 찜하기 버튼 클릭 시, 찜하기가 X면 찜하기 O로, 찜하기 O면 찜하기 X로 변경
- 찜하기 여부 조회: 사용자의 wishlist 목록을 Session을 통해 조회하여 찜하기 상태를 확인
- 찜하기 추가/삭제 처리: **`update-wishlist`**엔드포인트를 사용하여 찜하기 상태를 추가하거나 삭제
- **`Wishlist`** 테이블을 **`userId`**를 기반으로 만들고  여러 개의 **`productId`**를 담을 수 있는 구조로 설계



### 장바구니

- 장바구니 페이지에서 제품을 추가, 수정, 삭제할 수 있도록 UI를 구성
- **`userId`**, **`productId`**, **`quantity`**, **`amount`**. 정보가 들어있는 **`Cart`** 테이블을 생성해 장바구니 내역을 조회하면서 동시에 각 상품의 정보도 조회할 수 있도록 구성
- add-cart API 생성: 장바구니에 추가하는 기능을 위해 **`add-cart`** API를 생성
- 서버에서 장바구니 정보와 각 상품의 정보를 조회하기 위해 **`Cart`** 테이블과 **`products`** 테이블을 조인하여 데이터를 가져와  필요한 정보인 **`price`**, **`name`**, **`image_url`** 을 그려준다.


### 구매하기

- 상품 상세 페이지와 장바구니의 '구매하기' 버튼을 클릭하면 선택한 상품과 수량 정보가 주문 내역에 추가되고 주문 내역을 데이터베이스에 저장
- 결제처리 버튼을 클릭하면 ‘후기 작성’ 버튼이 보일 수 있게 처리
- 단일 상품을 주문할 수 있는 기능과 여러 상품을 묶어서 주문할 수 있는 기능
- 결제 기능은 따로 구현하지 않았습니다.


### 후기글 작성

- 후기 작성 및 편집: 텍스트 후기를 작성하고 수정할 수 있는 기능. **`react-draft-wysiwyg`** 라이브러리를 사용사용하여 사용자가 편집한 내용을 에디터 상태로 관리
- 별점 설정: 슬라이더를 사용하여 별점을 설정할 수 있는 기능. 사용자가 원하는 별점을 선택하면 'rate' 변수에 저장
- 이미지 업로드 및 삭제:  이미지 파일을 업로드, 삭제 기능. 이미지 호스팅 및 업로드 서비스 'imgbb'를 활용하여 이미지 URL을 받아와 화면에 표시하고 배열에 저장.

