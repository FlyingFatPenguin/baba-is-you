import * as React from 'react';
import { GameObjectInterface, Direction } from '../../GameCore/interface/Interface';
import '../css/GridEditor.css'
import ObjectEditor from './ObjectEditor';
import Inventory from './Inventory';

interface Props {
  onConfirm: (objList: GameObjectInterface[]) => void
  onCancel: () => void
  startGrid: GameObjectInterface[]
}

export default function GridEditor(props: Props) {
  const [objList, setObjList] = React.useState(props.startGrid)

  function addObj(obj: GameObjectInterface) {
    setObjList([...objList, obj])
  }

  function handleChangeDirection(index: number) {
    return function (direction: Direction) {
      setObjList(objList.map((v, i) => i === index ? { ...v, direction } : v))
    }
  }

  function handleRemove(index: number) {
    return () => {
      setObjList(objList.filter((v, i) => i !== index))
    }
  }

  return <div className='grid-editor'>
    <div>
      <button onClick={() => props.onConfirm(objList)}>确认</button>
      <button onClick={props.onCancel}>取消</button>
    </div>
    <div className='obj-list'>
      {objList.map((v, i) => <ObjectEditor
        object={v}
        onChangeDirection={handleChangeDirection(i)}
        onRemove={handleRemove(i)}
        key={'objList' + i}
      ></ObjectEditor>)}
      {objList.length === 0 && <h1>点击下方选择加入物品</h1>}
    </div>
    <Inventory onClick={addObj}></Inventory>
  </div>
}