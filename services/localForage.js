
import localForage from 'localforage'

const CLIENTS = localForage.createInstance({
  name: 'STORE_CLIENT',
})

export default {
  async setData(clients) {
    await CLIENTS.setItem('clients', clients)
      .then(function () {
        return CLIENTS.getItem('clients')
      })
      .then(function (value) {
        console.log(value);
        return value;
      })
      .catch(function (err) {
        return [];
      })
  },
  async getData() {
    try {
      const value = await CLIENTS.getItem('clients');
      // This code runs once the value has been loaded
      // from the offline CLIENTS.
      return value;
    } catch (err) {
      // This code runs if there were any errors.
      console.log(err);
    }
  }
}