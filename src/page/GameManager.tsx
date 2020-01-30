import * as React from 'react';
import BabaIsYou from '../components/BabaIsYou';
import { allLevel as level_0_7 } from '../GameCore/data/level_0_7';
import '../css/GameManager.css'
import END from '../components/END';
import BabaHelp from '../components/BabaHelp';
import { getData, saveData } from '../utils/DataStore';
import SelectLevel from '../components/SelectLevel';

interface Props {

}

interface State {
  levelIndex: number
  gameCoreStyle: React.CSSProperties
  showWinWord: boolean
  maxLevelIndex: number
}

const allLevel = [
  ...level_0_7,
]

const MAX_LEVEL = 'maxLevel'

export default class GameManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      levelIndex: 0,
      gameCoreStyle: {},
      showWinWord: false,
      maxLevelIndex: 0,
    }
  }
  componentWillMount() {
    const maxLevelString = getData(MAX_LEVEL)
    if (maxLevelString) {
      const maxLevel = parseInt(maxLevelString, 10)
      this.setCurrentLevel(maxLevel)
      this.setMaxLevel(maxLevel)
    }
  }
  setCurrentLevel = (levelIndex: number) => {
    this.setState(() => ({
      levelIndex,
    }))
  }
  setMaxLevel = (maxLevelIndex: number) => {
    this.setState(() => ({
      maxLevelIndex
    }))
  }
  getCurrentLevel = () => {
    return allLevel[this.state.levelIndex].gameMap
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
      levelIndex: st.levelIndex + 1,
      maxLevelIndex: Math.max(st.levelIndex + 1, st.maxLevelIndex)
    }))
    this.save()
  }
  save = () => {
    saveData(MAX_LEVEL, this.state.levelIndex.toString())
  }
  render() {
    const currentLevel = this.getCurrentLevel()
    const showWinWord = this.state.showWinWord
    const gameCoreStyle = this.state.gameCoreStyle
    const maxIndex = this.state.maxLevelIndex
    return <div>
      <BabaHelp></BabaHelp>
      <SelectLevel
        levelInfoList={allLevel}
        onClick={this.setCurrentLevel}
        maxIndex={maxIndex}
      ></SelectLevel>
      <div className='game-core' style={gameCoreStyle}>
        {
          currentLevel ?
            <BabaIsYou startGameMap={currentLevel} onWin={this.win}></BabaIsYou> :
            <END></END>
        }
      </div>
      {showWinWord && <span className='win-word'>Congratulations</span>}
    </div>
  }
}