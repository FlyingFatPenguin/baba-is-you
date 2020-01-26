import {
  SceneInterface,
  Direction,
  GameObjectInterface,
  Context,
  Control,
  Position,
  AddInfo,
  RemoveInfo,
  MoveConfig
} from '../interface/Interface'
import { range, compose, } from '../utils/utils'
import { getRules } from '../Rule/Rules'

/**
 * 纯函数, 返回一个新的场景作为本次事件的响应
 * @param control 控制器, 决定当前地图如何更新
 * @param direction 移动的方向
 */
const updateScene = (control: MoveConfig, direction: Direction, callback: (context: Context) => void) => (startScene: SceneInterface) => {
  const scene = startScene
  const addList: AddInfo[] = []
  const removeList: RemoveInfo[] = []

  const context: Context = {
    scene,
    moveCheck,
    move,
    rules: getRules(scene),
    direction,
    allData,
  }
  function allData() {
    return allPositions().map(pos => {
      const data = getGameObject(pos)
      // 断言在合理位置上不可能出现无法查询到的对象
      if (data === undefined) throw new Error('错误的位置' + pos)
      return {
        position: pos,
        data,
      }
    })
  }
  function getGrid(pos: { x: number, y: number }) {
    return scene.getGrid(pos.x, pos.y)
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

  callback(context)
  return scene.newScene(removeList, addList)
}

export function moveAll(startScene: SceneInterface, control: Control, direction: Direction) {
  return compose(
    updateScene(control, direction, control.onFinalCheck),
    updateScene(control, direction, control.onStart),
  )(startScene)
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