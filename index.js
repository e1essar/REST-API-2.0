const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
    res.send('OK')
})

app.listen(PORT, () => console.log('server started on ' + PORT))