import * as React from 'react';
import BabaScene from '../components/BabaScene';
import Scene from '../GameCore/Model/Scene';
import ControlPanel from '../MapEditor/components/ControlPanel';
import { mapBuilder } from '../GameCore/data/MapHelper';
import DropDown from '../MapEditor/components/DropDown';
import Inventory from '../MapEditor/components/Inventory';
import { GameObjectInterface, GridInterface } from '../GameCore/interface/Interface';
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
  const [name, setName] = React.useState('BabaMap')
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
  function setGridData(pos: Pos, gridData: GridInterface) {
    // 去重
    const newMapItems = [...mapItems.filter(v => v.pos.x !== pos.x || v.pos.y !== pos.y)]
    if (gridData.length !== 0) {
      newMapItems.push({ pos, gridData })
    }
    setMapItems(newMapItems)
  }
  function getGridData(pos: Pos) {
    const result = mapItems.find(v => v.pos.x === pos.x && v.pos.y === pos.y)
    return result && result.gridData
  }

  function handleConfirm(objList: GameObjectInterface[]) {
    if (!currentPos) { return }
    setGridData(currentPos, objList)
    setCurrentPos(undefined)
  }

  function handleCancel() {
    setCurrentPos(undefined)
  }


  // 地图导入导出
  function sparseMapToString(sparseMap: SparseMap) {
    return JSON.stringify(sparseMap)
  }

  function stringToSparseMap(data: string) {
    return JSON.parse(data)
  }

  function copyMap() {
    const data = sparseMapToString({ sizeX, sizeY, mapItems })
    downloadFile(data, name + '.json')
  }

  function handleImport(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = (ev.currentTarget.files || [])[0]
    if (!file) {
      return
    }
    var reader = new FileReader()
    reader.onload = function () {
      const result = reader.result
      if (result) {
        const sparseMap = stringToSparseMap(result.toString())
        const name = file.name.split('.')[0]
        const { sizeX = 10, sizeY = 10 } = sparseMap
        const mapItems = sparseMap.mapItems
        setSizeX(sizeX)
        setSizeY(sizeY)
        setMapItems(mapItems)
        setName(name)
      }
    };
    reader.readAsText(file)
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>) {
    setName(ev.currentTarget.value)
  }


  return <div>
    {isEdit &&
      currentPos &&
      <GridEditor onConfirm={handleConfirm} onCancel={handleCancel} startGrid={getGridData(currentPos) || []}></GridEditor>}
    {isEdit ?
      <BabaScene showPos scene={new Scene(gameMap)} onClick={editGrid}></BabaScene> :
      <BabaIsYou startGameMap={gameMap} onWin={console.log}></BabaIsYou>
    }
    <ControlPanel>
      <DropDown iconName='size'>
        <h1>地图尺寸</h1>
        宽度: {sizeX}
        <input type="range" max='30' min='6' step='2' value={sizeX} onChange={changeMapSize(setSizeX)} />
        高度: {sizeY}
        <input type="range" max='30' min='6' step='2' value={sizeY} onChange={changeMapSize(setSizeY)} />
      </DropDown>
      {/* <DropDown iconName='grid'></DropDown> */}
      <DropDown iconName={isEdit ? 'play' : 'stop'} onClick={() => setIsEdit(!isEdit)}></DropDown>
      <DropDown iconName='import'>
        <h1>选择导入文件</h1>
        <input type='file' onChange={handleImport}></input>
      </DropDown>
      <DropDown iconName='export'>
        <h1>编辑导出名称</h1>
        <input type="text" value={name} onChange={changeName} />
        <button onClick={copyMap}>导出 {name}</button>
      </DropDown>
    </ControlPanel>
  </div>
}