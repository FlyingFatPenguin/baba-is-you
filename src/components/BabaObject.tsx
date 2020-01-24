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


  let innerHTML;
  if (!name) {
    return <div></div>
  } else if (isText) {
    return <div className='baba-object'>{getTextObjContent(obj)}</div>
  } else {
    return <BabaImg name={name} />
  }
}