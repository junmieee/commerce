import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React, { Dispatch, SetStateAction } from 'react'
import { EditorProps, EditorState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Button = styled.button`
  padding: 16px;
  border-radius: 8px;
  background-color: black;
  color: rgb(255, 255, 255);
`

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  }
)

// interface CustomEditorProps {
//   editorState: EditorState
//   readOnly?: boolean
//   onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
//   onSave?: () => void
// }

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  noPadding = false,
  onSave,
}: {
  editorState: EditorState
  readOnly?: boolean
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
  noPadding?: boolean
  onSave?: () => void
}) {
  return (
    <Wrapper readOnly={readOnly} noPadding={noPadding}>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'], // 원하는 옵션 선택
        }}
        localization={{
          locale: 'ko',
        }}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  ${(props) => (props.noPadding ? '' : 'padding: 16px;')};
  ${(props) =>
    props.readOnly ? '' : 'border: 1px solid black; border-radius: 8px;'}
`
