import * as React from 'react';
import BabaObject from '../../components/BabaObject';
import { GameObjectInterface, Direction } from '../../GameCore/interface/Interface';

interface Props {
  object: GameObjectInterface
  onChangeDirection: (direction: Direction) => void
  onRemove: () => void
}

export default function ObjectEditor(props: Props) {
  const object = props.object
  return <div>
    <button onClick={props.onRemove}>删除</button>
    <BabaObject obj={object} style={{ width: '4rem', height: '4rem' }}></BabaObject>
    direction:
    <select name="direction" value={object.direction} onChange={ev => props.onChangeDirection(parseInt(ev.currentTarget.value) as Direction)}>
      <option value={Direction.left}>left</option>
      <option value={Direction.right}>right</option>
      <option value={Direction.up}>up</option>
      <option value={Direction.down}>down</option>
      <option value={Direction.wait}>wait</option>
    </select>
  </div>
}