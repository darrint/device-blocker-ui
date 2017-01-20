import {handleActions} from 'redux-actions';


export default handleActions({
  'MARK_LOADING': (state, action) => {
    const loading = action.payload;

    return {
      ...state,
      loading: loading,
    };
  },
}, {loading: false});
