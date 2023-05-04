import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React, { Dispatch, SetStateAction } from 'react'
import { EditorProps, EditorState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from './button'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

interface CustomEditorProps {
  editorState: EditorState
  readOnly?: boolean
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
  onSave?: () => void
}

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: CustomEditorProps) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="editorToolbar-hidden"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['initial', 'list', 'textAlign', 'link'],
        }}
        localization={{
          locale: 'ko',
        }}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`
