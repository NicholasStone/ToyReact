
// 封装成为一个新的代理 ELement
class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(component) {
    // 由于 component 是一个 ElementWrapper 节点，因此需要将 root 取出来
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content)
  }
}

export class Component {
  constructor () {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }

  setAttribute(name, value) {
    this.props[name] = value
  }

  appendChild(component) {
    this.children.push(component)
  }

  get root () {
    if (!this._root) {
      this._root = this.render().root
    }

    return this._root
  }
}

export function createElement(type, attrs, ...children) {
  // 当 JSX 解析时，存在的HTML标签会被当成一个字符串去处理，而Component会被当作一个变量传入
  let e = null
  if (typeof type === 'string') {
    // const e = document.createElement(type)
    // 利用封装的 ElementWrapper 来替换 DOM 操作，把渲染工作交给 ElemetWrapper 完成
    e = new ElementWrapper(type)
  } else {
    // 由于
    e = new type()
  }
  for (const p in attrs) {
    e.setAttribute(p, attrs[p])
  }
  // 由于 {this.children} 传入的是一个数组，因此需要在此进行相应的修改
  // 考虑到数组内也有数组，因此需要把装成一个函数
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        // child = document.createTextNode(child)
        // 利用封装的 TextWrapper 来替换 DOM 操作，把渲染工作交给 TextWrapper 完成
        child = new TextWrapper(child)
      }
      if (typeof child === 'object' && child instanceof Array) {
        // 为了正确展开 children，递归调用 insertChildren
        insertChildren(child)
      } else {
        e.appendChild(child)
      }
    }
  }
  insertChildren(children)

  return e
}


export function render(component, parentElement) {
  parentElement.appendChild(component.root)
}