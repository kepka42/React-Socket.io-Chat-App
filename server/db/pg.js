const { Client } = require('pg')

class DbConnection {
  getRooms() {
    const client = new Client();
    client.connect()

    return client
      .query('SELECT * FROM rooms')
      .then(res => res.rows)
      .catch((e) => {
        console.log('error: ' + e)
        return e
      })
      .finally(() => {
        client.end()
      })
  }
}

module.exports = DbConnection