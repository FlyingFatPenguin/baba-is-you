import * as React from 'react';
import '../css/controlPanel.css'

export default class ControlPanel extends React.Component {
  render() {
    return <div className='control-panel'>
      {this.props.children}
    </div>
  }
}