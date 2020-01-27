import * as React from 'react';
import { SceneInterface, Direction } from '../GameCore/interface/Interface';
import BabaScene from './BabaScene';
import { moveAll } from '../GameCore/Control/move';
import {
  unionControl,
  youCanMove,
  checkTheBound,
  stopCheck,
  pushThings,
  winBuilder,
  transformControl,
  sinkControl,
  defeatControlBuilder
} from '../GameCore/Control/Control';

interface Props {
  startScene: SceneInterface,
  onWin: () => void
}

interface HistoryMoment {
  scene: SceneInterface,
  isWin?: boolean,
  isDefeat?: boolean,
}

interface States {
  history: HistoryMoment[]
}

class BabaIsYou extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      history: [{ scene: this.props.startScene }]
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.startScene !== prevProps.startScene) {
      this.setState({
        history: [{ scene: this.props.startScene }]
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
    if (!this.canMove()) {
      return
    }
    // 记录当前是否胜利
    let isWin = false
    const winControl = winBuilder(() => {
      isWin = true
    })
    // 记录当前是否失败
    let isDefeat = false
    const defeatControl = defeatControlBuilder(() => {
      isDefeat = true
    })
    const control = unionControl(
      youCanMove,
      checkTheBound,
      stopCheck,
      pushThings,
      winControl,
      transformControl,
      sinkControl,
      defeatControl,
    )
    const newScene = moveAll(currentScene, control, direction)
    this.recordHistory({
      scene: newScene,
      isWin,
      isDefeat,
    })
  }

  canMove = () => {
    const currentMoment = this.getCurrentHistoryMoment()
    return !(currentMoment.isDefeat || currentMoment.isWin)
  }

  //********** history 控制 ************
  // 加入记录
  recordHistory = (newScene: HistoryMoment) => {
    this.setState(st => ({
      history: [...st.history, newScene]
    }))
    if (newScene.isWin) {
      this.props.onWin()
    }
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
  getCurrentHistoryMoment = () => {
    const history = this.state.history
    return history[history.length - 1]
  }
  getCurrentScene = () => {
    return this.getCurrentHistoryMoment().scene
  }
  render() {
    const currentScene = this.getCurrentScene()
    return <BabaScene scene={currentScene} showPos></BabaScene>
  }
}

export default BabaIsYou;