import React from 'react';

const reportDecorator = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            if (this.props.burndown > 100) {
                this.state = {
                    color: 'red'
                }
            } else {
                this.state = {
                    color: 'green'
                }
            }
        }

        render() {
            return <Component {...this.props} color={this.state.color}/>
        }
    }
}

export default reportDecorator;
