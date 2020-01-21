import * as React from 'react';
import { SceneInterface, Direction } from '../GameCore/Interface';
import BabaScene from './BabaScene';
import { moveAll } from '../GameCore/move';
import { unionControl, youCanMove, checkTheBound, stopCheck, pushThings } from '../GameCore/Control';

interface Props {
  startScene: SceneInterface
}


interface States {
  history: SceneInterface[]
}

class BabaIsYou extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      history: [this.props.startScene]
    }
  }
  componentDidMount() {
    const keyMap: { [name: string]: () => void } = {
      'h': () => this.move(Direction.left),
      'j': () => this.move(Direction.down),
      'k': () => this.move(Direction.up),
      'l': () => this.move(Direction.right),
      'u': this.undo,
      'r': this.restart,
    }
    window.addEventListener('keydown', ev => {
      const key = ev.key
      const method = keyMap[key]
      method && method()
    })
  }
  // 移动命令
  move = (direction: Direction) => {
    const history = this.state.history
    const currentScene = history[history.length - 1]
    const control = unionControl(youCanMove, checkTheBound, stopCheck, pushThings)
    const newScene = moveAll(currentScene, control, direction)
    this.setState(st => ({
      history: [...st.history, newScene]
    }))
  }
  // 撤销
  undo = () => {
    this.setState(st => {
      const history = st.history;
      if (history.length === 1) {
        return
      }
      history.pop()
      return { history }
    })
  }
  restart = () => {
    this.setState(st => {
      const history = st.history
      history.length = 1
      return { history }
    })
  }
  render() {
    const history = this.state.history
    const currentScene = history[history.length - 1]
    return <BabaScene scene={currentScene} showPos></BabaScene>
  }
}

export default BabaIsYou;