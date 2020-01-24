import { GameMap } from "../Interface";
import { buildText, mapBuilder } from "./MapHelper";

const wall = { name: 'wall' }
const rock = { name: 'rock' }
const baba = { name: 'baba' }
const flag = { name: 'flag' }

export const level0: GameMap = mapBuilder(15, 12)
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