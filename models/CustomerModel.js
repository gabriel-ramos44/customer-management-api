const db = require('../config/db'); // Importe a configuração do banco de dados

const Customer = {
  getAllCustomers: async ({ name, email, phone } = {}) => {
    try {
      let query = 'SELECT * FROM customers WHERE 1=1'
      const values = []

      if (name) {
        query += ' AND fullname ILIKE $1'
        values.push(`%${name}%`)
      }

      if (email) {
        query += ` AND email ILIKE $${values.length + 1}`
        values.push(`%${email}%`)
      }

      if (phone) {
        query += ` AND phone ILIKE $${values.length + 1}`
        values.push(`%${phone}%`)
      }

      const result = await db.query(query, values)
      return result.rows
    } catch (error) {
      throw error
    }
  },

  createNewCustomer: async (fullname, email, phone, coordX, coordY) => {
    try {
      // data validation
      if (!fullname || !email || !phone || coordX === undefined || coordY === undefined) {
        throw new Error('Todos os campos são obrigatórios.')
      }
      const query = 'INSERT INTO customers (fullname, email, phone, coordX, coordY) VALUES ($1, $2, $3, $4, $5) RETURNING *'
      const values = [fullname, email, phone, coordX, coordY]
      const result = await db.query(query, values)

      return result.rows[0]
    } catch (error) {
      throw error
    }
  },

  deleteCustomerById: async (customerId) => {
    try {
      const query = 'DELETE FROM customers WHERE id = $1 RETURNING *'
      const values = [customerId]
      const result = await db.query(query, values)

      if (result.rows.length === 0) {
        throw new Error('Cliente não encontrado.')
      }

      return result.rows[0]
    } catch (error) {
      throw error
    }
  },

  updateCustomerById: async (customerId, fullname, email, phone, coordX, coordY) => {
    try {
      // Validação de dados
      if (!fullname || !email || !phone || coordX === undefined || coordY === undefined) {
        throw new Error('Todos os campos são obrigatórios.')
      }

      const query = 'UPDATE customers SET fullname = $2, email = $3, phone = $4, coordX = $5, coordY = $6 WHERE id = $1 RETURNING *'
      const values = [customerId, fullname, email, phone, coordX, coordY]
      const result = await db.query(query, values)

      if (result.rows.length === 0) {
        throw new Error('Cliente não encontrado.')
      }

      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

}

module.exports = Customer
