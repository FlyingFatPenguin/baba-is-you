import * as React from 'react';
import '../css/DropDown.css'

interface Props {
  iconName: string
  style?: React.CSSProperties
}

class DropDown extends React.Component<Props>{
  render() {
    const iconName = this.props.iconName
    const children = this.props.children
    return <div className='drop-down' style={this.props.style}>
      <img src={require('../img/' + iconName + '.png')} alt="" />
      <div>
        {children}
      </div>
    </div >
  }
}

export default DropDown