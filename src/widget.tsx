// Copyright (c) me
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import ReactDOM from 'react-dom';
import Component from './component';
// Import the CSS
import '../css/widget.css';
import React from 'react';

export class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class ExampleView extends DOMWidgetView {

  // If delayed rendering happens for any reason, this should return a promise which resolves
  // once rendering is finished.
  render() {
    this.el.classList.add('custom-widget');

    this.once('displayed', () => {
      console.log('displayed has been triggered');
      console.log(this.el);
      setTimeout(() => {
        ReactDOM.render(<Component />, this.el)
      }, 1000)
    })

    const time = new Date()
    console.log(`ipywidget render() called. time: ${time.toISOString()}`)

    return new Promise((resolve) => {
      setTimeout(() => {
        this.el.innerHTML = '<div style="width: 500px; height: 500px; background-color: red"></div>'
        const newtime = new Date()
        console.log(`ipywidget render() promise resolved. time: ${newtime.toISOString()}`)
        resolve(void 0)
      }, 5000)
    })
  }
}
