import React from 'react';
import Report from './Report.js';

class ReportDecorator extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        if (this.props.burndown > 100) {
            console.log("BIGGER THAN 100");
            this.state = {
                color: 'red'
            }
        } else {
            console.log("LESS THAN 100");
            this.state = {
                color: 'green'
            }
        }
    }

    render() {
        return <Report {...this.props} color={this.state.color}/>
    }
}

export default ReportDecorator;
