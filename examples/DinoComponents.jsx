import React, { Component, PropTypes } from 'react';
import { Input, InputNumber, TimePicker } from 'antd';
import { InputItem } from 'antd-mobile';
import dinoFromItemify from '../es/dinoFromItemify';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd-mobile/dist/antd-mobile.css';


export const DinoInput = dinoFromItemify(Input);
export const DinoInputNumber = dinoFromItemify(InputNumber);
export const DinoTimePicker = dinoFromItemify(TimePicker);
export const DinoInputItem = dinoFromItemify(InputItem);

export default dinoFromItemify;
