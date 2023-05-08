import CustomEditor from './CustomEditor'
// 快捷键操作
const handleKeyDown = (event: any, editor) => {
  console.log(event.key)
  if (!event.ctrlKey) {
    return
  }
  // 使用我们新编写的命令来替代 `onKeyDown` 中的逻辑
  switch (event.key) {
    case '`': {
      event.preventDefault()
      CustomEditor.toggleCodeBlock(editor)
      break
    }
    case 'b': {
      event.preventDefault()
      CustomEditor.toggleBoldMark(editor)
      break
    }
  }
}

export default handleKeyDown
