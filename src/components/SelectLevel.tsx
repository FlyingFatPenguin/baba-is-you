import * as React from 'react';
import DropDown from './DropDown';
import { LevelInfo } from '../GameCore/interface/Interface';
import '../css/SelectLevel.css'

interface Props {
  levelInfoList: LevelInfo[]
  onClick: (index: number) => void
  maxIndex?: number
  currentIndex?: number
}

export default function SelectLevel(props: Props) {
  const levelInfoList = props.levelInfoList
  const callback = props.onClick
  const maxIndex = props.maxIndex || 0
  const handleClick = (index: number) => () => {
    callback(index)
  }

  function isEnable(levelIndex: number) {
    return levelIndex <= maxIndex
  }
  const enableStyle: React.CSSProperties = { cursor: 'pointer', color: 'white' }
  const unableStyle: React.CSSProperties = { cursor: 'not-allowed', color: 'gray' }

  return <DropDown iconName='level' style={{ top: '15px', right: '10px', alignItems: 'flex-end' }}>
    <ul className='level-list'>
      {levelInfoList.map((levelInfo, i) =>
        <li
          onClick={isEnable(i) ? handleClick(i) : undefined}
          style={isEnable(i) ? enableStyle : unableStyle}
          key={'level' + i}
        >
          {levelInfo.levelName}
        </li>)}
    </ul>
  </DropDown>
}
