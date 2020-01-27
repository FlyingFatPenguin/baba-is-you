import { 
  Context, 
  ObjectInfo, 
  SceneInterface,
  GameObjectInterface, 
} from "../interface/Interface"
import {
  Position
}from '../interface/Interface'
import { range } from "../utils/utils"


export function transfrom(context: Context, from: string, target: string[]) {
  const { allData, addObj, removeObj } = context
  allData()
    .filter(v => v.data.name === from)
    .map(v => v.position)
    .forEach(pos => {
      removeObj(pos)
      target.forEach(name => addObj(pos, { name }))
    })
}


export function findPositionsWithRule(context: Context, pos: Position, rule: string): Position[] {
  const { allData, rules } = context
  return allData().filter(v => v.position.x === pos.x && v.position.y === pos.y)
    .filter(v => (rules[v.data.name] || []).includes(rule))
    .map(v => v.position)
}

export function allGrid(scene: SceneInterface): ObjectInfo[][] {
  const { sizeX, sizeY } = scene.getSize()
  const result = []
  for (let y of range(sizeY)) {
    for (let x of range(sizeX)) {
      const grid = scene.getGrid(x, y)
      const objToInfo =
        (obj: GameObjectInterface, z: number): ObjectInfo => {
          return {
            data: obj,
            position: { x, y, z },
          }
        }
      result.push(grid.map(objToInfo))
    }
  }
  return result
}