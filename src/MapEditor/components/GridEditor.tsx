import * as React from 'react';
import { GameObjectInterface, Direction } from '../../GameCore/interface/Interface';
import '../css/GridEditor.css'
import ObjectEditor from './ObjectEditor';
import Inventory from './Inventory';

interface Props {
  onConfirm: (objList: GameObjectInterface[]) => void
  onCancel: () => void
}

export default function GridEditor(props: Props) {
  const [objList, setObjList] = React.useState([] as GameObjectInterface[])

  function addObj(obj: GameObjectInterface) {
    setObjList([...objList, obj])
  }

  return <div className='grid-editor'>
    <div>
      <button onClick={() => props.onConfirm(objList)}>确认</button>
      <button onClick={props.onCancel}>取消</button>
    </div>
    <div className='obj-list'>
      {objList.map((v, i) => <ObjectEditor object={v} key={'objList' + i}></ObjectEditor>)}
    </div>
    <Inventory onClick={addObj}></Inventory>
  </div>
}