import * as React from 'react';
import '../css/controlPanel.css'
import DropDown from './DropDown';

export default class ControlPanel extends React.Component {
  render() {
    return <div className='control-panel'>
      {this.props.children}
    </div>
  }
}