export interface Position {
  x: number,
  y: number,
  z: number
}
export interface Rules {
  [name: string]: string[]
}
// export type GridPosition = {
//   x: number,
//   y: number
// }

export interface ObjectInfo {
  data: GameObjectInterface
  position: Position
}

export interface Context {
  scene: SceneInterface,
  rules: Rules
  direction: Direction
  move: (pos: Position, direction: Direction) => void
  moveCheck: (pos: Position, direction: Direction) => boolean
  addObj(pos: Position, obj: GameObjectInterface): void
  removeObj(pos: Position): void
}

export interface MoveConfig {
  onMoveCheck(context: Context, pos: Position, direction: Direction): boolean
  onMove(context: Context, pos: Position, direction: Direction): void
}

export interface Control extends MoveConfig {
  onStart(context: Context): void
  onFinalCheck(context: Context): void
}

export interface SceneInterface {
  getSize(): { sizeX: number, sizeY: number }
  getGrid(x: number, y: number): GridInterface
  newScene(removeList: RemoveInfo[], addList: AddInfo[]): SceneInterface
}

export type GridInterface = GameObjectInterface[]

export interface GameObjectInterface {
  name: string
  content?: string
  direction?: Direction,
}

export enum Direction {
  left,
  right,
  up,
  down,
}

export type RemoveInfo = Position
export type AddInfo = { pos: Position, obj: GameObjectInterface }


export type GameMap = GameObjectInterface[][][]