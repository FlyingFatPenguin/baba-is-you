import { GameMap } from '../interface/Interface'
import { GameObjectInterface } from '../interface/Interface'
import { range } from '../utils/utils'

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
    setLine(start: Pos, data: GridData[], isVertical = false) {
      const [dx, dy] = isVertical ? [0, 1] : [1, 0]
      let { x, y } = start
      for (const grid of data) {
        this.setPos({ x, y }, () => grid)
        x += dx
        y += dy
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

export const objects = {
  wall: { name: 'wall' },
  rock: { name: 'rock' },
  baba: { name: 'baba' },
  flag: { name: 'flag' },
  water: { name: 'water' },
  skull: { name: 'skull' },
  lava: { name: 'lava' },
  grass: { name: 'grass' },
  ice: { name: 'ice' },
  jelly: { name: 'jelly' },
}

export const text = {
  baba: buildText('baba'),
  is: buildText('is'),
  you: buildText('you'),
  wall: buildText('wall'),
  stop: buildText('stop'),
  rock: buildText('rock'),
  push: buildText('push'),
  flag: buildText('flag'),
  win: buildText('win'),
  water: buildText('water'),
  sink: buildText('sink'),
  skull: buildText('skull'),
  defeat: buildText('defeat'),
  lava: buildText('lava'),
  melt: buildText('melt'),
  hot: buildText('hot'),
  grass: buildText('grass'),
  and: buildText('and'),
  jelly: buildText('jelly'),
}