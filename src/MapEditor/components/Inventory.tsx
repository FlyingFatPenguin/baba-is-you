import * as React from 'react';
import { objects, text } from '../../GameCore/data/MapHelper';
import BabaObject from '../../components/BabaObject';
import '../css/Inventory.css'
import { GameObjectInterface } from '../../GameCore/interface/Interface';

interface Props {
  onClick: (obj: GameObjectInterface) => void
}

const allGameObj = [
  ...Object.values(objects),
  ...Object.values(text),
]

export default function Inventory(props: Props) {
  const handleClick = (obj: GameObjectInterface) => () => props.onClick(obj)

  return <div className='inventory center'>
    {
      allGameObj.map((v, i) => <div onClick={handleClick(v)} key={i}>
        <BabaObject obj={v} style={{ width: '4rem', height: '4rem' }}></BabaObject>
      </div>)
    }
  </div>
}