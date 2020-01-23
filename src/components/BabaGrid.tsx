import * as React from 'react';
import { GridInterface } from '../GameCore/Interface';
import { isText as checkIsText, getTextObjContent } from '../GameCore/GameObjectInterface'
import './style.css'

interface Props {
  grid: GridInterface
}

function BabaGrid(props: Props) {
  const grid = props.grid;
  const objs = grid && grid.getAll()
  const obj = objs && objs[objs.length - 1]
  const name = obj && obj.name
  const isText = obj && checkIsText(obj)


  let innerHTML;
  if (!name) {
    innerHTML = ''
  } else if (isText) {
    innerHTML = getTextObjContent(obj)
  } else {
    try {
      const img = require('../img/' + name + '.png')
      innerHTML = <img src={img} alt={'[' + name + ']'}></img>
    } catch (err) {
      innerHTML = '[' + name + ']'
    }
  }
  return <div className='baba-grid'>
    {innerHTML}
  </div>
}

export default BabaGrid