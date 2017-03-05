import React, {Component} from 'react';
import {connect} from 'react-redux';
import {map} from 'lodash';
import {
  doOpenDevice,
  doCloseDevice,
  doAddDevice,
  doOverrideAll,
  doGuestAllow,
  editNameAction,
} from '../actions';

class App extends Component {
  handleOpenDevice(mac, timeBound) {
    const {dispatch} = this.props;
    dispatch(doOpenDevice(mac, timeBound));
  }

  renderOpenMenu(mac) {
      const menu = [
        [30 * 60, '30m'],
        [1 * 60 * 60, '1hr'],
        [2 * 60 * 60, '2hr'],
        [4 * 60 * 60, '4hr'],
        [8 * 60 * 60, '8hr'],
        [16 * 60 * 60, '16hr'],
        [null, 'forever'],
      ];
      return map(menu,
        ([secs, label]) => (
          <td
            key={label}
            onClick={() => this.handleOpenDevice(mac, secs)}>
            [{label}]
          </td>
        ));
  }

  renderClosedDevice(dev, i) {
    const {name, mac} = dev;
    return (
      <tr key={i}>
        <td>{name}</td>
        {this.renderOpenMenu(mac)}
      </tr>
    );
  }

  renderClosedDevices(closedDevices) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {map(closedDevices, (dev, i) => this.renderClosedDevice(dev, i))}
        </tbody>
      </table>
    );
  }

  handleCloseDevice(mac) {
    const {dispatch} = this.props;
    dispatch(doCloseDevice(mac));
  }

  renderOpenDevice(entry, i) {
    const {'item': {name, mac}, time_bound} = entry;
    let timeBound;
    if (time_bound) {
      const asDate = new Date(time_bound);
      const delta = asDate - this.now;
      const secs = Math.floor(delta / 1000);
      const displaySecs = secs % 60;
      const minutes = Math.floor(secs / 60);
      const displayMins = minutes % 60;
      const hours = Math.floor(minutes / 60);

      timeBound = `${hours}:` +
        `${('0' + displayMins).slice(-2)}:` +
        `${('0' + displaySecs).slice(-2)}`;
    } else {
      timeBound = 'forever';
    }
    return (
      <tr key={i}>
        <td>{name}</td>
        <td>{timeBound}</td>
        <td onClick={() => this.handleCloseDevice(mac)}>[close]</td>
      </tr>
    );
  }

  handleAddDevice(mac, name) {
    const {dispatch} = this.props;
    dispatch(doAddDevice(mac, name));
  }

  handleEditName(mac, name) {
    const {dispatch} = this.props;
    dispatch(editNameAction(mac, name));
  }

  renderUnknownDevice(dev, i) {
    const {editedNames} = this.props;
    const {mac} = dev;

    const name = editedNames[mac];
    return (
      <tr key={i}>
        <td>{mac}</td>
        <td>
          <input
          value={name}
          onChange={e => this.handleEditName(mac, e.target.value)}
          ></input></td>
        <td onClick={() => this.handleAddDevice(mac, name)}>[add]</td>
      </tr>
    );
  }

  renderOpenDevices(openDevices) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time Left</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {map(openDevices, (dev, i) => this.renderOpenDevice(dev, i))}
        </tbody>
      </table>
    );
  }

  renderUnknownDevices(unknownDevices) {
    return (
      <table>
        <thead>
          <tr>
            <th>Mac</th>
            <th>Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {map(unknownDevices, (dev, i) => this.renderUnknownDevice(dev, i))}
        </tbody>
      </table>
    );
  }

  handleOverrideClick(overrideValue) {
    const {dispatch} = this.props;
    dispatch(doOverrideAll(overrideValue));
  }

  renderOverride() {
    const {override} = this.props;
    return (
      <div>
        <span onClick={() => this.handleOverrideClick(true)}>
          [open]
        </span>
        <span onClick={() => this.handleOverrideClick(false)}>
          [close]
        </span>
        <span onClick={() => this.handleOverrideClick(null)}>
          [off]
        </span>
        {override && override.item ? override.item : "Override Off"}
      </div>
    );

  }

  handleGuestAllowClick(allowValue) {
    const {dispatch} = this.props;
    dispatch(doGuestAllow(allowValue));
  }

  renderGuestToggle() {
    const {guestAllow} = this.props;
    return (
      <div>
        <span onClick={() => this.handleGuestAllowClick(true)}>
          [open]
        </span>
        <span onClick={() => this.handleGuestAllowClick(false)}>
          [close]
        </span>
        {guestAllow && guestAllow.item ? guestAllow.item : "??"}
      </div>
    );

  }

  render() {
    const {
      loading,
      openDevices,
      closedDevices,
      unknownDevices,
    } = this.props;
    this.now = Date.now()
    return (
      <div>
        <div>Loading? {JSON.stringify(loading)}</div>
        <h2>Override</h2>
        {this.renderOverride()}
        <h2>Open Devices</h2>
        <div>{this.renderOpenDevices(openDevices)}</div>
        <h2>Closed Devices</h2>
        <div>{this.renderClosedDevices(closedDevices)}</div>
        <h2>Unknown Devices</h2>
        <div>{this.renderGuestToggle()}</div>
        <div>{this.renderUnknownDevices(unknownDevices)}</div>
      </div>
    );
  }
}

export default connect(state => ({
  world: state.world,
  openDevices: state.world.schedule.open_device_entries,
  closedDevices: state.world.closed_devices,
  unknownDevices: state.world.unknown_devices,
  editedNames: state.world.editedNames,
  loading: state.loading.loading,
  override: state.world.schedule.override_entry,
  guestAllow: state.world.schedule.guest_entry,
}))(App);
