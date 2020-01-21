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
type Callback = (value: GridData) => GridData
type GridData = GameObjectInterface[]


function mapBuilder(sizeX: number, sizeY: number) {
  const data: GameMap = range(sizeY).map(() => range(sizeX).map(() => []))
  return {
    build() { return data },
    setPos(pos: Pos, callback: Callback) {
      const { x, y } = pos;
      data[y][x] = callback(data[y][x])
      return this
    },
    setArea(LeftUp: Pos, RightDown: Pos, callback: Callback) {
      const { x: startX, y: startY } = LeftUp
      const { x: endX, y: endY } = RightDown
      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          this.setPos({ x, y }, callback)
        }
      }
      return this
    }
  }
}


export const map3: GameMap = mapBuilder(15, 15)
  .setArea({ x: 2, y: 4 }, { x: 13, y: 5 }, () => wall)
  .setArea({ x: 2, y: 8 }, { x: 13, y: 9 }, () => wall)
  .setArea({ x: 7, y: 5 }, { x: 8, y: 8 }, () => [rock])
  .setPos({ x: 3, y: 6 }, () => [baba])
  .setPos({ x: 11, y: 6 }, () => [baba])
  .build()

