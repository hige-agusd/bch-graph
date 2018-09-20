import axios from 'axios';

const baseURL = 'https://index-api.bitcoin.com/api';

export const switchView = (selectedView) => {
    fetchCurrentPrice();
    return {
        type: 'SWITCH_VIEW',
        selectedView: selectedView,
    };
};

export const setCurrentPrice = (price) => {
    return {
        type: 'SET_CURRENT_PRICE',
        price: price,
    }
}

export const fetchCurrentPrice = () => {
    return dispatch => {
        axios.get(baseURL + '/v0/price')
            .then(res => {
                const transformedData = {
                    date: res.data.time.unix * 1000,
                    price: (res.data.price / 100).toFixed(2) / 1,
                }
                dispatch(setCurrentPrice(transformedData));
            })
    }
}


export const setDailyData = (data) => {
    return {
        type: 'SET_DAILY_DATA',
        dailyData: data,
    };
};

export const fetchDailyData = () => {
    return dispatch => {
        axios.get(baseURL + '/v0/cash/history?unix=1')
            .then(res => {
                let filterDate = new Date();
                filterDate.setMonth(filterDate.getMonth() - 1);
                filterDate = filterDate.getTime();
                const transformedData = res.data.map(item => ({ date: item[0] * 1000, price: (item[1] / 100).toFixed(2) / 1 }))
                    .filter(el => el.date > filterDate);
                dispatch(setDailyData(transformedData));
            },
                res => {
                    console.log(res);
                })
            .catch(err => {
                console.log(err);
            })
    }
}

export const setHourlyData = (data) => {
    return {
        type: 'SET_HOURLY_DATA',
        hourlyData: data,
    };
};

export const fetchHourlyData = () => {
    const hours = [];
    let now = new Date();
    now.setUTCHours(0);
    now.setUTCMinutes(0);
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);
    now = now.getTime() / 1000;
    for (let i = 0; i <= 27; i++) {
        hours.push(now - i * 3600);
    }
    return dispatch => {
        const promiseArray = hours.map(el =>
            axios.get(`${baseURL}/v0/cash/lookup?time=${el}`));
        axios.all(promiseArray)
            .then(axios.spread(function (...res) {
                const transformedData = res.map( response => {
                    return {
                        date: response.data.lookup.time.iso,
                        price: (response.data.lookup.price / 100).toFixed(2)/1,
                    }
                });
                dispatch(setHourlyData(transformedData));
            }))
            .catch(err => {
                console.log(err);
            })
            ;
    }
}
