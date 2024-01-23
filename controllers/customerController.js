const CustomerModel = require('../models/CustomerModel')
const routeCalculator = require('../utils/routeCalculator')


const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const { name, email, phone } = req.query
      const customers = await
      CustomerModel.getAllCustomers({ name, email, phone })

      res.status(200).json(customers)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter clientes.' })
    }
  },

  createNewCustomer: async (req, res) => {
    const { fullname, email, phone, coordX, coordY } = req.body
    try {
      if (!fullname || !email || !phone || coordX === undefined || coordY === undefined) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
        return
      }

      const newCustomer = await CustomerModel.createNewCustomer(fullname, email, phone, coordX, coordY)
      res.status(201).json(newCustomer)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar novo cliente.' })
    }
  },

  deleteCustomerById: async (req, res) => {
    const customerId = req.params.id

    try {
      const deletedCustomer = await CustomerModel.deleteCustomerById(customerId)
      res.status(200).json(deletedCustomer)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  updateCustomerById: async (req, res) => {
    const customerId = req.params.id
    const { fullname, email, phone, coordX, coordY } = req.body

    try {
      const updatedCustomer = await CustomerModel.updateCustomerById(customerId, fullname, email, phone, coordX, coordY)
      res.status(200).json(updatedCustomer)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  calculateOptimizedRoute: async (req, res) => {
    try {
      const customers = await CustomerModel.getAllCustomers()
      if (customers.length === 0) {
        res.status(400).json({ error: 'Não há clientes para calcular a rota.' })
        return
      }

      const optimizedRoute = routeCalculator.calculateOptimizedRoute(customers)

      res.status(200).json({ optimizedRoute })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular rota otimizada.' })
    }
  }

}

module.exports = customerController
