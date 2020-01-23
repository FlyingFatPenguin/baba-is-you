import { GameObjectInterface } from "./Interface"

/**
 * 判断 obj 对象是否是文本
 * @param obj 目标对象
 */
export function isText(obj: GameObjectInterface): boolean {
  return obj.name === 'text'
}

/**
 * 获取类型为文本的 obj 对象的文本内容
 * @param obj 
 */
export function getTextObjContent(obj: GameObjectInterface): string {
  return obj.content || ''
}