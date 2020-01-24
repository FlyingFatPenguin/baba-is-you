import { Control, Context, Direction, Position, ObjectInfo, Rules } from "./Interface";
import { getNextPosition } from "./move";
import { intersect } from "./utils";


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

const havaProp = (rules: Rules, ruleName: string) =>
  (v: ObjectInfo) =>
    (rules[v.data.name] || []).includes(ruleName)

export const youCanMove: Control = {
  ...defaultControl,
  onStart(context: Context) {
    const { allData, move, direction, rules } = context
    allData().filter(havaProp(rules, 'you')).forEach(v => move(v.position, direction))
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
    return positions.every(pos => moveCheck(pos, direction))
  },
  onMove(context, pos, direction) {
    const { move } = context
    const nextPos = getNextPosition(pos, direction)
    const positions = findPositionsWithRule(context, nextPos, 'push')
    positions.forEach(pos => move(pos, direction))
  }
}

export function winBuilder(callback: () => void): Control {
  return {
    ...defaultControl,
    onFinalCheck(context) {
      const { allData, rules } = context
      const winList = allData().filter(havaProp(rules, 'win')).map(v => v.position)
      const youList = allData().filter(havaProp(rules, 'you')).map(v => v.position)
      if (intersect(youList, winList, (a, b) => a.x === b.x && a.y === b.y).length) { // 达到胜利条件
        // 这里使用异步是为了使得当前的判断结果运行结束
        // 使得画面不至于卡顿
        // 同时不至于结束事件
        setTimeout(callback, 0)
      }
    }
  }
}

// function ruleNameWithProp(rules: Rules, prop: string) {
//   return Object.keys(rules).filter(name => rules[name].includes(prop))
// }


function findPositionsWithRule(context: Context, pos: Position, rule: string): Position[] {
  const { allData, rules } = context
  return allData().filter(v => v.position.x === pos.x && v.position.y === pos.y)
    .filter(v => (rules[v.data.name] || []).includes(rule))
    .map(v => v.position)
}