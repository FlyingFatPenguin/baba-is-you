import * as React from 'react';
import BabaScene from '../components/BabaScene';
import { GameMap, GameObjectInterface } from '../GameCore/interface/Interface';
import Scene from '../GameCore/Model/Scene';
import ControlPanel from '../MapEditor/components/ControlPanel';

interface Props {

}

interface States {
  gameMap: GameMap
}

// interface SparseMap {
//   [y: number]: {
//     [x: number]: GameObjectInterface[]
//   }
// }

// function buildMapfromSparse(sizeX: number, sizeY: number, sparseMap: SparseMap) {
//   const gameMap = Array(sizeY).fill('').map(() => Array(sizeX).fill(undefined))
//   for (let y in Object.keys(sparseMap)) {
//     const line = sparseMap[y]
//     for (let x in Object.keys(line)) {
//       const value = line[x]
//       if (parseInt(x) < sizeX && parseInt(y) < sizeY) {
//         gameMap[y][x] = value
//       }
//     }
//   }
//   return gameMap
// }

export default class MapEditor extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      gameMap: []
    }
  }
  render() {
    const gameMap = this.state.gameMap
    return <div>
      <BabaScene scene={new Scene(gameMap)}></BabaScene>
      <ControlPanel></ControlPanel>
    </div>
  }
}