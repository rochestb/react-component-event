import React from 'react';
import { render } from 'react-dom';
import ReactComponentDecorator from '../lib/ReactComponentDecorator';

class Grandson extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  wrapClickHandler(event) {
    console.log(event);
    //event.stopImmediatePropagation();
    console.log(this, 'clicked');
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
        this.emit();
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

    this.on('WrapClick', event => {
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

    this.on('WrapClick', event => {
      if (this.asd.asd) {
        console.log('click self');
      }
      console.log('click self----');
    });
  }

  render() {
    return (
      <div className="wrap" onClick={() => {

        this.setState({
         count: Math.random() > .5 ? [1] : [1, 2]
        });

        console.log('this.broadcast WrapClick');

        this.broadcast('WrapClick');



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