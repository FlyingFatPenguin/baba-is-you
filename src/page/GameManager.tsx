import * as React from 'react';
import BabaIsYou from '../components/BabaIsYou';
import { allLevel as level_0_7 } from '../GameCore/data/level_0_7';
import '../css/GameManager.css'
import END from '../components/END';
import BabaHelp from '../components/BabaHelp';
import { getData, saveData } from '../utils/DataStore';
import { allLevel as lake_1_13 } from '../GameCore/data/lake_1_13'
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
  ...lake_1_13,
]

const MAX_LEVEL = 'maxLevel'
const CURRENT_LEVEL = 'currentLevel'

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
  componentDidMount() {
    const { maxLevelIndex, currentLevelIndex } = this.load()
    this.setCurrentLevel(currentLevelIndex)
    this.setMaxLevel(maxLevelIndex)
  }
  setCurrentLevel = (levelIndex: number) => {
    this.setState(() => ({
      levelIndex,
    }))
    saveData(CURRENT_LEVEL, levelIndex.toString())
  }
  setMaxLevel = (maxLevelIndex: number) => {
    this.setState(() => ({
      maxLevelIndex
    }))
    saveData(MAX_LEVEL, maxLevelIndex.toString())
  }
  getCurrentLevel = () => {
    const levelInfo = allLevel[this.state.levelIndex]
    return levelInfo && levelInfo.gameMap
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
    const nextIndex = this.state.levelIndex + 1
    const maxIndex = this.state.maxLevelIndex
    this.setCurrentLevel(nextIndex)
    this.setMaxLevel(Math.max(nextIndex, maxIndex))
  }
  load = () => {
    return {
      maxLevelIndex: parseInt(getData(MAX_LEVEL), 10) || 0,
      currentLevelIndex: parseInt(getData(CURRENT_LEVEL), 10) || 0,
    }
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