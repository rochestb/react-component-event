import React from 'react';
import { render } from 'react-dom';
import ReactComponentDecorator from '../../lib/ReactComponentDecorator';


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

const FireInTheHole = 'FireInTheHole';

class Component extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  componentDidMount() {
    this.on(FireInTheHole, (event, arg1, arg2) => {
      console.log(event, arg1, arg2);
    });
  }

  render() {
    return <div id={this.props.id}><h1 onClick={event => {
        this.emit(FireInTheHole, 1, 2);
      }}>{this.props.id}</h1>
      {this.props.children}
    </div>
  }
}

class ComponentTree extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this, {root: true});
  }

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