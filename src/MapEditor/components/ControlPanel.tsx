import * as React from 'react';
import './controlPanel.css'
import DropDown from './DropDown';

export default class ControlPanel extends React.Component {
  render() {
    return <div className='control-panel'>
      <DropDown iconName='size'>
        <h1>hhh</h1>
        <input type="range"/>
      </DropDown>
      <DropDown iconName='grid'></DropDown>
      <DropDown iconName='add'></DropDown>
      <DropDown iconName='export'></DropDown>
    </div>
  }
}