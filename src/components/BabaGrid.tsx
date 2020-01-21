import * as React from 'react';
import { GridInterface } from '../GameCore/Interface';
import './style.css'

interface Props {
  grid: GridInterface
}

function BabaGrid(props: Props) {
  const grid = props.grid;
  const objs = grid && grid.getAll()
  const obj = objs && objs[objs.length - 1]
  const name = obj && obj.name
  return <div className='baba-grid'>
    {name}
  </div>
}

export default BabaGrid