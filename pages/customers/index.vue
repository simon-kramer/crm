<script lang="ts" setup>
// Const & imports
const selected = ref([])
const page = ref(1)
const pageCount = 10

// Mock Up -- Don't get used with API
const paginatedPeople = computed(() => {
  const startIndex = (page.value - 1) * pageCount
  const endIndex = startIndex + pageCount
  return people.slice(startIndex, endIndex)
})

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
  },
  {
    key: 'actions'
  }
]

const people = [
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

const items = (row) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.id)
    },
    {
      label: 'Lock',
      icon: 'i-heroicons-lock-closed'
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid'
    }
  ]
]
</script>

<template>
  <UCard>
    <UTable
      v-model="selected"
      :rows="paginatedPeople"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No customers found.'
      }"
    >
      <template #name-data="{ row }">
        <span
          :class="[
            selected.find((person) => person.id === row.id) &&
              'text-primary-500 dark:text-primary-400'
          ]"
          >{{ row.name }}</span
        >
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="people.length"
      />
    </div>
  </UCard>
</template>

<style></style>
