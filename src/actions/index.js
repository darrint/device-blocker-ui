import {createAction} from 'redux-actions';


export function doUpdateCurrentState() {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.getWorld();
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export function doOpenDevice(mac, timeSecs) {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.openDevice(mac, timeSecs);
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export function doCloseDevice(mac) {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.closeDevice(mac);
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export function doAddDevice(mac, name) {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.addDevice(mac, name);
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export function doOverrideAll(overrideValue) {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.overrideAll(overrideValue);
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export function doGuestAllow(allowValue) {
  return async (dispatch, _, {api}) => {
    dispatch(markLoadingAction(true));
    const world = await api.setGuestAllow(allowValue);
    dispatch(updateWorldAction(world));
    dispatch(markLoadingAction(false));
  };
}

export const markLoadingAction = createAction('MARK_LOADING');

export const updateWorldAction = createAction('UPDATE_WORLD');

export const editNameAction = createAction('EDIT_NAME', (mac, name) => ({mac, name}));
