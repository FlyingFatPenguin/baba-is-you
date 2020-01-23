import { GameMap } from '../Interface'
import { GameObjectInterface } from '../Interface'
import { range } from '../utils'

// const lava = { name: 'lava' }
const water = { name: 'water' }
const waterText = { name: 'water', isText: true }
const wallBlock = { name: 'wall' }
const baba = { name: 'baba' }
const box = { name: 'box' }
const rock = { name: 'rock' }
const flag = { name: 'flag' }

const wall = [wallBlock]
const grid2 = [water]
const grid3 = [waterText, water]
const empty: GridData = []


export const map1: GameMap = [
  [wall, grid2, grid2],
  [wall, [{ name: 'baba' }], grid3],
  [grid2, empty, grid3],
]

export const map2: GameMap = [
  [wall, wall, wall, wall, wall],
  [empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty],
  [empty, empty, empty, [box], empty],
  [empty, empty, [baba], [box], empty],
  [empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty],
]

type Pos = { x: number, y: number }
type Callback = (value: GridData, pos: Pos) => GridData
type GridData = GameObjectInterface[]


function mapBuilder(sizeX: number, sizeY: number) {
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

function buildText(content: string) {
  return {
    name: content,
    isText: true,
  }
}

export const map3: GameMap = mapBuilder(15, 12)
  .setArea({ x: 2, y: 4 }, { x: 12, y: 4 }, () => wall)
  .setArea({ x: 2, y: 8 }, { x: 12, y: 8 }, () => wall)
  .setArea({ x: 7, y: 5 }, { x: 7, y: 7 }, () => [rock])
  .setPos({ x: 3, y: 6 }, () => [baba])
  .setPos({ x: 11, y: 6 }, () => [flag])
  .setPos({ x: 2, y: 2 }, () => ([buildText('baba')]))
  .setPos({ x: 3, y: 2 }, () => ([buildText('is')]))
  .setPos({ x: 4, y: 2 }, () => ([buildText('you')]))
  .build()

