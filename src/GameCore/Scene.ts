import {
  SceneInterface,
  GridInterface,
  RemoveInfo,
  AddInfo,
  Position
} from './Interface'
import { GameMap } from './Interface';
import { deepClone } from './utils';

class Scene implements SceneInterface {
  _data: GameMap

  constructor(data: GameMap) {
    this._data = deepClone(data)
  }

  getSize(): { sizeX: number; sizeY: number; } {
    const data = this._data
    const sizeY = data.length;
    // FIXME: 可能计算错误或者抛出异常
    const sizeX = data[0] ? data[0].length : 0;
    return { sizeX, sizeY }
  }

  getGrid(x: number, y: number): GridInterface | undefined {
    const data = this._data
    const line = data[y]
    const current = line && line[x]
    if (current) {
      return {
        get(index: number) {
          return current[index]
        },
        getAll() {
          return current
        }
      }
    }
  }
  newScene(removeList: RemoveInfo[], addList: AddInfo[]): SceneInterface {
    const cloneData = deepClone(this._data)
    const newData = cloneData.map((line, y) => line.map((grid, x) => {
      const removeIndexList = getMatchPosition(removeList, x, y).map(pos => pos.z)
      return [
        // 原来剩下的部分
        ...grid.filter((v, index) => !removeIndexList.includes(index)),
        // 新加入的部分
        ...addList.filter(addInfo => {
          const pos = addInfo.pos
          return pos.x === x && pos.y === y
        }).map(addInfo => addInfo.obj)
      ]
    }))

    function getMatchPosition(posList: Position[], x: number, y: number): Position[] {
      return posList.filter(pos => pos.x === x && pos.y === y)
    }

    return new Scene(newData)
  }
}

export default Scene;