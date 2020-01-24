import * as React from 'react';
import BabaIsYou from '../components/BabaIsYou';
import { level1 } from '../GameCore/data/level';
import Scene from '../GameCore/Scene';

export default class GameManager extends React.Component {
  render() {
    return <BabaIsYou startScene={new Scene(level1)}></BabaIsYou>
  }
}