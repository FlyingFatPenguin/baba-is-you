import { GameMap } from '../Interface'
import { GameObjectInterface } from '../Interface'
import { range } from '../utils'

type Pos = { x: number, y: number }
type Callback = (value: GridData, pos: Pos) => GridData
type GridData = GameObjectInterface[]


// function addPos(a: Pos, b: Pos) {
//   return { x: a.x + b.x, y: a.y + b.y }
// }

export function mapBuilder(sizeX: number, sizeY: number) {
  const data: GameMap = range(sizeY).map(() => range(sizeX).map(() => []))
  let viewPos = { x: 0, y: 0 }
  return {
    build() { return data },
    setPos(pos: Pos, callback: Callback) {
      const { x, y } = pos;
      data[y + viewPos.y][x + viewPos.x] = callback(data[y][x], pos)
      return this
    },
    setArea(LeftUp: Pos, RightDown: Pos, callback: Callback) {
      const { x: startX, y: startY } = LeftUp
      const { x: endX, y: endY } = RightDown
      for (let y = startY; y < endY + 1; y++) {
        for (let x = startX; x < endX + 1; x++) {
          this.setPos({ x, y }, callback)
        }
      }
      return this
    },
    setViewPos(pos: Pos) {
      viewPos = pos
      return this
    }
  }
}

export function buildText(content: string) {
  return {
    name: 'text',
    content,
  }
}



