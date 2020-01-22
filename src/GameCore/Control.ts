import { Control, Context, Direction, Position } from "./Interface";
import { getNextPosition } from "./move";


export function unionControl(...args: Control[]): Control {
  return {
    onStart(context: Context) {
      args.map(control => control.onStart(context))
    },
    onMoveCheck(context: Context, pos: Position, direction: Direction): boolean {
      for (const v of args) {
        if (!v.onMoveCheck(context, pos, direction)) {
          return false;
        }
      }
      // 其他
      return true
    },
    onMove(context: Context, pos: Position, direction: Direction): void {
      args.map(control => control.onMove(context, pos, direction))
    },
    onFinalCheck(context: Context): void {
      args.map(control => control.onFinalCheck(context))
    },
  }
}

export const defaultControl: Control = {
  onStart(context: Context) { },
  onMoveCheck(context: Context, pos: Position, direction: Direction): boolean {
    return true
  },
  onMove(context: Context, pos: Position, direction: Direction): void { },
  onFinalCheck(context: Context): void { },
}

export const youCanMove: Control = {
  ...defaultControl,
  onStart(context: Context) {
    const { rules, move, getPositions, direction } = context
    const youNames = Object.keys(rules).filter(k => rules[k].includes('you'))
    const youList = youNames.map(getPositions).reduce((a, b) => [...a, ...b])
    youList.map(you => move(you, direction))
  },
}

export const checkTheBound: Control = {
  ...defaultControl,
  onMoveCheck(context: Context, pos: Position, direction: Direction): boolean {
    // 边界位置校验
    const { scene } = context
    const nextPosition = getNextPosition(pos, direction)
    const { x, y } = nextPosition
    const { sizeX, sizeY } = scene.getSize()
    if (x < 0 || y < 0 || x >= sizeX || y >= sizeY) {
      return false
    }
    // 其他
    return true
  },
}

export const stopCheck: Control = {
  ...defaultControl,
  onMoveCheck(context, pos, direction) {
    const nextPos = getNextPosition(pos, direction)
    const positions = findPositionsWithRule(context, nextPos, 'stop')
    const isStop = positions && positions.length
    if (isStop) {
      return false
    }
    return true
  }
}

export const pushThings: Control = {
  ...defaultControl,
  onMoveCheck(context, pos, direction) {
    const { moveCheck } = context
    const nextPos = getNextPosition(pos, direction)
    const positions = findPositionsWithRule(context, nextPos, 'push');
    if (!positions) {
      return true;
    }
    return positions.every((pos) => moveCheck(pos, direction))
  },
  onMove(context, pos, direction) {
    const { move } = context
    const nextPos = getNextPosition(pos, direction)
    const positions = findPositionsWithRule(context, nextPos, 'push')
    positions.forEach(pos => move(pos, direction))
  }
}

// function ruleNameWithProp(rules: Rules, prop: string) {
//   return Object.keys(rules).filter(name => rules[name].includes(prop))
// }


function findPositionsWithRule(context: Context, pos: Position, rule: string): Position[] {
  const { getGrid, rules } = context
  const grid = getGrid(pos)
  if (!grid) {
    return []
  }
  const allObjs = grid.getAll()
  function getProp(objName: string): string[] {
    return rules[objName] || []
  }
  return allObjs.map((v, i) => ({ ...pos, z: i })).filter(pos => getProp(allObjs[pos.z].name).includes(rule))
}