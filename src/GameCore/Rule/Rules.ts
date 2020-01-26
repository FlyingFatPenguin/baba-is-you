import { getSentences, Sentence } from './Words'
import { SceneInterface, Rules } from '../interface/Interface';
import { range } from '../utils/utils';
import { isText, getTextObjContent } from '../interface/GameObjectInterface';
import { simpleParser } from './Parser';

function getSentencesFromScene(scene: SceneInterface) {
  const { sizeX, sizeY } = scene.getSize()
  const textTable = range(sizeY).map(() => Array(sizeX).fill(undefined))
  for (let y of range(sizeY)) {
    for (let x of range(sizeX)) {
      const grid = scene.getGrid(x, y)
      const name = grid && grid.getAll().filter(isText).map(getTextObjContent)[0]
      name && (textTable[y][x] = name)
    }
  }
  return getSentences(textTable)
}

function findRuleInSentences(sentences: Sentence[]) {
  const emptyList: Rules = {}
  const result = sentences
    // 判断该句子为主系表结构
    .filter(sentence => sentence.length === 3 && sentence[1] === 'is')
    // 将主语作为键, 表语作为值
    .reduce((p, [subject, _, predicative]) => {
      if (subject !== undefined && predicative !== undefined) {
        if (!(subject in p)) {
          p[subject] = []
        }
        p[subject].push(predicative)
      }
      return p
    }, emptyList)

  return result
}

type ArrayMap<T> = { [key: string]: T[] }
/**
 * 将对象列表按照 key 合并, 值加入到同一个列表中
 * @param objList 
 * @example
 * union({
 *  a:[1],
 * },
 * {
 *  a:[2],
 *  b:[3],
 * }) // {a:[1,2],b:[3]}
 */
function union<T>(...objList: ArrayMap<T>[]): ArrayMap<T> {
  return objList.reduce((data, obj) => {
    Object.keys(obj).reduce((p, key) => {
      if (!Array.isArray(p[key])) {
        p[key] = []
      }
      p[key] = [...p[key], ...obj[key]]
      return p;
    }, data)
    return data;
  }, {})
}

export function getRules(scene: SceneInterface): Rules {
  const sentenceList = getSentencesFromScene(scene)
  const defaultRules = {
    text: ['push'],
  }
  const result = sentenceList
    .map(simpleParser)
    .reduce((a, b) => union(a, b), defaultRules)
  return result;
}