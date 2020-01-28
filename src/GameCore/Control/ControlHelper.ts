import {
  Context,
  ObjectInfo,
  SceneInterface,
  GameObjectInterface,
} from "../interface/Interface"
import {
  Position
} from '../interface/Interface'
import { range } from "../utils/utils"



export function transfrom(context: Context, from: string, target: string[]) {
  const { addObj, removeObj, scene } = context
  allData(scene)
    .filter(v => v.data.name === from)
    .map(v => v.position)
    .forEach(pos => {
      removeObj(pos)
      target.forEach(name => addObj(pos, { name }))
    })
}


export function findPositionsWithRule(context: Context, pos: Position, rule: string): Position[] {
  const { rules, scene } = context
  return gridObjInfos(scene, pos)
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

export function allData(scene: SceneInterface): ObjectInfo[] {
  return allGrid(scene).reduce((a, b) => [...a, ...b], [])
}

function gridObjInfos(scene: SceneInterface, pos: Position) {
  return scene.getGrid(pos.x, pos.y).map((obj, i) => ({ data: obj, position: { x: pos.x, y: pos.y, z: i } }))
}