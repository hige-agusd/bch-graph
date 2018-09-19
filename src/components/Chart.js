import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import { LineChart, Line } from 'recharts';


class Chart extends Component {
    componentDidMount() {
        this.props.onInitData();
    }

    render() {
        const chart = this.props.data ? (
            <LineChart width={400} height={400} data={this.props.data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        ) : <div>Chart</div>;
        return chart;
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitData: () => dispatch(actions.initData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);