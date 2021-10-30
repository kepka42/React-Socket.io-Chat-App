const { Client } = require('pg')

class DbConnection {
  constructor() {
    this.client = new Client();
  }

  getRooms() {
    return [
      {
        name: 'Room1'
      },
      {
        name: 'Room2'
      },
      {
        name: 'Room3'
      }
    ]
  }
}

module.exports = DbConnection