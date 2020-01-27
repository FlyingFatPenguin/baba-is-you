import * as React from 'react';
import BabaIsYou from '../components/BabaIsYou';
import { allLevel } from '../GameCore/data/level';
import Scene from '../GameCore/Model/Scene';

interface Props {

}

interface State {
  levelIndex: number
}

export default class GameManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      levelIndex: 5
    }
  }
  getCurrentLevel = () => {
    return allLevel[this.state.levelIndex]
  }
  win = () => {
    this.setState(st => ({
      levelIndex: st.levelIndex + 1
    }))
  }
  render() {
    const currentLevel = this.getCurrentLevel()
    if (currentLevel) {
      return <BabaIsYou startScene={new Scene(currentLevel)} onWin={this.win}></BabaIsYou>
    } else {
      return <h1>Congratulations</h1>
    }
  }
}