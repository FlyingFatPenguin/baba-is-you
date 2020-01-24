import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import BabaIsYou from './components/BabaIsYou'

import { level0 } from './GameCore/data/level'
import Scene from './GameCore/Scene'

ReactDOM.render(<BabaIsYou startScene={new Scene(level0)}></BabaIsYou>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
