import { GameMap } from "../interface/Interface";
import { buildText, mapBuilder } from "./MapHelper";

const wall = { name: 'wall' }
const rock = { name: 'rock' }
const baba = { name: 'baba' }
const flag = { name: 'flag' }
const water = { name: 'water' }
const skull = { name: 'skull' }

const text = {
  baba: buildText('baba'),
  is: buildText('is'),
  you: buildText('you'),
  wall: buildText('wall'),
  stop: buildText('stop'),
  rock: buildText('rock'),
  push: buildText('push'),
  flag: buildText('flag'),
  win: buildText('win'),
  water: buildText('water'),
  sink: buildText('sink'),
  skull: buildText('skull'),
  defeat: buildText('defeat'),
}

export const level0: GameMap = mapBuilder(17, 17)
  .setViewPos({ x: 1, y: 3 })
  .setArea({ x: 2, y: 4 }, { x: 12, y: 4 }, () => [wall])
  .setArea({ x: 2, y: 8 }, { x: 12, y: 8 }, () => [wall])
  .setArea({ x: 7, y: 5 }, { x: 7, y: 7 }, () => [rock])
  .setPos({ x: 3, y: 6 }, () => [baba])
  .setPos({ x: 11, y: 6 }, () => [flag])
  .setPos({ x: 2, y: 2 }, () => ([text.baba]))
  .setPos({ x: 3, y: 2 }, () => ([text.is]))
  .setPos({ x: 4, y: 2 }, () => ([text.you]))
  .setPos({ x: 2, y: 10 }, () => ([text.wall]))
  .setPos({ x: 3, y: 10 }, () => ([text.is]))
  .setPos({ x: 4, y: 10 }, () => ([text.stop]))
  .setPos({ x: 10, y: 2 }, () => ([text.flag]))
  .setPos({ x: 11, y: 2 }, () => ([text.is]))
  .setPos({ x: 12, y: 2 }, () => ([text.win]))
  .setPos({ x: 10, y: 10 }, () => ([text.rock]))
  .setPos({ x: 11, y: 10 }, () => ([text.is]))
  .setPos({ x: 12, y: 10 }, () => ([text.push]))
  .build()

export const level1: GameMap = mapBuilder(22, 17)
  .setArea({ x: 4, y: 5 }, { x: 4, y: 9 }, () => [wall])
  .setArea({ x: 5, y: 5 }, { x: 8, y: 5 }, () => [wall])
  .setArea({ x: 5, y: 9 }, { x: 15, y: 9 }, () => [wall])
  .setArea({ x: 8, y: 1 }, { x: 8, y: 5 }, () => [wall])
  .setArea({ x: 9, y: 1 }, { x: 16, y: 1 }, () => [wall])
  .setArea({ x: 8, y: 9 }, { x: 8, y: 15 }, () => [wall])
  .setArea({ x: 16, y: 2 }, { x: 16, y: 15 }, () => [wall])
  .setArea({ x: 9, y: 15 }, { x: 15, y: 15 }, () => [wall])
  .setPos({ x: 14, y: 12 }, () => [baba])
  .setPos({ x: 10, y: 7 }, () => [flag])
  .setPos({ x: 10, y: 11 }, () => [text.wall])
  .setPos({ x: 10, y: 12 }, () => [text.is])
  .setPos({ x: 10, y: 13 }, () => [text.stop])
  .setPos({ x: 14, y: 5 }, () => [text.win])
  .setPos({ x: 10, y: 3 }, () => [text.is])
  .setPos({ x: 6, y: 7 }, () => [text.flag])
  .setPos({ x: 5, y: 11 }, () => [text.baba])
  .setPos({ x: 5, y: 12 }, () => [text.is])
  .setPos({ x: 5, y: 13 }, () => [text.you])
  .build()

export const level2: GameMap = mapBuilder(22, 17)
  .setArea({ x: 4, y: 5 }, { x: 4, y: 9 }, () => [flag])
  .setArea({ x: 5, y: 5 }, { x: 8, y: 5 }, () => [flag])
  .setArea({ x: 5, y: 9 }, { x: 15, y: 9 }, () => [flag])
  .setArea({ x: 8, y: 1 }, { x: 8, y: 5 }, () => [flag])
  .setArea({ x: 9, y: 1 }, { x: 16, y: 1 }, () => [flag])
  .setArea({ x: 8, y: 9 }, { x: 8, y: 15 }, () => [flag])
  .setArea({ x: 16, y: 2 }, { x: 16, y: 15 }, () => [flag])
  .setArea({ x: 9, y: 15 }, { x: 15, y: 15 }, () => [flag])
  .setPos({ x: 14, y: 12 }, () => [wall])
  .setPos({ x: 10, y: 11 }, () => [text.flag])
  .setPos({ x: 10, y: 12 }, () => [text.is])
  .setPos({ x: 10, y: 13 }, () => [text.stop])
  .setPos({ x: 14, y: 5 }, () => [text.win])
  .setPos({ x: 10, y: 3 }, () => [text.is])
  .setPos({ x: 6, y: 7 }, () => [text.baba])
  .setPos({ x: 5, y: 11 }, () => [text.wall])
  .setPos({ x: 5, y: 12 }, () => [text.is])
  .setPos({ x: 5, y: 13 }, () => [text.you])
  .build()

export const level3: GameMap = mapBuilder(22, 16)
  .setArea({ x: 2, y: 0 }, { x: 2, y: 2 }, () => [wall])
  .setArea({ x: 0, y: 3 }, { x: 2, y: 3 }, () => [wall])
  .setArea({ x: 7, y: 1 }, { x: 14, y: 7 }, () => [wall])
  .setArea({ x: 8, y: 2 }, { x: 13, y: 6 }, () => [])
  .setArea({ x: 4, y: 7 }, { x: 17, y: 14 }, () => [wall])
  .setArea({ x: 5, y: 8 }, { x: 16, y: 13 }, () => [])
  .setArea({ x: 8, y: 7 }, { x: 10, y: 7 }, () => [water])
  .setArea({ x: 5, y: 11 }, { x: 7, y: 13 }, () => [water])
  .setArea({ x: 11, y: 8 }, { x: 11, y: 10 }, () => [wall])
  .setArea({ x: 11, y: 12 }, { x: 11, y: 13 }, () => [wall])
  .setPos({ x: 5, y: 13 }, () => [flag])
  .setPos({ x: 12, y: 3 }, () => [rock])
  .setPos({ x: 12, y: 5 }, () => [rock])
  .setPos({ x: 9, y: 3 }, () => [baba])
  .setPos({ x: 0, y: 0 }, () => [text.baba])
  .setPos({ x: 0, y: 1 }, () => [text.is])
  .setPos({ x: 0, y: 2 }, () => [text.you])
  .setPos({ x: 1, y: 0 }, () => [text.wall])
  .setPos({ x: 1, y: 1 }, () => [text.is])
  .setPos({ x: 1, y: 2 }, () => [text.stop])
  .setPos({ x: 13, y: 9 }, () => [text.rock])
  .setPos({ x: 14, y: 9 }, () => [text.is])
  .setPos({ x: 15, y: 9 }, () => [text.push])
  .setPos({ x: 13, y: 12 }, () => [text.flag])
  .setPos({ x: 14, y: 12 }, () => [text.is])
  .setPos({ x: 15, y: 12 }, () => [text.win])
  .setPos({ x: 6, y: 4 }, () => [text.water])
  .setPos({ x: 6, y: 5 }, () => [text.is])
  .setPos({ x: 6, y: 6 }, () => [text.sink])
  .build()

export const level4: GameMap = mapBuilder(24, 14)
  // flag is win
  .setPos({ x: 0, y: 0 }, () => [text.flag])
  .setPos({ x: 1, y: 0 }, () => [text.is])
  .setPos({ x: 2, y: 0 }, () => [text.win])
  // baba is you
  .setPos({ x: 0, y: 1 }, () => [text.baba])
  .setPos({ x: 1, y: 1 }, () => [text.is])
  .setPos({ x: 2, y: 1 }, () => [text.you])
  // rock is push
  .setPos({ x: 2, y: 5 }, () => [text.rock])
  .setPos({ x: 3, y: 5 }, () => [text.is])
  .setPos({ x: 4, y: 5 }, () => [text.push])
  // 左下角区域
  .setArea({ x: 9, y: 9 }, { x: 9, y: 13 }, () => [skull])
  .setArea({ x: 3, y: 9 }, { x: 3, y: 13 }, () => [skull])
  .setArea({ x: 5, y: 7 }, { x: 5, y: 9 }, () => [skull])
  .setArea({ x: 7, y: 7 }, { x: 7, y: 9 }, () => [skull])
  .setPos({ x: 4, y: 9 }, () => [skull])
  .setPos({ x: 8, y: 9 }, () => [skull])
  .setArea({ x: 6, y: 8 }, { x: 6, y: 10 }, () => [rock])
  .setPos({ x: 6, y: 12 }, () => [baba])
  // 右侧区域
  .setArea({ x: 13, y: 3 }, { x: 21, y: 11 }, () => [skull])
  .setArea({ x: 14, y: 4 }, { x: 20, y: 10 }, () => [])
  .setPos({ x: 15, y: 5 }, () => [text.skull])
  .setPos({ x: 15, y: 6 }, () => [text.is])
  .setPos({ x: 15, y: 7 }, () => [text.defeat])
  .setPos({ x: 18, y: 9 }, () => [flag])
  .build()

export const allLevel = [
  level0,
  level1,
  level2,
  level3,
  level4,
]