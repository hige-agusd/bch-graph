const initialState = {
    dailyData: [],
    hourlyData: [],
    currentPrice: {},
    selectedView: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_VIEW':
            return {
                ...state,
                selectedView: action.selectedView,
            }
        case 'SET_DAILY_DATA':
            return {
                ...state,
                dailyData: action.dailyData,
            }
        case 'SET_HOURLY_DATA':
            return {
                ...state,
                hourlyData: action.hourlyData,
            }
        case 'SET_CURRENT_PRICE':
            return {
                ...state,
                currentPrice: action.price,
            }
        default:
            return state;
    }
};

export default reducer;