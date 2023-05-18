import styled from '@emotion/styled'
import { IconStar } from '@tabler/icons-react'
import { CommentItemType } from 'pages/products/[id]'
import { format } from 'date-fns'
import React from 'react'
import CustomEditor from './Editor'
import { EditorState } from 'draft-js'
import { convertFromRaw } from 'draft-js'
import dynamic from 'next/dynamic'

export default function CommentItem({ item }: { item: CommentItemType }) {
  const parsedContent = item.contents ? JSON.parse(item.contents) : null
  const textContent = parsedContent ? parsedContent.blocks[0].text : ''
  return (
    <Wrapper>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <IconStar
                  key={idx}
                  fill={idx < item.rate ? 'red' : 'none'}
                  stroke={idx < item.rate ? 0 : 1}
                />
              ))}
            </div>
            <span className="text-zinc-300 text-xs">
              {item.price.toLocaleString('ko-kr')} 원 + {item.quantity} 개 ={' '}
              {item.amount.toLocaleString('ko-kr')} 원
            </span>
          </div>
          <p className="text-zinc-500 ml-auto">
            {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
          </p>
        </div>
        <CustomEditor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(item.contents ?? ''))
          )}
          readOnly
          noPadding
        />
        {/* <div>{textContent}</div> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
`
