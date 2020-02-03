import * as React from 'react';
import GameManager from './GameManager';
import MapEditor from './MapEditor';

function startWith(pattern: string[], target: string[]) {
  return [...pattern].reverse().every((v, i) => v === target[i])
}

export default function App() {
  const [page, setPage] = React.useState(true)
  const [keySeq, setKeySeq] = React.useState([] as string[])

  React.useEffect(() => {
    window.addEventListener('keydown', handleKey)
    function handleKey(ev: KeyboardEvent) {
      const newKeySeq = [ev.key, ...keySeq].slice(0, 30)
      if (startWith('admin'.split(''), newKeySeq)) {
        setPage(!page)
      }
      setKeySeq(newKeySeq)
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  })

  return page ?
    <GameManager></GameManager> :
    <MapEditor></MapEditor>
}