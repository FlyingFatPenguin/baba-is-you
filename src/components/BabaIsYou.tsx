import * as React from 'react';
import { SceneInterface, Direction } from '../GameCore/Interface';
import BabaScene from './BabaScene';
import { moveAll } from '../GameCore/move';
import { unionControl, youCanMove, checkTheBound, stopCheck, pushThings, winBuilder } from '../GameCore/Control';

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
    const currentScene = this.getCurrentScene()
    const winControl = winBuilder(() => alert('win'))
    const control = unionControl(
      youCanMove,
      checkTheBound,
      stopCheck,
      pushThings,
      winControl,
    )
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
  getCurrentScene = () => {
    const history = this.state.history
    return history[history.length - 1]
  }
  render() {
    const currentScene = this.getCurrentScene()
    return <BabaScene scene={currentScene}></BabaScene>
  }
}

export default BabaIsYou;