import * as React from 'react';
import BabaScene from '../components/BabaScene';
import Scene from '../GameCore/Model/Scene';
import ControlPanel from '../MapEditor/components/ControlPanel';
import { mapBuilder } from '../GameCore/data/MapHelper';
import DropDown from '../MapEditor/components/DropDown';
import Inventory from '../MapEditor/components/Inventory';
import { GameObjectInterface } from '../GameCore/interface/Interface';
import BabaIsYou from '../components/BabaIsYou';
import copy from 'copy-to-clipboard'
import { downloadFile } from '../utils/FileSystem';
import GridEditor from '../MapEditor/components/GridEditor';

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

/**
 * 稀疏地图
 */
interface SparseMap {
  sizeX: number
  sizeY: number
  mapItems: MapItem[]
}

export default function MapEditor(props: Props) {
  const [isEdit, setIsEdit] = React.useState(true)
  const [sizeX, setSizeX] = React.useState(10)
  const [sizeY, setSizeY] = React.useState(10)
  const [mapItems, setMapItems] = React.useState([] as MapItem[])
  const [currentPos, setCurrentPos] = React.useState(undefined as undefined | { x: number, y: number })
  const gameMap = mapItems.reduce((p, v) =>
    p.setPos(v.pos, () => v.gridData),
    mapBuilder(sizeX, sizeY))
    .build()

  function changeMapSize(callback: (newValue: number) => void) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      callback(parseInt(ev.currentTarget.value, 10))
    }
  }
  async function editGrid(x: number, y: number) {
    if (currentPos) {
      setCurrentPos(undefined)
    } else {
      setCurrentPos({ x, y })
    }
  }

  // ***** 地图弹窗 *****
  function handleConfirm(objList: GameObjectInterface[]) {
    if (!currentPos) { return }
    setMapItems([...mapItems, { pos: currentPos, gridData: objList }])
    setCurrentPos(undefined)
  }

  function handleCancel() {
    setCurrentPos(undefined)
  }


  // 地图导入导出
  function sparseMapToString(sparseMap: SparseMap) {
    return JSON.stringify(sparseMap)
  }

  function copyMap() {
    const data = sparseMapToString({ sizeX, sizeY, mapItems })
    // copy()
    downloadFile(data, '1.json')
  }

  return <div>
    {isEdit &&
      currentPos &&
      <GridEditor onConfirm={handleConfirm} onCancel={handleCancel}></GridEditor>}
    {isEdit ?
      <BabaScene showPos scene={new Scene(gameMap)} onClick={editGrid}></BabaScene> :
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
      <DropDown iconName='export' onClick={copyMap}>
      </DropDown>
    </ControlPanel>
  </div>
}