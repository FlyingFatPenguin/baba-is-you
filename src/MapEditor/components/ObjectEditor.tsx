import * as React from 'react';
import BabaObject from '../../components/BabaObject';
import { GameObjectInterface } from '../../GameCore/interface/Interface';

interface Props {
  object: GameObjectInterface
}

export default function ObjectEditor(props: Props) {
  const object = props.object
  return <div>
    <BabaObject obj={object}></BabaObject>
    name: <input type="text" value={object.name}/>
  </div>
}