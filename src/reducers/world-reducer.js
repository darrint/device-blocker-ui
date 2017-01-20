import {map, assign} from 'lodash';
import {handleActions} from 'redux-actions';


export default handleActions({
  'UPDATE_WORLD': (state, action) => {
    const world = action.payload;

    const editedNames = assign({},
      ...map(world.unknown_devices, ud => ({[ud.mac]: ud.name})));
    return {
      ...state,
      ...world,
      editedNames,
    };
  },
  'EDIT_NAME': (state, action) => {
    const {mac, name} = action.payload;

    return {
      ...state,
      editedNames: {
        ...state.editedNames,
        [mac]: name,
      },
    };
  },
}, {
  schedule: {},
  editedNames: {},
});
