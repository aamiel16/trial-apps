const initState = {
  isFetching: false,
  isError: false,
  data: []
}

export function documentsReducer(state=initState, action) {
  switch (action.type) {
    case 'SET_DATA_SUCCESS':
      console.log('Succes:', action);
      return {isFetching: false, error: false, data: action.payload};
    case 'SET_DATA_ERORR':
      console.log('Error:', action);
      return {isFetching: false, error: true, data: []};
    case 'SET_DATA_IN_PROGRESS':
      console.log('Progress:', action);
      return {isFetching: true, error: false, data: []};
    default:
      return state;
  }
}
