import {
  Control,
  Context,
  Direction,
  Position,
  ObjectInfo,
  Rules,
} from "../interface/Interface";
import { getNextPosition, negativeDirection } from "./move";
import { intersect } from "../utils/utils";
import {
  allGrid,
  transfrom,
  findPositionsWithRule,
  allData,
  isOut
} from "./ControlHelper";


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
    const { scene, move, direction, rules } = context
    allData(scene).filter(havaProp(rules, 'you')).forEach(v => move(v.position, direction))
  },
}

export const checkTheBound: Control = {
  ...defaultControl,
  onMoveCheck(context: Context, pos: Position, direction: Direction): boolean {
    // 边界位置校验
    const { scene } = context
    const nextPosition = getNextPosition(pos, direction)
    return !isOut(scene, nextPosition)
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
      const { rules, scene } = context
      const winList = allData(scene).filter(havaProp(rules, 'win')).map(v => v.position)
      const youList = allData(scene).filter(havaProp(rules, 'you')).map(v => v.position)
      if (intersect(youList, winList, (a, b) => a.x === b.x && a.y === b.y).length) { // 达到胜利条件
        callback()
      }
    }
  }
}

// function ruleNameWithProp(rules: Rules, prop: string) {
//   return Object.keys(rules).filter(name => rules[name].includes(prop))
// }
export const transformControl: (nounNames: string[]) => Control = (nounNames) => ({
  ...defaultControl,
  onFinalCheck(context: Context) {
    const { rules } = context
    for (let name of nounNames) {
      const result = (rules[name] || []).filter(v => nounNames.includes(v))
      result.length && transfrom(context, name, result)
    }
  }
})

export const sinkControl: Control = {
  ...defaultControl,
  onFinalCheck(context: Context) {
    const { rules, scene, removeObj } = context
    allGrid(scene).forEach(objInfos => {
      // 将 x, y 坐标相同的元素分类
      const sinkList = objInfos.filter(havaProp(rules, 'sink'))
      const canSinkList = objInfos.filter(v => !havaProp(rules, 'sink')(v))

      // 每一个 sink 将和一个 canSink 共同湮灭
      for (let i in sinkList) {
        const sink = sinkList[i]
        const canSink = canSinkList[i]

        if (sink && canSink) {
          removeObj(sink.position)
          removeObj(canSink.position)
        }
      }
    })
  }
}

export const defeatControl: Control = {
  ...defaultControl,
  onFinalCheck(context: Context) {
    const { scene, rules, removeObj } = context
    allGrid(scene).forEach(objInfos => {
      // 将 x, y 坐标相同的元素分类
      const youList = objInfos.filter(havaProp(rules, 'you'))
      const defeatList = objInfos.filter(havaProp(rules, 'defeat'))

      // 每一个 sink 将和一个 canSink 共同湮灭
      if (defeatList.length) {
        youList.forEach(objInfo => removeObj(objInfo.position))
      }
    })
  }
}

export const meltHotControl: Control = {
  ...defaultControl,
  onFinalCheck(context: Context) {
    const { rules, scene, removeObj } = context
    allGrid(scene).forEach(objInfos => {
      // 将 x, y 坐标相同的元素分类
      const meltList = objInfos.filter(havaProp(rules, 'melt'))
      const hotList = objInfos.filter(havaProp(rules, 'hot'))

      // 每一个 sink 将和一个 canSink 共同湮灭
      if (hotList.length) {
        meltList.forEach(objInfo => removeObj(objInfo.position))
      }
    })
  }
}

export const moveControl: Control = {
  ...defaultControl,
  onStart(context: Context) {
    const { scene, move, rules, moveCheck } = context
    allData(scene).filter(havaProp(rules, 'move'))
      .forEach(v => {
        const direction = v.data.direction
        const pos = v.position
        if (!moveCheck(pos, direction)) {
          move(pos, negativeDirection(direction))
        } else {
          move(pos, direction)
        }
      })
  }
}