import * as React from 'react';
import { SceneInterface } from '../GameCore/Interface';
import BabaScene from './BabaScene';

interface Props {
  startScene: SceneInterface
}


interface States {
  history: SceneInterface[]
}

class BabaIsYou extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      history: [this.props.startScene]
    }
  }
  render() {
    const history = this.state.history
    const currentScene = history[history.length - 1]
    return <BabaScene scene={currentScene}></BabaScene>
  }
}

export default BabaIsYou;