import * as React from 'react';
import { objects } from '../../GameCore/data/MapHelper';
import BabaObject from '../../components/BabaObject';
import '../css/Inventory.css'
import { GameObjectInterface } from '../../GameCore/interface/Interface';

interface Props {
  onClick: (obj: GameObjectInterface) => void
}

export default function Inventory(props: Props) {
  const handleClick = (obj: GameObjectInterface) => () => props.onClick(obj)

  return <div className='inventory center'>
    {Object.values(objects).map((v, i) => <div onClick={handleClick(v)} key={i}>
      <BabaObject obj={v}></BabaObject>
    </div>
    )}
  </div>
}