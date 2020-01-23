import { getSentences, Sentence } from './Words'
import { SceneInterface, Rules, GameObjectInterface } from './Interface';
import { range } from './utils';

/**
 * 判断 obj 对象是否是文本
 * @param obj 目标对象
 */
function isText(obj: GameObjectInterface): boolean {
  return !!obj.isText
}

/**
 * 获取类型为文本的 obj 对象的文本内容
 * @param obj 
 */
function getTextObjContent(obj: GameObjectInterface): string {
  return obj.name
}

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

export function getRules(scene: SceneInterface): Rules {
  const sentenceList = getSentencesFromScene(scene)
  console.log(sentenceList)
  return findRuleInSentences(sentenceList)
  // return {
  //   baba: ['you'],
  //   lava: ['you'],
  //   wall: ['stop'],
  //   box: ['push'],
  //   rock: ['push'],
  //   flag: ['win'],
  // }
}