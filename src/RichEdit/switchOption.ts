import CustomEditor from './CustomEditor'
// 顶部导航栏操作
const sw = (key, editor) => {
  // 使用我们新编写的命令来替代 `onKeyDown` 中的逻辑
  switch (key) {
    case '代码': {
      CustomEditor.toggleCodeBlock(editor)
      break
    }
    case '加粗': {
      CustomEditor.toggleBoldMark(editor)
      break
    }
    case '斜体': {
      CustomEditor.toggleItalicMark(editor)
      break
    }
    case '删除': {
      CustomEditor.toggleThroughMark(editor)
      break
    }
    case '下划线': {
      CustomEditor.toggleUnderlineMark(editor)
      break
    }
    case '链接': {
      CustomEditor.toggleLinkMark(editor)
      break
    }
  }
}
export default sw
