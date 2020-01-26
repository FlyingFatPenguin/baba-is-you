import * as React from 'react';
import { GridInterface } from '../GameCore/interface/Interface';
import './style.css'
import BabaObject from './BabaObject';

interface Props {
  grid: GridInterface
}

function BabaGrid(props: Props) {
  const grid = props.grid;
  const objs = grid && grid.getAll()
  return <div className='baba-grid'>
    {objs.map((obj, i) => <BabaObject obj={obj} key={'baba-obj' + i} />)}
  </div>
}

export default BabaGrid