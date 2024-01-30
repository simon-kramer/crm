<script lang="ts" setup>
import type { Customer } from '@/models/customers'
// Const & imports
const selected = ref([])
const page = ref(1)
const pageCount = 10
const isModalOpen = ref(false)
const currentRow = ref<Customer | null>(null)
const showAlert = ref(true)
const customerStore = useCustomerStore()

const handleEditModal = (row: Customer) => {
  currentRow.value = row
  isModalOpen.value = true
}

const customers = computed(() => customerStore.customers)
const customersLoading = computed(() => customerStore.customersLoading)

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

const customer = [
  {
    id: 1,
    first_name: 'Lindsay',
    last_name: 'Walton',
    email: 'lindsay.walton@example.com',
    status: true
  },
  {
    id: 2,
    first_name: 'Courtney',
    last_name: 'Henry',
    email: 'courtney.henry@example.com',
    status: false
  },
  {
    id: 3,
    first_name: 'Tom',
    last_name: 'Cook',
    email: 'tom.cook@example.com',
    status: true
  },
  {
    id: 4,
    first_name: 'Whitney',
    last_name: 'Francis',
    email: 'whitney.francis@example.com',
    status: false
  },
  {
    id: 5,
    first_name: 'Leonard',
    last_name: 'Krasner',
    email: 'leonard.krasner@example.com',
    status: true
  },
  {
    id: 6,
    first_name: 'Floyd',
    last_name: 'Miles',
    email: 'floyd.miles@example.com',
    status: true
  },
  {
    id: 7,
    first_name: 'Avery',
    last_name: 'Stewart',
    email: 'avery.stewart@example.com',
    status: false
  },
  {
    id: 8,
    first_name: 'Jesse',
    last_name: 'Bradley',
    email: 'jesse.bradley@example.com',
    status: true
  },
  {
    id: 9,
    first_name: 'Daisy',
    last_name: 'Banks',
    email: 'daisy.banks@example.com',
    status: true
  },
  {
    id: 10,
    first_name: 'Alex',
    last_name: 'Ortiz',
    email: 'alex.ortiz@example.com',
    status: false
  },
  {
    id: 11,
    first_name: 'Riley',
    last_name: 'Moore',
    email: 'riley.moore@example.com',
    status: true
  },
  {
    id: 12,
    first_name: 'Jordan',
    last_name: 'Patel',
    email: 'jordan.patel@example.com',
    status: false
  },
  {
    id: 13,
    first_name: 'Taylor',
    last_name: 'Jenkins',
    email: 'taylor.jenkins@example.com',
    status: true
  },
  {
    id: 14,
    first_name: 'Casey',
    last_name: 'Reed',
    email: 'casey.reed@example.com',
    status: true
  },
  {
    id: 15,
    first_name: 'Jamie',
    last_name: 'Cruz',
    email: 'jamie.cruz@example.com',
    status: false
  },
  {
    id: 16,
    first_name: 'Morgan',
    last_name: 'Bishop',
    email: 'morgan.bishop@example.com',
    status: true
  },
  {
    id: 17,
    first_name: 'Jordan',
    last_name: 'Gilbert',
    email: 'jordan.gilbert@example.com',
    status: false
  },
  {
    id: 18,
    first_name: 'Charlie',
    last_name: 'Lane',
    email: 'charlie.lane@example.com',
    status: true
  },
  {
    id: 19,
    first_name: 'Alex',
    last_name: 'Green',
    email: 'alex.green@example.com',
    status: true
  },
  {
    id: 20,
    first_name: 'Cameron',
    last_name: 'Tucker',
    email: 'cameron.tucker@example.com',
    status: false
  }
]

const saveChanges = () => {
  /* handle save changes */
}

onMounted(() => {
  customerStore.fetchCustomers()
})
</script>

<template>
  <div class="flex-wrap space-y-12">
    <UAlert
      v-if="showAlert"
      icon="i-heroicons-light-bulb"
      color="primary"
      variant="subtle"
      title="Good to know!"
      description="If you're clicking on a row inside the table, it will open the edit modal to customize the details of the customers."
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'gray',
        variant: 'link',
        padded: false
      }"
      @close="showAlert = false"
    />
    <UCard>
      <UTable
        v-model="selected"
        :rows="customers"
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
          :total="customer.length"
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
