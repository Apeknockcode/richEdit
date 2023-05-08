import React from 'react'
import sw from './switchOption.ts'
function EditOption({editor}) {
  const btnOpt = [
    {
      key: '加粗',
      name: '#text-bold',
    },
    {
      key: '代码',
      name: '#code',
    },
    {
      key: '斜体',
      name: '#text-italic',
    },
    {
      key: '删除',
      name: '#strikethrough',
    },
    {
      key: '下划线',
      name: '#text-underline',
    },
    {
      key: '链接',
      name: '#link',
    },

    // {
    //   key: '颜色',
    //   name: '#color-filter',
    // },
    // {
    //   key: '图片',
    //   name: '#add-picture',
    // },
    // {
    //   key: '字体',
    //   name: '#font-size',
    // },

    // {
    //   key: '水平中心二对齐',
    //   name: '#align-horizontal-center-two',
    // },
    // {
    //   key: '向上对齐',
    //   name: '#align-top-two',
    // },
    // {
    //   key: '水平居中',
    //   name: '#align-vertical-center-two',
    // },
    // {
    //   key: '列表',
    //   name: '#list-middle',
    // },
    // {
    //   key: '数字列表',
    //   name: '#ordered-list',
    // },
  ]
  const tabStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    padding: '0 20px',
    boxSizing: 'border-box',
  }
  const btnStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    padding: '4px',
    color: '#333',
    boxSizing: 'border-box',
    cursor: 'pointer',
    marginRight: '20px',
  }
  console.log('EditOption', editor)

  const handleOption = (event, key) => {
    event.preventDefault()
    sw(key, editor)
  }
  return (
    <div style={tabStyle}>
      {btnOpt.map((item) => {
        return (
          <svg
            style={btnStyle}
            key={item.key}
            onMouseDown={(event) => handleOption(event, item.key)}
          >
            <use href={item.name}></use>
          </svg>
        )
      })}
    </div>
  )
}
export default EditOption
