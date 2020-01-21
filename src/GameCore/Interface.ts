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

export interface Context {
  scene: SceneInterface,
  move: (pos: Position, direction: Direction) => void
  moveCheck: (pos: Position, direction: Direction) => boolean
  getPositions(name: string): Position[]
  rules: Rules,
  direction: Direction
  getGrid(pos: Position): GridInterface | undefined
}
export interface Control {
  onStart(context: Context): void
  onMoveCheck(context: Context, pos: Position, direction: Direction): boolean
  onMove(context: Context, pos: Position, direction: Direction): void
  onFinalCheck(context: Context): void
}

export interface SceneInterface {
  getSize(): { sizeX: number, sizeY: number }
  getGrid(x: number, y: number): GridInterface | undefined
  newScene(removeList: RemoveInfo[], addList: AddInfo[]): SceneInterface
}

export interface GridInterface {
  get(index: number): GameObjectInterface | undefined
  getAll(): GameObjectInterface[]
}

export interface GameObjectInterface {
  name: string
  isText?: boolean
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