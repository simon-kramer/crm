<script lang="ts" setup>
import type { Customer } from '@/models/customers'
// Const & imports
const customerStore = useCustomerStore()
const selected = ref([])
const page = ref(1)
const pageCount = 10
const isModalOpen = ref(false)
const currentRow = ref<Customer | null>(null)
const showInfoBanner = ref(true)

const handleEditModal = (row: Customer) => {
  currentRow.value = row
  isModalOpen.value = true
}

// Customers & Pagination handling
const customers = computed(() => customerStore.customers)
const customersLoading = computed(() => customerStore.customersLoading)
// Pagination via index based on page number for the mockup purpose, mock API does not provide meta
const customersPaginated = computed(() => {
  const startIndex = (page.value - 1) * pageCount
  const endIndex = startIndex + pageCount
  return customers.value.slice(startIndex, endIndex)
})

const totalCustomers = computed(() => customers.value.length)

// Column definitions
const columns = [
  {
    key: 'first_name',
    label: 'First Name',
    sortable: true
  },
  {
    key: 'last_name',
    label: 'Last Name',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true
  }
]

const saveChanges = () => {
  if (currentRow.value) {
    const updates = {
      first_name: currentRow.value.first_name,
      last_name: currentRow.value.last_name,
      email: currentRow.value.email,
      status: currentRow.value.status
    }
    customerStore.updateCustomer(currentRow.value.id, updates)
    isModalOpen.value = false
  }
}

onMounted(() => {
  customerStore.fetchCustomers()
})
</script>

<template>
  <div class="flex-wrap space-y-12">
    <UAlert
      v-if="showInfoBanner"
      icon="i-heroicons-light-bulb"
      color="primary"
      variant="subtle"
      title="Good to know!"
      description="If you're clicking on a row inside the table, it will open the edit modal to customize the details of the customer selected."
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'gray',
        variant: 'link',
        padded: false
      }"
      @close="showInfoBanner = false"
    />
    <UCard>
      <UTable
        v-model="selected"
        :rows="customersPaginated"
        :columns="columns"
        :loading="customersLoading"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No customers found.'
        }"
        @select="handleEditModal"
      >
        <template #name-data="{ row }">
          <span
            :class="[
              selected.find((person: any) => person.id === row.id) &&
                'text-primary-500 dark:text-primary-400'
            ]"
            >{{ row.name }}</span
          >
        </template>
        <template #status-data="{ row }">
          <UBadge :color="row.status ? 'primary' : 'red'" variant="subtle">{{
            row.status ? 'Active' : 'Locked'
          }}</UBadge>
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="totalCustomers"
        />
      </div>
    </UCard>

    <UModal v-model="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="font-medium text-md">Edit Customer</h2>
            <UButton
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isModalOpen = false"
            />
          </div>
        </template>

        <div v-if="currentRow" class="space-y-6">
          <div class="flex justify-between">
            <div>
              <label for="first_name" class="text-sm font-medium"
                >First Name</label
              >
              <UInput
                v-model="currentRow.first_name"
                label="First Name"
                :disabled="!currentRow.status"
              />
            </div>
            <div>
              <label for="last_name" class="text-sm font-medium"
                >Last Name</label
              >
              <UInput
                v-model="currentRow.last_name"
                label="Last Name"
                :disabled="!currentRow.status"
              />
            </div>
          </div>
          <div>
            <label for="email" class="text-sm font-medium"
              >E-Mail Address</label
            >
            <UInput
              v-model="currentRow.email"
              label="Email"
              :disabled="!currentRow.status"
            />
          </div>
          <div class="flex justify-between items-center">
            <div>
              <label for="status" class="text-sm font-medium">Status</label>
              <p class="text-xs font-light">(active or locked)</p>
            </div>
            <div class="flex items-center gap-x-4">
              <UBadge
                :color="currentRow.status ? 'primary' : 'red'"
                variant="subtle"
                >{{ currentRow.status ? 'Active' : 'Locked' }}</UBadge
              >
              <UToggle v-model="currentRow.status" label="Status" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton variant="solid" color="primary" @click="saveChanges"
              >Save Changes</UButton
            >
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
