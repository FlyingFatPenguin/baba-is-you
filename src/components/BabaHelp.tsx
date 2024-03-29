import * as React from 'react';
import DropDown from './DropDown';

interface Props {

}

export default class BabaHelp extends React.Component<Props> {
  render() {
    return <DropDown iconName='help' style={{ top: '15px', left: '10px', alignItems: 'flex-start' }}>
      <table>
        <thead>
          <tr><td>动作</td><td>键盘</td><td>手势</td></tr>
        </thead>
        <tbody>
          <tr><td>向左</td><td> ⬅ </td><td>向左滑动</td></tr>
          <tr><td>向右</td><td> ➡ </td><td>向右滑动</td></tr>
          <tr><td>向上</td><td> ⬆ </td><td>向上滑动</td></tr>
          <tr><td>向下</td><td> ⬇ </td><td>向下滑动</td></tr>
          <tr><td>跳过</td><td> 空格 </td><td>双击</td></tr>
          {/* 备选方案 🔄 🔁 */}
          <tr><td>撤销</td><td> U </td><td>↪逆时针画圆</td></tr>
          <tr><td>重玩本关</td><td> R </td><td>↩顺时针画圆</td></tr>
        </tbody>
      </table>
    </DropDown>
  }
}