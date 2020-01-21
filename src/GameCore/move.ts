import {
  SceneInterface,
  Direction,
  GameObjectInterface,
  Context,
  Control,
  Rules,
  Position,
  AddInfo,
  RemoveInfo,
} from './Interface'
import { range } from './utils'



export function moveAll(scene: SceneInterface, control: Control, direction: Direction) {
  const newScene = scene
  const addList: AddInfo[] = []
  const removeList: RemoveInfo[] = []

  const context: Context = {
    scene: newScene,
    move,
    rules: getRules(scene),
    getPositions,
    direction,
    getGrid,
    moveCheck
  }
  function getGrid(pos: { x: number, y: number }) {
    return newScene.getGrid(pos.x, pos.y)
  }

  function removeObj(pos: Position) {
    removeList.push(pos)
  }

  function addObj(pos: Position, obj: GameObjectInterface) {
    addList.push({ pos, obj })
  }

  function getGameObject(pos: Position) {
    const grid = getGrid(pos)
    return grid && grid.get(pos.z)
  }

  function allPositions(): Position[] {
    const { sizeX, sizeY } = scene.getSize()
    let result: Position[] = []
    for (let y of range(sizeY)) {
      for (let x of range(sizeX)) {
        const grid = getGrid({ x, y })
        let pos = (grid && grid.getAll().map((v, index) => ({ x, y, z: index }))) || []
        result = [...result, ...pos]
      }
    }
    return result
  }

  function getPositions(name: string): Position[] {
    return allPositions().filter(pos => {
      const obj = getGameObject(pos)
      // console.log(pos)
      // console.log(obj)
      return name === (obj && obj.name)
    })
  }

  function moveCheck(pos: Position, direction: Direction) {
    return control.onMoveCheck(context, pos, direction)
  }

  function move(pos: Position, direction: Direction) {
    const obj = getGameObject(pos)
    if (control.onMoveCheck(context, pos, direction) && obj) {
      control.onMove(context, pos, direction)
      addObj(getNextPosition(pos, direction), obj)
      removeObj(pos)
    }
  }

  control.onStart(context)
  control.onFinalCheck(context)
  // console.log(removeList)
  // console.log(addList)
  return scene.newScene(removeList, addList)
}

function getRules(scene: SceneInterface): Rules {
  return {
    baba: ['you'],
    lava: ['you'],
    wall: ['stop'],
    box: ['push']
  }
}

export function getNextPosition(from: Position, direction: Direction): Position {
  const copy = { ...from };
  switch (direction) {
    case Direction.left:
      copy.x = copy.x - 1
      return copy
    case Direction.right:
      copy.x = copy.x + 1
      return copy
    case Direction.up:
      copy.y = copy.y - 1
      return copy
    case Direction.down:
      copy.y = copy.y + 1
      return copy
  }
}