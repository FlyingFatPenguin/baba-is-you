import * as React from 'react';
import { GameObjectInterface } from '../GameCore/interface/Interface';
import { isText as checkIsText, getTextObjContent } from '../GameCore/interface/GameObjectInterface'
import BabaImg from './BabaImg';

interface Props {
  obj: GameObjectInterface
}

export default function (props: Props) {
  const obj = props.obj
  const name = obj && obj.name
  const isText = obj && checkIsText(obj)

  if (!name) {
    return <div></div>
  } else if (isText) {
    const content = getTextObjContent(obj)
    const styleConfig: { [name: string]: React.CSSProperties } = {
      win: { backgroundColor: '#edde7e' },
      flag: { color: '#edde7e' },
      you: { backgroundColor: '#e64a68' },
      baba: { color: '#e64a68' },
      stop: { backgroundColor: '#303624' },
      wall: { color: '#808080' },
      is: { color: '#fbfdfb' },
      push: { backgroundColor: '#8f6939' },
      rock: { color: '#8f6939' },
      water: { color: '#5899d2' },
      sink: { backgroundColor: '#5899d2' },
      skull: { color: '#763125' },
      defeat: { backgroundColor: '#763125' },
      lava: { color: '#dd6146' },
      melt: { backgroundColor: '#559ad1' },
      hot: { backgroundColor: '#e9994a' },
      grass: { color: '#a0a640' },
      and: { color: '#fbfdfb' },
      jelly: { color: '#6287c3' },
    }
    return <div className='baba-object' style={styleConfig[content]}>
      {content.toUpperCase()}
    </div>
  } else {
    return <BabaImg name={name} />
  }
}