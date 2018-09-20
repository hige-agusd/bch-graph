import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import classes from './Chart.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Chart extends Component {
    componentDidMount() {
        setInterval(() => {
            this.props.fetchCurrentPrice();
        }, 30000);
    }
    componentDidUpdate() {
        if (this.props.selectedView) {
            if (this.props.selectedView === '24H') {
                if (!this.props.hourlyData.length) {
                    this.props.fetchHourlyData();
                }
            } else {
                if (!this.props.dailyData.length) {
                    this.props.fetchDailyData();
                }
            }
        }
    }

    chunkSize = (view) => {
        switch (view) {
            case '7D':
                return 7;
            default:
                return undefined;
        }
    }

    formatTick = (tick) => {
        const date = new Date(tick);
        if (this.props.selectedView === '24H') {
            let hour = date.getHours();
            if (Number.isNaN(hour)) {
                return '';
            } else {
                hour = hour > 9 ? hour : '0' + hour;
                const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
                return hour + ':' + minutes;
            }
        } else {
            let month = date.getMonth() + 1;
            if (Number.isNaN(month)) {
                return '';
            } else {
                month = month > 9 ? month : '0' + month;
                const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
                return month + '/' + day;
            }
        }

    }

    render() {
        const chartData = this.props.selectedView === '24H' ? this.props.hourlyData : this.props.dailyData.slice(0, this.chunkSize(this.props.selectedView));
        const yAxis = this.props.selectedView === '24H' ? <YAxis type="number" domain={['dataMin - 50', 'dataMax + 50']} /> : <YAxis />;
        const chart = this.props.selectedView ? (
            <LineChart width={800} height={400} data={chartData.concat(this.props.currentPrice)} className={classes.Chart} >
                <XAxis dataKey="date" tickFormatter={this.formatTick} domain={['dataMin', 'dataMax']} />
                {yAxis}
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#fab915" />
            </LineChart>
        ) : <p className={classes.Paragraph} >Pick an interval</p>;
        return chart;
    }
}

const mapStateToProps = state => {
    return {
        dailyData: state.dailyData,
        hourlyData: state.hourlyData,
        currentPrice: state.currentPrice,
        selectedView: state.selectedView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHourlyData: () => dispatch(actions.fetchHourlyData()),
        fetchDailyData: () => dispatch(actions.fetchDailyData()),
        fetchCurrentPrice: () => dispatch(actions.fetchCurrentPrice()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);