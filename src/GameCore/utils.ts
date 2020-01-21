export function range(start: number, end: number | undefined = undefined) {
  // when there is only one parameter
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result;
}

export function deepClone<T>(source: T): T {
  const targetObj: any = Array.isArray(source) ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if ((<any>source).hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = Array.isArray(source[keys]) ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/**
 * 将 str 补全为长度为 len 的字符串
 * 补全使用 char ,并在前方补全
 * 如果 str 本身长度超过了 len
 * 就截断到目标长度
 * @param str 目标字符串
 * @param len 补全后的长度
 * @param char 补全使用的字符
 */
export function fill(str: string, len: number, char = ' ') {
  const strLen = str.length;
  if (strLen >= len) {
    return str.substring(0, len)
  } else {
    return char.repeat(len - strLen) + str
  }
}