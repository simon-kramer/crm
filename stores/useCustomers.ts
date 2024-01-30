import { defineStore } from 'pinia'
import { type Customer } from '@/models/customers'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [] as Customer[],
    customersLoading: false,
    error: null
  }),
  actions: {
    async fetchCustomers() {
      this.customersLoading = true
      this.error = null
      try {
        const response = await useAxios().get<Customer[]>('/customers')
        this.customers = response
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    },

    async updateCustomer(customerId: string, updates: Partial<Customer>) {
      this.customersLoading = true
      this.error = null
      try {
        await useAxios().patch(`/customers/${customerId}`, updates)
        const index = this.customers.findIndex((c) => c.id === customerId)
        if (index !== -1) {
          Object.assign(this.customers[index], updates)
        }
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    }
  }
})
