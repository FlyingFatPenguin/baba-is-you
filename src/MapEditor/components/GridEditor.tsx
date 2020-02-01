import * as React from 'react';
import { GameObjectInterface, Direction } from '../../GameCore/interface/Interface';
import BabaObject from '../../components/BabaObject';
import '../css/GridEditor.css'
import ObjectEditor from './ObjectEditor';

interface Props {

}

export default function GridEditor(props: Props) {
  const [objList, setObjList] = React.useState([] as GameObjectInterface[])

  function addObj() {
    setObjList([...objList, { name: 'wall', direction: Direction.wait }])
  }

  return <div className='grid-editor'>
    <div className='obj-list'>
      {objList.map(v => <ObjectEditor object={v}></ObjectEditor>)}
      <img src={require('../img/add.png')} onClick={addObj}></img>
    </div>
    <div>
      <button>确认</button>
      <button>取消</button>
    </div>
  </div>
}