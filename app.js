const express = require('express')
const db = require('./config/db')
const customerController = require('./controllers/customerController')
const cors = require('cors')

const app = express()
const PORT = 3030

app.use(cors())
app.use(express.json())


app.get('/api/customers', customerController.getAllCustomers)

app.post('/api/customers', customerController.createNewCustomer)
app.get('/api/customers/calculate-route', customerController.calculateOptimizedRoute)

app.delete('/api/customers/:id', customerController.deleteCustomerById)

app.put('/api/customers/:id', customerController.updateCustomerById)

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`)
})