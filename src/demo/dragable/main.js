import React from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import classnames from 'classnames';
import ReactComponentDecorator from '../../lib/ReactComponentDecorator';

const FireInTheHole = 'FireInTheHole';

function randomColor() {
  return {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
}

function rgb(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  render() {

  }
}

class Step extends React.Component {
  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
  }

  render() {
    return <div className="step">
      <div className="bar">
        {this.props.title}
      </div>
      <div className="body">
        <div>
          <span className="answer">
           {this.props.question}
          </span>
          <span>=</span>
          <input type="text" className="answer"/>
        </div>
        <button
          className={classnames(this.props.first && 'disabled')}
          onClick={event => {
          if(!this.props.first){
            this.emit('Prev');
          }
        }}>
          Prev
        </button>
        <button
          className={classnames(this.props.last && 'disabled')}
          onClick={event => {
          if(!this.props.last){
            this.emit('Next');
          }
        }}>
          Next
        </button>
      </div>
    </div>;
  }
}

class Trunk extends React.Component {
  constructor(props) {
    super(props);
    ReactComponentDecorator(this, {root: true});
    this.state = {
      steps: [
        <Step title="Step 1" question={'5 + 7'} answer={'12'} first={true}/>,
        <Step title="Step 2" question={'10 - 3'} answer={'7'}/>,
        <Step title="Step 3" question={'3 + 9'} answer={'27'}/>,
        <Step title="Step 4" question={'56 / 7'} answer={'8'}/>,
        <Step title="Step 5" question={'2 ^ 10'} answer={'1024'}/>,
        <Step title="Step 7" question={'2 ^ 20'} answer={'1048576'} last={true}/>,
        <Step title="Step 6" question={'ln(2.718281828459045)'} answer={'1'}/>
      ],
      currentStepIndex: 0
    };
  }

  componentDidMount() {
    this.on('Prev', event => {
      if (this.state.currentStepIndex > 0) {
        this.setState({
          currentStepIndex: --this.state.currentStepIndex
        });
      }
    });
    this.on('Next', event => {
      if (this.state.currentStepIndex < this.state.steps.length - 1) {
        this.setState({
          currentStepIndex: ++this.state.currentStepIndex
        });
      }
    });
  }

  render() {
    return <div>
      {this.state.steps[this.state.currentStepIndex]}
    </div>
  }
}

const target = document.createElement('div');
document.body.appendChild(target);

render(<Trunk id="trunk"/>, target);