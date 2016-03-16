import React from 'react';
import { render } from 'react-dom';
import reactEvent from '../lib/reactEvent';

class Grandson extends React.Component {
  constructor(props) {
    super(props);
    reactEvent(this);
  }

  wrapClickHandler() {
    console.log(this.props.children, 'clicked');
  }

  componentDidMount() {

    //console.log(this);

    this.on('WrapClick', this.wrapClickHandler.bind(this));
    this.once('WrapClick', () => {
      console.log('lalala');
    });
  }

  componentWillUnmount() {
    this.off('WrapClick', this.wrapClickHandler.bind(this));
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
  }

  render() {
    return (
      <div className="child">
        <p className="pp">
          <Grandson>Button1</Grandson>
          <Grandson>Button2</Grandson>
        </p>
      </div>
    );
  }
}

class Wrap extends React.Component {
  constructor(props) {
    super(props);
    reactEvent(this, {
      isRoot: true
    });
    this.state = {
      count: []
    };
  }

  componentDidMount() {
    //console.log(this)
  }

  render() {
    return (
      <div className="wrap" onClick={() => {
        this.diffuse('WrapClick', {
          now: Date.now()
        });
        this.setState({
         count: Math.random() > .5 ? [1] : [1, 2]
        });

        this.broadcast();

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
                    return <Child key={index}></Child>
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