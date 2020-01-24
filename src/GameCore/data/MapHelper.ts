import { GameMap } from '../Interface'
import { GameObjectInterface } from '../Interface'
import { range } from '../utils'

type Pos = { x: number, y: number }
type Callback = (value: GridData, pos: Pos) => GridData
type GridData = GameObjectInterface[]


export function mapBuilder(sizeX: number, sizeY: number) {
  const data: GameMap = range(sizeY).map(() => range(sizeX).map(() => []))
  return {
    build() { return data },
    setPos(pos: Pos, callback: Callback) {
      const { x, y } = pos;
      data[y][x] = callback(data[y][x], { x, y })
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
    }
  }
}

export function buildText(content: string) {
  return {
    name: 'text',
    content,
  }
}



