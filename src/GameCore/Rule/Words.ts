type Word = string | undefined
export type Sentence = string[]

function equals<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function uniq<T>(arr: T[]): T[] {
  const result: T[] = []
  return arr.reduce((p, v) => {
    p.filter(c => equals(c, v)).length === 0 && p.push(v)
    return p
  }, result)
}

export function getSentences(textTable: Word[][]) {
  const sentences = [...textTable.map(ruleInLine), ...zip(...textTable).map(ruleInLine)]
  return uniq(flatten(sentences))
}

function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((p, v) => [...p, ...v], [])
}

function zip<T>(...args: T[][]): T[][] {
  return args[0].map((v, i) => args.map(v => v[i]))
}
/**
 * 将 列表中的内容按照
 * @param textLine 
 * @example
 * const result = ruleInLine(['this', 'is', undefined, undefined, 'a', 'penguin'])
 * console.log(result) // [ [ 'this', 'is' ], [ 'a', 'penguin' ] ]
 */
function ruleInLine(textLine: Word[]): Sentence[] {
  /**
   * 按照 token 分割 textLine
   * @example
   * split(['a','b','b']) // [['a'], []]
   * @param textLine 
   * @param token 
   */
  function split(textLine: Word[], token: Word): Word[][] {
    const index = textLine.indexOf(token)
    if (index === -1) {
      return [textLine]
    }
    return [
      textLine.slice(0, index),
      ...split(textLine.slice(index + 1), token)
    ]
  }
  // 将 undefined 作为分割符后
  // 剩余的内容必然是没有 undefined 的
  return split(textLine, undefined).filter(v => v.length) as any
}