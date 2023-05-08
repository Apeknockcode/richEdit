import { useState, useMemo, useCallback } from 'react'
import isUrl from 'is-url'
// 导入 Slate 编辑器的工厂函数。
import {createEditor} from 'slate'
// 导入 Slate 组件和 React 插件。
import {Slate, Editable, withReact} from 'slate-react'
import {
  DefaultElement,
  CodeElement,
  Leaf,
  Link,
  EditableButtonComponent,
} from './renderEdit'
import {withHistory} from 'slate-history'
import handleKeyDown from './keyDown'
import EditOption from './EditOption'

const withInlines = (editor) => {
  const {insertData, insertText, isInline, isElementReadOnly, isSelectable} =
    editor

  editor.isInline = (element) =>
    ['link', 'button', 'badge'].includes(element.type) || isInline(element)

  editor.isElementReadOnly = (element) =>
    element.type === 'badge' || isElementReadOnly(element)

  editor.isSelectable = (element) =>
    element.type !== 'badge' && isSelectable(element)

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}
function RichEdit() {
  const header: React.CSSProperties = {
    width: '100%',
    height: '50px',
    background: '#EDEDED',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #CDC9C9',
    margin: '0 auto',
  }
  // 创建一个不会在渲染中变化的 Slate 编辑器对象。
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  )
  // 跟踪编辑器中 value 的值。
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('content')) || [
      {
        type: 'paragraph',
        children: [
          {
            text: 'In addition to block nodes, you can create inline nodes. Here is a ',
          },
          {
            type: 'link',
            url: 'https://en.wikipedia.org/wiki/Hypertext',
            children: [{text: 'hyperlink'}],
          },
          {
            text: ', and here is a more unusual inline: an ',
          },
          {
            type: 'button',
            children: [{text: 'editable button'}],
          },
          {
            text: '! Here is a read-only inline: ',
          },
          {
            type: 'badge',
            children: [{text: 'Approved'}],
          },
          {
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected. ',
          },
          // The following is an example of an inline at the end of a block.
          // This is an edge case that can cause issues.
          {
            type: 'link',
            url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
            children: [{text: 'Finally, here is our favorite dog video.'}],
          },
          {text: ''},
        ],
      },
    ]
  )

  // 基于传递的 `props` 定义一个渲染函数。
  // 我们在这里使用 `useCallback` 在随后的渲染中记住这个函数。
  const renderElement = useCallback((props) => {
    console.log('renderElement', props)
    // if (props.leaf.type === 'code') {
    //   return (
    //     <span {...props.attributes}>
    //       <code>{props.children}</code>
    //     </span>
    //   )
    // }
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'link':
        return <Link {...props} />
      case 'button':
        return <EditableButtonComponent {...props} />
      case 'image':
        return <Image {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  // 通过 `useCallback` 定义一个可以记忆的渲染叶子节点的函数。
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    // 在上下文中添加一个可编辑的组件
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value)
        // 在 Local Storage 里保存值。
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
      }}
    >
      <div style={header}>
        <EditOption editor={editor} />
      </div>
      <Editable
        style={{
          width: '100%',
          height: '100%',
          padding: '0 20px 20px 20px',
          boxSizing: 'border-box',
        }}
        // 传递 `renderElement` 函数。
        renderElement={renderElement}
        // 传递渲染叶子节点函数。
        renderLeaf={renderLeaf}
        // 定义一个新的处理程序在控制台打印按下的键。
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    </Slate>
  )
}

export default RichEdit
