type Vec = number[]
export enum TouchType {
  left,
  right,
  down,
  up,
  clockwise,
  anticlockwise,
}
type Callback = (type: TouchType) => void

function map<A, B, C>(transform: (a: A, b: B) => C) {
  return (a: A[], b: B[]) => a.map((v, i) => transform(v, b[i]))
}
const minus = (a: number, b: number) => a - b
const mult = (a: number, b: number) => a * b
const vMinus = map(minus)
const vMult = map(mult)
const add = (...args: number[]) => args.reduce((a, b) => a + b, 0)
const abs = Math.abs

// TODO: 注意这里有一个全局变量
const path: Vec[] = []
const callbackList: Callback[] = []
// let isEnabled = false

function enable() {
  window.addEventListener('touchmove', handleMove)
  window.addEventListener('touchend', handleEnd)
}
enable()


//********************* 后面都是函数了 *************************
export function addTouchListener(callback: Callback) {
  // if (!isEnabled) {
  //   isEnabled = true
  // }
  callbackList.push(callback)
}

export function removeTouchListener() {
  callbackList.length = 0
}

function handleMove(ev: TouchEvent) {
  const touch = ev.touches[0]
  const { clientX, clientY } = touch
  path.push([clientX, clientY])
}
function handleEnd(ev: TouchEvent) {
  handle(path)
  path.length = 0
}

function call(type: TouchType) {
  callbackList.forEach(f => f(type))
}

function handle(path: Vec[]) {
  if (path.length < 4) {
    return
  }
  const first = path[0]
  const center = path[Math.floor(path.length / 2)]
  const last = path[path.length - 1]

  const step1 = vMinus(center, first)
  const step2 = vMinus(last, center)

  // 判断夹角是否大于 90 (点积)
  if (add(...vMult(step1, step2)) > 0) {
    // console.log('移动')
    const [offsetX, offsetY] = vMinus(last, first)
    if (abs(offsetX) > abs(offsetY)) {
      // 左右为主
      if (offsetX > 0) {
        call(TouchType.right)
      } else {
        call(TouchType.left)
      }
    } else {
      // 上下为主
      if (offsetY > 0) {
        call(TouchType.down)
      } else {
        call(TouchType.up)
      }
    }
  } else {
    // console.log('旋转')
    if (isClockwise(path)) {
      call(TouchType.clockwise)
    } else {
      call(TouchType.anticlockwise)
    }
  }
}

function isClockwise(path: Vec[]): boolean {
  const base = path.reduce(map(add), [0, 0]).map(v => v / path.length)

  // 相邻两点叉积的和
  const crossResult = path.map((v, i) => {
    if (i === 0) {
      return 0
    }
    const [x1, y1] = vMinus(path[i - 1], base)
    const [x2, y2] = vMinus(v, base)
    return x1 * y2 - x2 * y1
  })
  const result = add(...crossResult)
  return result > 0
}
