interface ParserResult {
  len: number,
}

type Word = string

type Parser = (wordList: Word[]) => ParserResult | undefined | false

const constant: (value: Word) => Parser =
  v => wordList => (
    wordList[0] === v) && {
    len: 1,
  }

const or: (...parserList: Parser[]) => Parser =
  (...parserList) => wordList => {
    for (let parser of parserList) {
      const result = parser(wordList)
      if (result) {
        return result
      }
    }
  }

const not: (...values: Word[]) => Parser =
  (...values) => wordList =>
    values.every(v => v !== wordList[0]) && { len: 1 }

/////////////
// 从前向后匹配
const seq: (...parserList: Parser[]) => Parser =
  (...parserList) => wordList => {
    let offset = 0;
    const result: ParserResult[] = []
    for (let parser of parserList) {
      const data = parser(wordList.slice(offset))
      if (data) {
        result.push(data)
        offset += data.len
      } else {
        return
      }
    }
    return {
      len: result.map(v => v.len).reduce((a, b) => a + b, 0)
    }
  }

const infinty: (parser: Parser) => Parser =
  parser => wordList => {
    let offset = 0;
    const result: ParserResult[] = []
    while (true) {
      const data = parser(wordList.slice(offset))
      if (data && data.len) {
        result.push(data)
        offset += data.len
      } else {
        return {
          len: result.map(v => v.len).reduce((a, b) => a + b, 0)
        }
      }
    }
  }

const interval: (word: Parser, intervalToken: Parser) => Parser =
  (word, intervalToken) => seq(word, infinty(seq(intervalToken, word)))

//////////////////////////
// 从后向前尽可能匹配

// const seqShift: (...parserList: Parser[]) => Parser =
//   (...parserList) => wordList =>
//     seq(...parserList.reverse())([...wordList].reverse())

// const infintyShift: (parser: Parser) => Parser =
//   parser => wordList => infinty(parser)([...wordList].reverse())

const intervalShift: (word: Parser, intervalToken: Parser) => Parser =
  (word, intervalToken) => wordList =>
    interval(word, intervalToken)([...wordList].reverse())

function parsersbuilder(nounNames?: Word[], adjNames?: Word[]) {
  const KEY_WORDS = ['is', 'and', 'on']
  const noun = nounNames ? or(...nounNames.map(constant)) : not(...KEY_WORDS)
  const adj = adjNames ? or(...adjNames.map(constant)) : not(...KEY_WORDS)
  const AND = constant('and')
  const subject = intervalShift(noun, AND)
  const predicative = interval(or(noun, adj), AND)

  const getSubjectWords = (words: Word[]) => {
    const result = subject(words)
    if (result) {
      return words.slice(-result.len)
    } else {
      return []
    }
  }
  const getPredicativeWords = (words: Word[]) => {
    const result = predicative(words)
    if (result) {
      return words.slice(0, result.len)
    } else {
      return []
    }
  }
  return {
    getSubjectWords,
    getPredicativeWords,
  }
}

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

/**
 * 处理没有修饰语的规则
 * 如: baba is you
 * 有修饰语,如:
 * baba on text is you
 * @param noun 可作为主语或谓语的词
 * @param adj 只可以作为谓语的词
 */
const simpleParserBuilder = (noun?: Word[], adj?: Word[]) => (sentence: Word[]) => {
  const { getSubjectWords, getPredicativeWords } = parsersbuilder(noun, adj)

  const blockList = split(sentence, 'is')
  const result: { [name: string]: string[] } = {}

  function foreach2<T, U>(arr: T[], callback: (a: T, b: T) => U): U[] {
    const result = []
    for (let i = 0; i < arr.length - 1; i++) {
      const value = arr[i]
      const nextValue = arr[i + 1]
      result.push(callback(value, nextValue))
    }
    return result;
  }
  foreach2(blockList, (a, b) => {
    const sub = getSubjectWords(a)
    const pred = getPredicativeWords(b)
    const subItems = split(sub, 'and')
    const predItems = split(pred, 'and')

    const singleSubNames = subItems
      .filter(v => v.length === 1).map(v => v[0])
    const singlePredNames = predItems
      .filter(v => v.length === 1).map(v => v[0])
    for (let sub of singleSubNames) {
      result[sub] = [...(result[sub] || []), ...singlePredNames]
    }
  })
  return result;
}

export const simpleParser = simpleParserBuilder()

// const { getSubjectWords } = parsersbuilder(['you'], [])
// console.log(getSubjectWords('I and you'.split(' ')))