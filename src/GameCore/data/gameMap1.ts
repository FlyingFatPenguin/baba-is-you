import { GameMap } from '../Interface'
import { GridInterface, GameObjectInterface } from '../Interface'

const lava = { name: 'lava' }
const water = { name: 'water' }
const waterText = { name: 'water', isText: true }
const wallBlock = { name: 'wall' }
const baba = { name: 'baba' }
const box = { name: 'box' }

const wall = [wallBlock]
const grid2 = [water]
const grid3 = [waterText, water]
const empty: GameObjectInterface[] = []

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