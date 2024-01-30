export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    customersLoading: false,
    error: null
  }),
  actions: {
    async fetchCustomers() {
      // loading state for the customers data
      this.customersLoading = true
      this.error = null
      try {
        const axios = useAxios()
        const response = await axios.get('/customers')
        this.customers = response
        // should be typed as AxiosError e.g., 'any' used only for prototyping purposes
      } catch (e: any) {
        // assigning to be able to use the error message properly e.g. in a toast
        this.error = e.message
      } finally {
        this.customersLoading = false
      }
    }
  }
})
