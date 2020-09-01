import {createElement, render, Component} from './toy-react'

class Comp extends Component{
  render() {
    // 这样写只能展示下面的 Comp, 不能将 10 行开始的 JSX 内容完全展示
    return <div>Comp</div>
  }
}

let a = render(<Comp>
  <div>123</div>
  <div></div>
  <div></div>
  <div></div>
</Comp>, document.body)