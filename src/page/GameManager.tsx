import * as React from 'react';
import BabaIsYou from '../components/BabaIsYou';
import { allLevel as level_0_7 } from '../GameCore/data/level_0_7';
import Scene from '../GameCore/Model/Scene';
import '../css/GameManager.css'

interface Props {

}

interface State {
  levelIndex: number
  gameCoreStyle: React.CSSProperties
  showWinWord: boolean
}

const allLevel = [
  ...level_0_7,
]

export default class GameManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      levelIndex: 0,
      gameCoreStyle: {},
      showWinWord: false,
    }
  }
  getCurrentLevel = () => {
    return allLevel[this.state.levelIndex]
  }
  win = () => {
    this.winAnimation()
    setTimeout(this.nextLevel, 1500)
  }
  winAnimation = () => {
    this.setState({
      gameCoreStyle: { animation: 'closeCurtain 3s' },
      showWinWord: true,
    })
    setTimeout(() => {
      this.setState({
        gameCoreStyle: { animation: 'none' },
        showWinWord: false,
      })
    }, 3000)
  }
  nextLevel = () => {
    this.setState(st => ({
      levelIndex: st.levelIndex + 1
    }))
  }
  render() {
    const currentLevel = this.getCurrentLevel()
    const showWinWord = this.state.showWinWord
    const gameCoreStyle = this.state.gameCoreStyle
    if (currentLevel) {
      return <div>
        <div className='game-core' style={gameCoreStyle}>
          <BabaIsYou startGameMap={currentLevel} onWin={this.win}></BabaIsYou>
        </div>
        {showWinWord && <span className='win-word'>Congratulations</span>}
      </div>
    } else {
      return <h1>Congratulations</h1>
    }
  }
}