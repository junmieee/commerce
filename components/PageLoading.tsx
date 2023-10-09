import Image from 'next/image'
import { useMediaQuery } from 'usehooks-ts'

export default function PageLoading() {
  const mobileView: boolean = useMediaQuery('(max-width: 768px)')
  return (
    <>
      <div className="w-screen h-screen fixed">
        {mobileView ? (
          <div className="absolute top-10 right-10 p-4 rounded-md">
            <Image
              src="/images/Bean Eater-1s-200px.svg"
              alt="로딩 중"
              width={80}
              height={100}
            />
          </div>
        ) : (
          <div className="absolute bottom-10 right-10 p-4 rounded-md">
            <Image
              src="/images/Bean Eater-1s-200px.svg"
              alt="로딩 중"
              width={80}
              height={100}
            />
          </div>
        )}
      </div>
    </>
  )
}
