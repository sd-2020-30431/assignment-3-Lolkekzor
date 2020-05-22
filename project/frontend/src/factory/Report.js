import React from 'react';
import reportDecorator from './ReportDecorator';

@reportDecorator()
class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class={this.props.color == 'green' ? "bg-success" : "bg-danger"}>
                <h1> Your ideal burndown rate: {this.props.burndown} </h1>
            </div>
        )
    }
}

export default Report;
