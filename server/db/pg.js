const { Client } = require('pg')

class DbConnection {
  getRooms() {
    const client = new Client()
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

  getMessages(roomId) {
    const client = new Client()
    client.connect()

    return client
      .query(`SELECT * FROM messages WHERE room_id = '${roomId}' ORDER BY create_time LIMIT 100`)
      .then(res => {
        let result = []
        res.rows.forEach(row => {
          result.push({
            messageId: row.id,
            userId: row.user_id,
            senderName: row.sender_name,
            messageText: row.message,
            createdAt: row.create_time
          })
        })
        return result
      })
      .catch(e => {
        console.log('error: ' + e)
        return e
      })
      .finally(() => {
        client.end()
      })
  }

  saveMessage(roomId, data) {
    const client = new Client()
    client.connect()

    const sql = `INSERT INTO messages VALUES ('${data.messageId}', '${roomId}', '${data.userId}', '${data.senderName}', '${data.messageText}', to_timestamp('${data.createdAt}'))`;
    console.log(sql);


    return client
      .query(sql)
  }
}

module.exports = DbConnection