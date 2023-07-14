import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useSession, signIn } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const AllLogin = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data: session, status } = useSession()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 같은 아이디와 비밀번호가 있는지 확인
    // const isValid = await checkCredentials(email, password)
    // if (isValid) {
    // 로그인 처리
    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })

    //   if (!result.error) {
    //     // 로그인 성공
    //     router.push('/')
    //   } else {
    //     // 로그인 실패
    //     setErrorMessage('로그인에 실패했습니다.')
    //   }
    // } else {
    //   // 알림 표시
    //   setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.')
    // }
    if (!result.error) {
      console.log('success', result)
      router.replace('/')
    } else {
      console.log('failed')
    }
  }

  // const checkCredentials = async (email: string, password: string) => {
  //   // if (email === session?.user?.email && password === session?.user?.password) {
  //   // 데이터베이스와 비교하여 유효성을 확인하는 로직
  //   // 일단은 간단하게 "admin" 아이디와 "password" 비밀번호를 확인
  //   const result = await signIn('credentials', {
  //     email: email,
  //     password: password,
  //     redirect: false,
  //   })
  //   // if (email === 'admin' && password === 'password') {
  //   //   return true
  //   // } else {
  //   //   return false
  //   // }

  // }

  if (status === 'authenticated') {
    router.replace('/')
    return (
      <div>
        <h1>Log in</h1>
        <div>You are already logged in.</div>
        <div>Now redirect to main page.</div>
      </div>
    )
  }
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
        {errorMessage && <Alert>{errorMessage}</Alert>}
      </Form>
    </Wrapper>
  )
}

export default AllLogin

const Wrapper = styled.div`
  margin-top: 16px;
  padding: 0 4px;
`

const Title = styled.h3`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #4b5563;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
`

const SubmitButton = styled.button`
  background-color: #f97316;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: medium;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #ff7c1f;
  }
`

const Alert = styled.div`
  margin-top: 8px;
  color: red;
  font-size: 12px;
`
