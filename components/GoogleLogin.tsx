import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 10px;
  height: 300px;
  width: 300px;
  justify-content: center;
  align-items: center;
`

const StyledGoogleButton = styled.button`
  display: flex;
  background-color: #fff;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
  p {
    font-family: 'Roboto', sans-serif;
  }
`

export function GoogleLogin() {
  const { data: session } = useSession()

  return (
    <Container>
      <p>회원가입/로그인</p>
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <StyledGoogleButton onClick={() => signIn()}>
            <img
              src="/images/google.svg"
              alt="Google Logo"
              style={{ marginRight: '10px', border: 'none' }}
            />
            <p>구글로 로그인하기</p>
          </StyledGoogleButton>
        </div>
      )}
    </Container>
  )
}
