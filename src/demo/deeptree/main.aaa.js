import React from 'react';
import { render } from 'react-dom';
import ReactComponentDecorator from '../lib/ReactComponentDecorator';
import iterator from '../lib/iterator';

class Grandson extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  wrapClickHandler(event, a, b) {
    console.log(event);
    console.log(a);
    console.log(b);
    //event.stopImmediatePropagation();
    console.log(this);
    console.log('clicked');
  }

  componentDidMount() {
    //console.log(this);

    this.on('WrapClick', this.wrapClickHandler);
    this.on('WrapClick', () => {
      console.log('lalala');
    });
  }

  componentWillUnmount() {
    this.off('WrapClick', this.wrapClickHandler);
  }

  render() {
    return (
      <button className="grandson" onClick={event => {
        iterator.parents(this, (com) => {
          console.log(com);
          return true;
        });
      }}>{this.props.children}</button>
    );
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  componentDidMount() {

    this.on('WrapClick', (event, a, b) => {
      if (this.props.index === 1) {
        event.stopPropagation();
      }
      this.emit('WrapClick');
    });
  }

  render() {
    return (
      <div className="child">
        <p className="pp">
          <span>{this.props.index}</span>
          {this.props.children}
        </p>
      </div>
    );
  }
}

class Wrap extends React.Component {
  constructor(props) {
    super(props);
    ReactComponentDecorator(this);

    this.state = {
      count: []
    };
  }

  componentDidMount() {

    this.on('WrapClick', (event, a, b) => {
      if (this.asd.asd) {
        console.log('click self');
      }
      console.log('click self----', a, b);
    });
  }

  render() {
    return (
      <div className="wrap" onClick={() => {

        this.setState({
         count: Math.random() > .5 ? [1] : [1, 2]
        });

        console.log('this.broadcast WrapClick');

        this.broadcast('WrapClick', 123, 321);

      }}>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>
        <span>The Wrap</span>

        <div>
          <div>
            <div>
              <div>
                {
                  this.state.count.map(index => {
                    return <Child key={index} index={index}>
                      <Grandson>Button{this.props.index}-1</Grandson>
                      <Grandson>Button{this.props.index}-2</Grandson>
                    </Child>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<Wrap/>, document.getElementById('example'));