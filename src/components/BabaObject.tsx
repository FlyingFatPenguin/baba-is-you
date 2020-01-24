import * as React from 'react';
import { GameObjectInterface } from '../GameCore/Interface';
import { isText as checkIsText, getTextObjContent } from '../GameCore/GameObjectInterface'
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
      wall: { color: '#292f3a' },
      is: { color: '#fbfdfb' },
      push: { backgroundColor: '#8f6939' },
      rock: { color: '#8f6939' },
    }
    return <div className='baba-object' style={styleConfig[content]}>
      {content}
    </div>
  } else {
    return <BabaImg name={name} />
  }
}