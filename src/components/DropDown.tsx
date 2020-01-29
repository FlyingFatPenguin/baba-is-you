import * as React from 'react';
import '../css/DropDown.css'

interface Props {
  iconName: string
}

class DropDown extends React.Component<Props>{
  render() {
    const iconName = this.props.iconName
    const children = this.props.children
    return <div className='drop-down'>
      <img src={require('../img/' + iconName + '.png')} alt="" />
      <div>
        {children}
      </div>
    </div >
  }
}

export default DropDown