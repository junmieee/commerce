import dynamic from 'next/dynamic'
import React from 'react'
import { EditorProps } from 'react-draft-wysiwyg'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

const CustomEditor = () => {
  return <Editor />
}

export default CustomEditor
