<script lang="ts" setup>
import type { Customer } from '@/models/customers'
// Const & imports
const customerStore = useCustomerStore()

// Selection logic
const selected = ref([])
const selectedCountText = computed(() => {
  const total = customersPaginated.value.length
  const selectedCount = selected.value.length

  if (selectedCount === 0) return ''
  if (selectedCount === total) return 'All Selected'
  return `${selectedCount} selected`
})

const setCustomersStatus = (newStatus: boolean) => {
  const selectedIds = selected.value.map((customer) => customer.id)
  customerStore.updateCustomersStatus(selectedIds, newStatus)
}

// Modal logic
const currentRow = ref<Customer | null>(null)

const handleEditModal = (row: Customer) => {
  currentRow.value = row
  isModalOpen.value = true
}
const isModalOpen = ref(false)

// Customers & Pagination handling
const customers = computed(() => customerStore.customers)
const customersLoading = computed(() => customerStore.customersLoading)

// Pagination via index based on page number for the mockup purpose
const customersPaginated = computed(() => {
  const startIndex = (page.value - 1) * pageCount
  const endIndex = startIndex + pageCount
  return customers.value.slice(startIndex, endIndex)
})
const page = ref(1)
const pageCount = 10
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
    <!-- Alert/InfoBanner -->
    <UAlert
      icon="i-heroicons-light-bulb"
      color="primary"
      variant="subtle"
      title="Good to know!"
      description="If you're clicking on a row inside the table, it will open the edit modal to customize the details of the customer selected."
    />

    <!-- Customer Datatable -->
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
        v-if="selectedCountText"
        class="flex justify-between border-t pt-6 border-gray-200 dark:border-gray-700"
      >
        <div class="flex gap-x-6">
          <UBadge color="primary" variant="subtle">{{
            selectedCountText
          }}</UBadge>
          <div class="flex gap-x-2">
            <UButton
              variant="soft"
              color="primary"
              size="xs"
              @click="() => setCustomersStatus(true)"
              >Set selected to Active</UButton
            >
            <UButton
              variant="soft"
              color="red"
              size="xs"
              @click="() => setCustomersStatus(false)"
              >Set selected to Locked</UButton
            >
          </div>
        </div>
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="totalCustomers"
        />
      </div>
      <div
        v-else
        class="flex justify-end border-t pt-6 border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="totalCustomers"
        />
      </div>
    </UCard>

    <!-- Edit Modal -->
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
