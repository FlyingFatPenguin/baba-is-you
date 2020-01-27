import * as React from 'react';

// interface Props {
//   size
// }

class Curtain extends React.Component {
  render() {
    const children = this.props.children
    return <div>
      {children}
    </div>
  }
}