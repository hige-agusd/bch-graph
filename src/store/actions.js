import axios from '../axios-data';

export const switchView = (selectedView) => {
    return {
        type: 'SWITCH_VIEW',
        selectedView: selectedView,
    };
};

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        data: data,
    };
};

export const initData = () => {
    return dispatch => {
        axios.get('/v0/cash/history')
            .then( res => {
                console.log(res);
                const transformedData = res.data.map(item => ({date: item[0], price: item[1]}))
                dispatch(setData(transformedData));
            },
           res => {
               console.log(res);
           })
           .catch(err => {
               console.log(err);
           })
    }
}