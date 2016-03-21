import React from 'react';
import { render } from 'react-dom';
//import ReactComponentDecorator from '../lib/ReactComponentDecorator';
import iterator from '../lib/iterator';

//class Component extends React.Component {
//  componentDidMount() {
//    const ids = [];
//    iterator.parents(this, component => {
//      console.log(component);
//      return true;
//    });
//    console.log(ids);
//  }
//
//  render() {
//
//    console.log(this.props.id);
//
//    return <div id={this.props.id}>
//      <h1 onClick={event => {
//
//        let ids = [];
//
//        iterator.parents(this, component => {
//
//          ids.push(component.props.id);
//          //return true;
//          return false;
//        });
//
//        console.log(this);
//        console.log(ids);
//
//      }}>{this.props.id}</h1>
//      {this.props.children}
//    </div>
//  }
//}
//
//class ComponentTree extends React.Component {
//
//  componentDidMount() {
//    const ids = [];
//    iterator.children(this, component => {
//      ids.push(component.props.id);
//      return true;
//    });
//    console.log(ids);
//  }
//
//  render() {
//    return <div id="wrap.0">
//      <div>
//        <div>
//          <div>
//            <Component id="wrap.0.0">
//              <div>
//                <Component id="wrap.0.0.0"></Component>
//                <Component id="wrap.0.0.1">
//                  <div>
//                    <Component id="wrap.0.0.1.0"></Component>
//                    <Component id="wrap.0.0.1.1"></Component>
//
//                    <div>
//                      <Component id="wrap.0.0.1.2"></Component>
//                    </div>
//                  </div>
//                </Component>
//              </div>
//            </Component>
//            <Component id="wrap.0.1">
//              <div>
//                <Component id="wrap.0.1.0"></Component>
//                <Component id="wrap.0.1.1"></Component>
//              </div>
//            </Component>
//          </div>
//        </div>
//      </div>
//    </div>
//  }
//}


class Component extends React.Component {

  componentDidMount() {
    if (this.props.id === 'wrap.0.0.1.2') {
      console.log(this);
      //theComponent = this;
    }
  }

  render() {
    return <div id={this.props.id}><h1 onClick={event => {


        console.log(this);

      }}>{this.props.id}</h1>
      {this.props.children}
    </div>
  }
}

class ComponentTree extends React.Component {

  render() {

    return <div id="wrap.0">
      <Component id="wrap.0.0">
        <div>
          <Component id="wrap.0.0.0"></Component>
          <Component id="wrap.0.0.1">
            <div>
              <Component id="wrap.0.0.1.0"></Component>
              <Component id="wrap.0.0.1.1"></Component>

              <div>
                <Component id="wrap.0.0.1.2"></Component>
              </div>
            </div>
          </Component>
        </div>
      </Component>
      <Component id="wrap.0.1">
        <div>
          <Component id="wrap.0.1.0"></Component>
          <Component id="wrap.0.1.1"></Component>
        </div>
      </Component>
    </div>
  }
}
let target = document.createElement('div');
document.body.appendChild(target);

render(<ComponentTree id="wrap"/>, target);