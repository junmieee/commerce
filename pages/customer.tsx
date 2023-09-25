import React from 'react'

const customer = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col space-y-4">
        <div>고객센터</div>
        <div className="flex">
          <p>0000-0000 </p>
          <p>월 ~ 토일 오전 7시 - 오후 6시</p>
        </div>
        <div className="flex">
          <div className="border-2 flex justify-center items-center px-2 mr-2 rounded-md">
            <p>카카오톡 문의</p>
          </div>
          <div className="flex flex-col ">
            <p>월-토일 | 오전 7시 - 오후 6시</p>
            <p>일/공휴일 | 오전 7시 - 오후 1시</p>
          </div>
        </div>
        <div className="flex">
          <div className="border-2 flex justify-center items-center px-2 mr-2 rounded-md">
            <p>1:1 문의</p>
          </div>
          <div className="flex flex-col">
            <p>365일</p>
            <p>고객센터 운영시간에 순차적으로 답변드리겠습니다.</p>
          </div>
        </div>
      </div>
      <div>
        <p>법인명 (상호): Next 커머스 | 사업자등록번호 : 000-00-00000</p>
        <p>주소 : 서울특별시 동동구 동동로</p>
        <p>팩스 : 000 - 0000 - 0000 </p>
      </div>
    </div>
  )
}

export default customer
