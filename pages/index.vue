<script lang="ts" setup>
// Const & imports

const showAlert = ref(true)

</script>

<template>
  <UContainer>
    <div class="flex w-full">
      <UAlert v-if="showAlert"
        icon="i-heroicons-cake"
        title="Welcome to your Dashboard!"
        description="Here you can change, edit, delete or manipulate data as you need. Please make sure to manage all customers correctly and keep your data up to date. If there is any issue with the data, please contact us with a distinguished description about the problem."
        color="primary"
        variant="solid"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'link', padded: false }"
        @close="showAlert = false"
      />
    </div>
  </UContainer>
</template>

<style></style>
