import {useSlateStatic, useSelected, useFocused} from 'slate-react'
// 为 默认 节点定义一个 React 组件渲染器。
const DefaultElement = (props) => {
  console.log('DefaultElement-props', props)
  return (
    <p {...props.attributes}>
      <span>{props.children}</span>
    </p>
  )
}
// 为 code 节点定义一个 React 组件渲染器。
const CodeElement = (props) => {
  return (
    <span {...props.attributes}>
      <code>{props.children}</code>
    </span>
  )
}
// 定义一个 React 组件来加粗渲染叶子节点。
const Leaf = ({attributes, children, leaf}) => {
  // console.log('leaf', props)
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.through) {
    children = <del>{children}</del>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)
const Link = ({attributes, children, element}) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={
        selected
          ? `
              box-shadow: 0 0 0 3px #ddd;
            `
          : ''
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}
const EditableButtonComponent = ({attributes, children}) => {
  return (
    <span
      {...attributes}
      onClick={(ev) => ev.preventDefault()}
      className={`
        margin: 0 0.1em;

        background-color: #efefef;
        padding: 2px 6px;
        border: 1px solid #767676;
        border-radius: 2px;
        font-size: 0.9em;
      `}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </span>
  )
}
// const Image = (props) => (
//   <div {...props.attributes}>
//     <div contentEditable={false}>
//       <img src={props.element.src} alt={props.element.src} />
//     </div>
//     {props.children}
//   </div>
// )
export {DefaultElement, CodeElement, Leaf, Link, EditableButtonComponent}
