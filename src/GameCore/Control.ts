import { Control, Context, Direction, Position, Rules } from "./Interface";
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
    const { rules, getGrid } = context
    const nextPos = getNextPosition(pos, direction)
    const grid = getGrid(nextPos)
    if (!grid) {
      return false;
    }
    const nameList = grid.getAll().map(v => v.name)
    const isStop = nameList.filter(name => rules[name].includes('stop')).length
    if (isStop) {
      return false
    }
    return true
  }
}

export const pushThings: Control = {
  ...defaultControl,
  onMoveCheck(context, pos, direction) {
    const { getGrid, rules, moveCheck } = context
    const nextPos = getNextPosition(pos, direction)
    const nextGrid = getGrid(nextPos)
    const nextObjs = nextGrid && nextGrid.getAll()
    if (!nextObjs) {
      return false
    }
    const canPushRuleNames = ruleNameWithProp(rules, 'push')
    // 所有下一个方格中的可 push 对象都可以移动, 则当前节点可以移动
    return nextObjs
      .filter(obj => canPushRuleNames.includes(obj.name))
      .every((obj, index) => moveCheck({ ...nextPos, z: index }, direction))
  },
  onMove(context, pos, direction) {
    const { getGrid, rules, move } = context
    const nextPos = getNextPosition(pos, direction)
    const nextGrid = getGrid(nextPos)
    const nextObjs = nextGrid && nextGrid.getAll()
    if (!nextObjs) {
      return false
    }
    const canPushRuleNames = ruleNameWithProp(rules, 'push')
    // 所有下一个方格中的可 push 对象都可以移动, 则当前节点可以移动
    nextObjs
      .filter(obj => canPushRuleNames.includes(obj.name))
      .forEach((obj, index) => move({ ...nextPos, z: index }, direction))
  }
}

function ruleNameWithProp(rules: Rules, prop: string) {
  return Object.keys(rules).filter(name => rules[name].includes(prop))
}