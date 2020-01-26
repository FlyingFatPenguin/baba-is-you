import * as React from 'react';
import { SceneInterface, Direction } from '../GameCore/Interface';
import BabaScene from './BabaScene';
import { moveAll } from '../GameCore/move';
import { unionControl, youCanMove, checkTheBound, stopCheck, pushThings, winBuilder } from '../GameCore/Control';

interface Props {
  startScene: SceneInterface,
  onWin: () => void
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
  componentDidUpdate(prevProps: Props) {
    if (this.props.startScene !== prevProps.startScene) {
      this.setState({
        history: [this.props.startScene]
      })
    }
  }
  handleKeydown = (ev: KeyboardEvent) => {
    const keyMap: { [name: string]: () => void } = {
      'h': () => this.move(Direction.left),
      'j': () => this.move(Direction.down),
      'k': () => this.move(Direction.up),
      'l': () => this.move(Direction.right),
      'ArrowLeft': () => this.move(Direction.left),
      'ArrowDown': () => this.move(Direction.down),
      'ArrowUp': () => this.move(Direction.up),
      'ArrowRight': () => this.move(Direction.right),
      'u': this.undo,
      'r': this.restart,
    }
    const key = ev.key
    const method = keyMap[key]
    method && method()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }
  // 移动命令
  move = (direction: Direction) => {
    const currentScene = this.getCurrentScene()
    const winControl = winBuilder(this.props.onWin)
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
    return <BabaScene scene={currentScene} showPos></BabaScene>
  }
}

export default BabaIsYou;