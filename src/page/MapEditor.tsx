import * as React from 'react';
import BabaScene from '../components/BabaScene';
import Scene from '../GameCore/Model/Scene';
import ControlPanel from '../MapEditor/components/ControlPanel';
import { mapBuilder } from '../GameCore/data/MapHelper';
import DropDown from '../MapEditor/components/DropDown';

interface Props {

}

// interface States {
//   sizeX: number
//   sizeY: number
// }


// export default class MapEditor extends React.Component<Props, States> {
//   constructor(props: Props) {
//     super(props)
//     this.state = {
//       sizeX: 10,
//       sizeY: 10,
//     }
//   }
//   render() {
//     const { sizeX, sizeY } = this.state
//     const gameMap = mapBuilder(sizeX, sizeY).build()
//     return <div>
//       <BabaScene scene={new Scene(gameMap)} showPos></BabaScene>
//       <ControlPanel></ControlPanel>
//     </div>
//   }
// }

export default function MapEditor(props: Props) {
  const [sizeX, setSizeX] = React.useState(10)
  const [sizeY, setSizeY] = React.useState(10)
  const gameMap = mapBuilder(sizeX, sizeY).build()

  function handleClick(callback: (newValue: number) => void) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      callback(parseInt(ev.currentTarget.value, 10))
    }
  }

  return <div>
    <BabaScene showPos scene={new Scene(gameMap)}></BabaScene>
    <ControlPanel>
      <DropDown iconName='size'>
        <h1>hhh</h1>
        <input type="range" max='30' min='6' step='2' value={sizeX} onChange={handleClick(setSizeX)} />
        <input type="range" max='30' min='6' step='2' value={sizeY} onChange={handleClick(setSizeY)} />
      </DropDown>
      <DropDown iconName='grid'></DropDown>
      <DropDown iconName='add'></DropDown>
      <DropDown iconName='export'></DropDown>
    </ControlPanel>
  </div>
}