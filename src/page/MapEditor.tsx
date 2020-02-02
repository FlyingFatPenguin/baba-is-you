import * as React from 'react';
import BabaScene from '../components/BabaScene';
import Scene from '../GameCore/Model/Scene';
import ControlPanel from '../MapEditor/components/ControlPanel';
import { mapBuilder } from '../GameCore/data/MapHelper';
import DropDown from '../MapEditor/components/DropDown';
import Inventory from '../MapEditor/components/Inventory';
import { GameObjectInterface } from '../GameCore/interface/Interface';
import BabaIsYou from '../components/BabaIsYou';

interface Props {

}

interface Pos {
  x: number
  y: number
}

interface MapItem {
  pos: Pos
  gridData: GameObjectInterface[]
}

export default function MapEditor(props: Props) {
  const [isEdit, setIsEdit] = React.useState(true)
  const [sizeX, setSizeX] = React.useState(10)
  const [sizeY, setSizeY] = React.useState(10)
  const [mapItems, setMapItems] = React.useState([] as MapItem[])
  const gameMap = mapItems.reduce((p, v) =>
    p.setPos(v.pos, () => v.gridData),
    mapBuilder(sizeX, sizeY))
    .build()

  function changeMapSize(callback: (newValue: number) => void) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      callback(parseInt(ev.currentTarget.value, 10))
    }
  }
  async function handleClick(x: number, y: number) {
    const obj = await selectGameObject()
    setMapItems([...mapItems, { pos: { x, y }, gridData: [obj] }])
  }

  async function editGrid(x: number, y: number) {

  }

  // ***** 地图弹窗 *****
  const [modalList, setModalList] = React.useState([] as JSX.Element[])

  function clearAllModal() {
    setModalList([])
  }

  function selectGameObject() {
    return new Promise((resolve) => {
      if (modalList.length > 0) {
        clearAllModal()
        return
      }
      const inventory = <Inventory onClick={handleClick}></Inventory>
      function handleClick(obj: GameObjectInterface) {
        setModalList(modalList.filter(v => v !== inventory))
        resolve(obj)
      }
      setModalList([...modalList, inventory])
    }) as Promise<GameObjectInterface>
  }

  return <div>
    {modalList}
    {isEdit ?
      <BabaScene showPos scene={new Scene(gameMap)} onClick={handleClick}></BabaScene> :
      <BabaIsYou startGameMap={gameMap} onWin={console.log}></BabaIsYou>
    }
    <ControlPanel>
      <DropDown iconName='size'>
        <h1>hhh</h1>
        <input type="range" max='30' min='6' step='2' value={sizeX} onChange={changeMapSize(setSizeX)} />
        <input type="range" max='30' min='6' step='2' value={sizeY} onChange={changeMapSize(setSizeY)} />
      </DropDown>
      {/* <DropDown iconName='grid'></DropDown> */}
      <DropDown iconName={isEdit ? 'play' : 'stop'} onClick={() => setIsEdit(!isEdit)}></DropDown>
      <DropDown iconName='export'></DropDown>
    </ControlPanel>
  </div>
}