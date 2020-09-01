import {createElement, render, Component} from './toy-react'

class Comp extends Component{
  render() {
    // 这样写只能展示下面的 Comp, 不能将 10 行开始的 JSX 内容完全展示
    // 将 this.children 加入以显示子节点。
    return <div>
      <h2>Comp</h2>
      {this.children}
    </div>
  }
}

let a = render(<Comp>
  <div>123</div>
  <div></div>
  <div></div>
  <div></div>
</Comp>, document.body)