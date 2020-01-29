import * as React from 'react';
import { SceneInterface, Direction, GameMap } from '../GameCore/interface/Interface';
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
  defeatControl,
  meltHotControl
} from '../GameCore/Control/Control';
import Scene from '../GameCore/Model/Scene';
import { addTouchListener, removeTouchListener, TouchType } from '../utils/TouchHelper';

interface Props {
  startGameMap: GameMap,
  onWin: () => void
}

interface HistoryMoment {
  scene: SceneInterface,
  isWin?: boolean,
  isDefeat?: boolean,
}

interface States {
  history: HistoryMoment[],
  style?: React.CSSProperties,
}

class BabaIsYou extends React.Component<Props, States> {
  myRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props)
    this.state = {
      history: [{ scene: new Scene(this.props.startGameMap) }]
    }
    this.myRef = React.createRef()
  }
  componentWillReceiveProps(nextProp: Props) {
    if (this.props.startGameMap !== nextProp.startGameMap) {
      this.setState({
        history: [{ scene: new Scene(nextProp.startGameMap) }]
      })
    }
    this.handleResize()
  }
  //*************** 操作控制部分 **************
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
  handleResize = () => {
    const current = this.myRef.current
    if (!current) {
      return
    }
    // 整个窗口的尺寸
    const { clientHeight, clientWidth } = document.body
    // 当前元素的尺寸
    const sceneHeight = current.clientHeight
    const sceneWidth = current.clientWidth
    // 希望当前元素占据整个窗口的比例
    const K = 0.95

    // 如果想要达到目标比例, 对长和宽理论应该进行的缩放
    const kH = K * clientHeight / sceneHeight
    const kW = K * clientWidth / sceneWidth

    // 取大会导致超出屏幕
    const scale = Math.min(kH, kW)
    this.setState({
      style: { transform: ` translate(-50%, -50%) scale(${scale})` }
    })
  }
  handleTouch = (type: TouchType) => {
    switch (type) {
      case TouchType.left:
        this.move(Direction.left)
        break
      case TouchType.right:
        this.move(Direction.right)
        break
      case TouchType.up:
        this.move(Direction.up)
        break
      case TouchType.down:
        this.move(Direction.down)
        break
      case TouchType.anticlockwise:
        this.undo()
        break
      case TouchType.clockwise:
        this.restart()
        break
    }
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('resize', this.handleResize)
    addTouchListener(this.handleTouch)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.handleResize)
    removeTouchListener()
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
    const control = unionControl(
      youCanMove,
      checkTheBound,
      stopCheck,
      pushThings,
      winControl,
      transformControl,
      sinkControl,
      defeatControl,
      meltHotControl,
    )
    const newScene = moveAll(currentScene, control, direction)
    this.recordHistory({
      scene: newScene,
      isWin,
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
        return { history }
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
    const style = this.state.style
    return <BabaScene scene={currentScene} style={style} ref={this.myRef}></BabaScene>
  }
}

export default BabaIsYou;