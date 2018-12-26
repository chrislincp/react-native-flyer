import React from 'react';
import BaseItem from './BaseItem';
import ActionSheetItem from './ActionSheetItem';
import StepperItem from './StepperItem';
import InputItem from './InputItem';
import RemarkItem from './RemarkItem';

export default class Form extends React.Component {
  static Base = BaseItem;

  static ActionSheet = ActionSheetItem

  static Stepper = StepperItem

  static Input = InputItem

  static Remark = RemarkItem
}
