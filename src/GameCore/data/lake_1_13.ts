import { LevelInfo, GameMap, Direction } from "../interface/Interface";
import { mapBuilder, text, objects } from "./MapHelper";

export const lake1: GameMap = mapBuilder(28, 16)
  .setLine({ x: 0, y: 0 }, [[text.flag], [text.is], [text.win]])
  .setArea({ x: 3, y: 0 }, { x: 5, y: 0 }, () => [objects.ice])
  .setArea({ x: 0, y: 1 }, { x: 3, y: 1 }, () => [objects.ice])
  .setArea({ x: 0, y: 2 }, { x: 1, y: 2 }, () => [objects.ice])
  .setArea({ x: 0, y: 3 }, { x: 0, y: 3 }, () => [objects.ice])
  .setArea({ x: 5, y: 3 }, { x: 9, y: 7 }, () => [objects.wall])
  .setArea({ x: 6, y: 4 }, { x: 8, y: 6 }, () => [])
  .setPos({ x: 7, y: 7 }, () => [])
  .setPos({ x: 7, y: 5 }, () => [objects.baba])
  .setArea({ x: 8, y: 10 }, { x: 11, y: 10 }, () => [objects.wall])
  .setArea({ x: 5, y: 12 }, { x: 11, y: 12 }, () => [objects.wall])
  .setLine({ x: 8, y: 11 }, [[text.baba], [text.is], [text.you], [text.and], [text.sink]])
  .setPos({ x: 5, y: 11 }, () => [objects.wall])
  .setPos({ x: 13, y: 11 }, () => [objects.wall])
  .setArea({ x: 0, y: 13 }, { x: 0, y: 13 }, () => [objects.ice])
  .setArea({ x: 0, y: 14 }, { x: 1, y: 14 }, () => [objects.ice])
  .setArea({ x: 0, y: 15 }, { x: 4, y: 15 }, () => [objects.ice])
  .setPos({ x: 6, y: 15 }, () => [objects.ice])
  .setPos({ x: 11, y: 15 }, () => [objects.ice])
  .setArea({ x: 11, y: 0 }, { x: 11, y: 0 }, () => [objects.ice])
  .setArea({ x: 12, y: 0 }, { x: 12, y: 1 }, () => [objects.ice])
  .setArea({ x: 13, y: 0 }, { x: 13, y: 3 }, () => [objects.ice])
  .setArea({ x: 14, y: 1 }, { x: 14, y: 6 }, () => [objects.ice])
  .setArea({ x: 15, y: 1 }, { x: 15, y: 9 }, () => [objects.ice])
  .setArea({ x: 16, y: 0 }, { x: 16, y: 10 }, () => [objects.ice])
  .setArea({ x: 17, y: 0 }, { x: 17, y: 11 }, () => [objects.ice])
  .setArea({ x: 18, y: 1 }, { x: 18, y: 12 }, () => [objects.ice])
  .setArea({ x: 19, y: 2 }, { x: 19, y: 13 }, () => [objects.ice])
  .setArea({ x: 20, y: 3 }, { x: 20, y: 14 }, () => [objects.ice])
  .setArea({ x: 21, y: 5 }, { x: 21, y: 15 }, () => [objects.ice])
  .setArea({ x: 22, y: 7 }, { x: 22, y: 15 }, () => [objects.ice])
  .setArea({ x: 23, y: 8 }, { x: 23, y: 15 }, () => [objects.ice])
  .setArea({ x: 24, y: 10 }, { x: 24, y: 15 }, () => [objects.ice])
  .setArea({ x: 25, y: 11 }, { x: 25, y: 15 }, () => [objects.ice])
  .setArea({ x: 26, y: 14 }, { x: 26, y: 15 }, () => [objects.ice])
  .setArea({ x: 16, y: 6 }, { x: 20, y: 8 }, () => [])
  .setArea({ x: 17, y: 5 }, { x: 19, y: 9 }, () => [])
  .setLine({ x: 25, y: 15 }, [[text.wall], [text.is], [text.stop]])
  .setLine({ x: 18, y: 7 }, [[text.wall]])
  .setArea({ x: 22, y: 3 }, { x: 26, y: 5 }, () => [objects.jelly])
  .setArea({ x: 23, y: 2 }, { x: 25, y: 6 }, () => [objects.jelly])
  .setArea({ x: 24, y: 3 }, { x: 24, y: 5 }, () => [])
  .setArea({ x: 23, y: 4 }, { x: 25, y: 4 }, () => [])
  .setPos({ x: 24, y: 4 }, () => [objects.flag])
  .setLine({ x: 25, y: 0 }, [[text.jelly], [text.is], [text.sink]])
  .build()

export const lake2: GameMap = mapBuilder(28, 16)
  .setArea({ x: 4, y: 3 }, { x: 8, y: 9 }, () => [objects.wall])
  .setArea({ x: 5, y: 2 }, { x: 20, y: 12 }, () => [objects.wall])
  .setArea({ x: 9, y: 3 }, { x: 19, y: 11 }, () => [])
  .setArea({ x: 5, y: 4 }, { x: 7, y: 8 }, () => [])
  .setArea({ x: 8, y: 5 }, { x: 10, y: 7 }, () => [objects.wall])
  .setArea({ x: 8, y: 6 }, { x: 10, y: 6 }, () => [])
  .setArea({ x: 21, y: 6 }, { x: 25, y: 10 }, () => [objects.wall])
  .setArea({ x: 20, y: 7 }, { x: 22, y: 7 }, () => [])
  .setArea({ x: 22, y: 8 }, { x: 24, y: 8 }, () => [])
  .setArea({ x: 24, y: 7 }, { x: 24, y: 9 }, () => [])
  .setPos({ x: 22, y: 9 }, () => [])
  .setPos({ x: 2, y: 6 }, () => [objects.crab])
  .setPos({ x: 6, y: 6 }, () => [text.crab])
  .setLine({ x: 5, y: 2 }, [[text.skull], [text.is], [text.defeat]])
  .setLine({ x: 6, y: 9 }, [[text.baba], [text.is], [text.you]], true)
  .setPos({ x: 23, y: 8 }, () => [objects.baba])
  .setPos({ x: 21, y: 7 }, () => [objects.rock])
  .setPos({ x: 3, y: 11 }, () => [objects.flag])
  .setPos({ x: 8, y: 6 }, () => [objects.skull])
  .setPos({ x: 10, y: 6 }, () => [objects.star])
  .setLine({ x: 2, y: 13 }, [[text.flag], [text.is], [text.win]])
  .setLine({ x: 21, y: 5 }, [[text.wall], [text.is], [text.stop]])
  .setLine({ x: 13, y: 5 }, [[text.star], [text.is], [text.sink]])
  .setLine({ x: 13, y: 7 }, [[text.rock], [text.is], [text.push]])
  .setPos({ x: 13, y: 9 }, () => [objects.rock])
  .setPos({ x: 15, y: 9 }, () => [text.and])
  .build()

export const lake3: GameMap = mapBuilder(24, 14)
  .setLine({ x: 0, y: 0 }, [[text.algae], [text.is], [text.defeat]])
  .setLine({ x: 0, y: 11 }, [[text.love], [text.is], [text.win]], true)
  .setLine({ x: 21, y: 13 }, [[text.baba], [text.is], [text.you]])
  .setPos({ x: 3, y: 9 }, () => [objects.baba])
  .setLine({ x: 9, y: 9 }, [[text.love], [text.is], [text.push]])
  .setLine({ x: 9, y: 5 }, [[text.keke], [text.is], [text.move]])
  .setArea({ x: 14, y: 5 }, { x: 18, y: 9 }, () => [objects.algae])
  .setArea({ x: 15, y: 6 }, { x: 17, y: 8 }, () => [])
  .setPos({ x: 16, y: 7 }, () => [objects.love])
  .setPos({ x: 6, y: 3 }, () => [{ ...objects.keke, direction: Direction.right }])
  .setPos({ x: 7, y: 7 }, () => [{ ...objects.keke, direction: Direction.up }])
  .setPos({ x: 12, y: 10 }, () => [{ ...objects.keke, direction: Direction.down }])
  .build()

export const lake4: GameMap = mapBuilder(24, 14)
  .setLine({ x: 0, y: 0 }, [[text.flag], [text.is], [text.win]])
  .setLine({ x: 5, y: 2 }, [[text.pillar], [text.is], [text.push]])
  .setLine({ x: 0, y: 6 }, [[text.wall], [text.is], [text.stop]], true)
  .setLine({ x: 5, y: 12 }, [[text.baba], [text.is], [text.you]])
  .setLine({ x: 21, y: 13 }, [[text.star], [text.is], [text.defeat]])
  .setPos({ x: 1, y: 1 }, () => [objects.algae])
  .setArea({ x: 4, y: 5 }, { x: 8, y: 9 }, () => [objects.wall])
  .setArea({ x: 5, y: 6 }, { x: 7, y: 8 }, () => [])
  .setPos({ x: 6, y: 7 }, () => [objects.baba])
  .setArea({ x: 15, y: 5 }, { x: 19, y: 9 }, () => [objects.star])
  .setArea({ x: 16, y: 6 }, { x: 18, y: 8 }, () => [])
  .setPos({ x: 17, y: 7 }, () => [objects.flag])
  .setPos({ x: 10, y: 2 }, () => [objects.pillar])
  .setPos({ x: 12, y: 3 }, () => [objects.pillar])
  .setPos({ x: 11, y: 11 }, () => [objects.pillar])
  .setPos({ x: 17, y: 12 }, () => [objects.pillar])
  .setPos({ x: 8, y: 7 }, () => [objects.pillar])
  .setPos({ x: 18, y: 1 }, () => [objects.pillar])
  .setPos({ x: 1, y: 11 }, () => [objects.algae])
  .setPos({ x: 10, y: 8 }, () => [objects.algae])
  .setPos({ x: 14, y: 13 }, () => [objects.algae])
  .setPos({ x: 15, y: 12 }, () => [objects.algae])
  .setPos({ x: 19, y: 12 }, () => [objects.algae])
  .setPos({ x: 20, y: 8 }, () => [objects.algae])
  .setPos({ x: 16, y: 1 }, () => [objects.algae])
  .setPos({ x: 17, y: 2 }, () => [objects.algae])
  .setPos({ x: 20, y: 3 }, () => [objects.algae])
  .setPos({ x: 22, y: 1 }, () => [objects.algae])
  .build()

export const lake5: GameMap = mapBuilder(15, 8)
  .setLine({ x: 4, y: 2 }, [[text.baba], [text.is], [text.you]])
  .setLine({ x: 4, y: 5 }, [[text.flag], [text.is], [text.win]])
  .setArea({ x: 9, y: 2 }, { x: 14, y: 6 }, () => [objects.wall])
  .setArea({ x: 10, y: 3 }, { x: 12, y: 5 }, () => [])
  .setLine({ x: 14, y: 3 }, [[text.wall], [text.is], [text.stop]], true)
  .setPos({ x: 1, y: 4 }, () => [objects.baba])
  .setPos({ x: 11, y: 4 }, () => [objects.flag])
  .setPos({ x: 1, y: 0 }, () => [objects.algae])
  .setPos({ x: 0, y: 1 }, () => [objects.algae])
  .setPos({ x: 2, y: 7 }, () => [objects.algae])
  .setPos({ x: 12, y: 7 }, () => [objects.algae])
  .setPos({ x: 13, y: 0 }, () => [objects.algae])
  .build()

export const allLevel: LevelInfo[] = [
  { gameMap: lake1, levelName: 'Icy waters' },
  { gameMap: lake2, levelName: 'Turns' },
  { gameMap: lake3, levelName: 'Affection' },
  { gameMap: lake4, levelName: 'Pillar yard' },
  { gameMap: lake5, levelName: 'Brick wall' }
]