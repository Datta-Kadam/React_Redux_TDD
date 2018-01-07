import jsdom from 'jsdom';
import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUitls from 'react-addons-test-utils';
import chai,{expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';


//set up a testing environment to run like a browser in the command line

global.document=jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window=global.document.defaultView;
const $=jquery(global.window);


//build a 'renderComponent' helper that should render a react class

function renderComponent(ComponentClass,props,state){
  const compoentInstance=TestUitls.renderIntoDocument(
    <Provider store={createStore(reducers,state)}>
      <ComponentClass {...props} />
    </Provider>
);

  return($(ReactDOM.findDOMNode(compoentInstance)));

}

//Build a helper for simulating events
$.fn.simulate=function(eventName,value){
  if(value){
    this.val(value);
  }
  TestUitls.Simulate[eventName](this[0]);
}

//set a chai-jquery

chaiJquery(chai,chai.util,$);

export {renderComponent,expect};