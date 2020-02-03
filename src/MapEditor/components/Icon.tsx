import * as React from 'react';
import '../css/Icon.css'

interface Props {
  iconName: string
  onClick?: () => void
}

export default function Icon(props: Props) {
  const name = props.iconName
  const handleClick = props.onClick
  return <img
    src={require('../img/' + name + '.png')}
    alt={name}
    onClick={handleClick}
    className='icon'
  />
}