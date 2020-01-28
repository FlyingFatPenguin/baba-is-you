import * as React from 'react';
import { SceneInterface } from '../GameCore/interface/Interface';
import { range } from '../GameCore/utils/utils'
import BabaGrid from './BabaGrid';
import './style.css'

interface Props {
  scene: SceneInterface,
  showPos?: boolean, // 开启调试模式
  style?: React.CSSProperties,
}

function BabaScene(props: Props, ref: React.Ref<HTMLDivElement>) {
  const scene = props.scene
  const showPos = props.showPos
  const style = props.style

  const { sizeX, sizeY } = scene.getSize()

  return <div className='baba-scene' ref={ref} style={style}>
    {
      range(sizeY).map(y => {
        return <ul key={'ul' + y}>
          {range(sizeX).map(x => {
            const grid = scene.getGrid(x, y);
            return <li key={'li' + x} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', color: 'rgba(255,255,255,0.5)', zIndex: 1 }}>
                {showPos && x + ',' + y}
              </div>
              {grid && <BabaGrid grid={grid}></BabaGrid>}
            </li>
          })}
        </ul>
      })
    }
  </div>
}

export default React.forwardRef(BabaScene);