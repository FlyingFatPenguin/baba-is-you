import { GameMap } from "../Interface";
import { buildText, mapBuilder } from "./MapHelper";

const wall = { name: 'wall' }
const rock = { name: 'rock' }
const baba = { name: 'baba' }
const flag = { name: 'flag' }

export const level0: GameMap = mapBuilder(17, 17)
  .setViewPos({ x: 1, y: 3 })
  .setArea({ x: 2, y: 4 }, { x: 12, y: 4 }, () => [wall])
  .setArea({ x: 2, y: 8 }, { x: 12, y: 8 }, () => [wall])
  .setArea({ x: 7, y: 5 }, { x: 7, y: 7 }, () => [rock])
  .setPos({ x: 3, y: 6 }, () => [baba])
  .setPos({ x: 11, y: 6 }, () => [flag])
  .setPos({ x: 2, y: 2 }, () => ([buildText('baba')]))
  .setPos({ x: 3, y: 2 }, () => ([buildText('is')]))
  .setPos({ x: 4, y: 2 }, () => ([buildText('you')]))
  .setPos({ x: 2, y: 10 }, () => ([buildText('wall')]))
  .setPos({ x: 3, y: 10 }, () => ([buildText('is')]))
  .setPos({ x: 4, y: 10 }, () => ([buildText('stop')]))
  .setPos({ x: 10, y: 2 }, () => ([buildText('flag')]))
  .setPos({ x: 11, y: 2 }, () => ([buildText('is')]))
  .setPos({ x: 12, y: 2 }, () => ([buildText('win')]))
  .setPos({ x: 10, y: 10 }, () => ([buildText('rock')]))
  .setPos({ x: 11, y: 10 }, () => ([buildText('is')]))
  .setPos({ x: 12, y: 10 }, () => ([buildText('push')]))
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
  .setPos({ x: 10, y: 11 }, () => [buildText('wall')])
  .setPos({ x: 10, y: 12 }, () => [buildText('is')])
  .setPos({ x: 10, y: 13 }, () => [buildText('stop')])
  .setPos({ x: 14, y: 5 }, () => [buildText('win')])
  .setPos({ x: 10, y: 3 }, () => [buildText('is')])
  .setPos({ x: 6, y: 7 }, () => [buildText('flag')])
  .setPos({ x: 5, y: 11 }, () => [buildText('baba')])
  .setPos({ x: 5, y: 12 }, () => [buildText('is')])
  .setPos({ x: 5, y: 13 }, () => [buildText('you')])
  .build()

export const allLevel = [
  level0,
  level1,
]