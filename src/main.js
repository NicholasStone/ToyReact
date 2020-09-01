import {createElement, render, Component} from './toy-react'

class Comp extends Component{
  render() {
    return <div>Comp</div>
  }
}

let a = render(<Comp>
  <div>123</div>
  <div></div>
  <div></div>
  <div></div>
</Comp>, document.body)