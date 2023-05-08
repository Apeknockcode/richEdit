import {Transforms, Editor, Text, Element as SlateElement, Range} from 'slate'

import {LinkElement, ButtonElement} from './custom-types.d'
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}
const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}
const wrapLink = (editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const {selection} = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{text: url}] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, {split: true})
    Transforms.collapse(editor, {edge: 'end'})
  }
}

const CustomEditor = {
  // 判断是否加粗
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })

    return !!match
  },
  // 判断是否斜体
  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    })

    return !!match
  },
  // 判断是否删除线
  isThroughMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.through === true,
      universal: true,
    })
    return !!match
  },
  // 判断是否下划线
  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        console.log(n)
        return n.underline === true
      },
      universal: true,
    })

    return !!match
  },

  // 判断是否代码块
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        console.log(n)
        return n.code === true
      },
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      {bold: isActive ? null : true},
      {match: (n) => Text.isText(n), split: true}
    )
  },
  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      {italic: isActive ? null : true},
      {match: (n) => Text.isText(n), split: true}
    )
  },
  toggleThroughMark(editor) {
    const isActive = CustomEditor.isThroughMarkActive(editor)
    Transforms.setNodes(
      editor,
      {through: isActive ? null : true},
      {match: (n) => Text.isText(n), split: true}
    )
  },
  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor)
    Transforms.setNodes(
      editor,
      {underline: isActive ? null : true},
      {match: (n) => Text.isText(n), split: true}
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      {code: isActive ? null : true},
      {
        match: (n) => Editor.isBlock(editor, n),
        split: true,
      }
    )
  },
  // 链接
  toggleLinkMark(editor) {
    const url = window.prompt('Enter the URL of the link:')
    if (!url) return
    insertLink(editor, url)
  },
}

export default CustomEditor
