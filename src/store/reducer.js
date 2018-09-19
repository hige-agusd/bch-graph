const initialState = {
    data: [],
    selectedView: '24h',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_VIEW':
            return {
                ...state,
                selectedView: action.selectedView,
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.data,
            }
        default:
            return state;
    }
};

export default reducer;