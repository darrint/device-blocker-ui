import param from 'jquery-param';

function checkResponse(response) {
  if (response.status === 200) {
      return response;
  } else {
      throw new Error(response.statusText);
  }
}

export async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });
  const checked = checkResponse(response);
  return checked.json();
}

export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param(data),
  });
  const checked = checkResponse(response);
  return checked.json();
}

export class Api {
  async getWorld() {
      return await get("/api");
  }

  async openDevice(mac, timeSecs) {
      const payload = {mac};
      if (timeSecs) {
          payload['time_secs'] = timeSecs;
      }
      return await post("/api/device/open", payload);
  }

  async closeDevice(mac) {
      return await post("/api/device/close", {mac});
  }

  async addDevice(mac, name) {
      return await post("/api/add_device", {mac, name});
  }

  async refreshDevices() {
      return await post("/api/refresh_devices");
  }

  async overrideAll(overrideValue) {
    let override;
    if (overrideValue === null) {
      override = 'null';
    } else if (overrideValue) {
      override = 'true';
    } else {
      override = 'false';
    }

    return await post("/api/override_all", {override});
  }

  async setGuestAllow(allowValue) {
    let allow;
    if (allowValue) {
      allow = 'true';
    } else {
      allow = 'false';
    }

    return await post("/api/guest", {allow});
  }
}
