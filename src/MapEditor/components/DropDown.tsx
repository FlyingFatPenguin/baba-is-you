import * as React from 'react';
import '../css/dropdown.css'

interface Props {
  iconName: string
  onClick?: () => void
}

export default class DropDown extends React.Component<Props> {
  // constructor(props: Props) {
  //   super(props)
  // }
  render() {
    const name = this.props.iconName
    const children = this.props.children
    return <div className='dropdown' onClick={this.props.onClick}>
      <img src={require('../img/' + name + '.png')} alt="" />
      {children && <div className='drop-content'>
        {children}
      </div>}
    </div>
  }
}