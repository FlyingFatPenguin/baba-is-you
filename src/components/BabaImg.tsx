import * as React from 'react';

interface Props {
  name: string,
}

export default function BabaImg(props: Props) {
  const name = props.name
  try {
    const src = require('../img/' + name + '.png')
    return <img src={src} alt={'[' + name + ']'}></img>
  } catch (err) {
    console.error(err)
    return <div>
      {'[' + name + ']'}
    </div>
  }
}