import * as React from 'react';
import './dropdown.css'

interface Props {
  iconName: string
}

export default class DropDown extends React.Component<Props> {
  // constructor(props: Props) {
  //   super(props)
  // }
  render() {
    const name = this.props.iconName
    const children = this.props.children
    return <div className='dropdown'>
      <img src={require('../img/' + name + '.png')} alt="" />
      <div className='drop-content'>
        {children}
      </div>
    </div>
  }
}