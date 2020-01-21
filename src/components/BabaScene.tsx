import * as React from 'react';
import { SceneInterface } from '../GameCore/Interface';
import { range } from '../GameCore/utils'
import BabaGrid from './BabaGrid';
import './style.css'

interface Props {
  scene: SceneInterface
}

function BabaScene(props: Props) {
  const scene = props.scene
  const { sizeX, sizeY } = scene.getSize()
  return <div className='baba-scene'>
    {
      range(sizeY).map(y => {
        return <ul>
          {range(sizeX).map(x => {
            const grid = scene.getGrid(x, y);
            return <li>
              {grid && <BabaGrid grid={grid}></BabaGrid>}
            </li>
          })}
        </ul>
      })
    }
  </div>
}

export default BabaScene;