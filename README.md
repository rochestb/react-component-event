# [react-component-event](https://github.com/oglen/react-component-event)

A React plugin which implemention convenient communication between React components.

## Getting Started

Options for adding Less.js to your project:

* Install with [npm](https://npmjs.org): `npm install react-component-event`
* [Download the latest release][download]
* Clone the repo: `https://github.com/oglen/react-component-event`

## Usage

1. require react-component-event to your react component:

        import reactComponentEvent from 'react-component-event';

2. Use reactComponentEvent decorate your component in constructor:

        class Component extends React.Component {

            constructor(props) {
                super(props);
                // If this is your root component, set option is {root: true}
                ReactComponentDecorator(this, [option]);
            }

            ...
        }
3. And you can use these function in this component easily:

        componentDidMount() {

            // Add a event listener to this component
            this.on(EventName, (event, arg) => {
                ...
            });

            // Add a event listener only once
            this.once(EventName, (event, arg) => {
                ...
            });

            // Dispatch the event to all parent components
            this.emit(EventName, [arg...]);

            // Dispatch the event to all children components
            this.broadcast(EventName, [arg...]);

            // remove the event listener from this component
            this.off(EventName, [function]);

        }

## Example

There is a clear and concise example in the repo, preview it in following steps:

Enter this project fold and execute:

`npm install`

`gulp`

And visit link:

`http://127.0.0.1:3031/demo/deeptree/`
