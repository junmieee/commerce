export const KAKAO_REST_API_KEY = process.env.KAKAO_CLIENT_ID

export const KAKAO_REDIRECT_URI = 'http://localhost:3000/auth/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

export const KAKAO_CLIENT_ID = '74bc77e0d907bd990b56b0159569d644'

export const KAKAO_CLIENT_SECRET = '4JGxwdwPwmLwra09AMjR89WZJ9sgktL9'

export const KAKAO_JS_KEY = 'b0b6c17400c81040cf0e3964beac9e5e'
