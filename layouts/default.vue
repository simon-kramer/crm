<script setup lang="ts">
// Consts & imports
const isOpen = ref(false)
const colorMode = useColorMode()
const colorModeButtonLabel = ref('Enable Light Mode')
const route = useRoute()
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

// ColorMode Toggle
const toggleColorMode = () => {
  if (colorMode.preference === 'system') {
    colorMode.preference = 'light'
    colorModeButtonLabel.value = 'Enable Dark Mode'
  } else {
    colorMode.preference = 'system'
    colorModeButtonLabel.value = 'Enable Light Mode'
  }
}

// Breadcrumb Logic
const breadcrumb = computed(() => {
  const breadcrumbLinks = [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    }
  ]
  if (route.path !== '/') {
    const pathSegments = route.path.split('/').filter(Boolean)
    pathSegments.forEach((segment) => {
      breadcrumbLinks.push({
        label: capitalizeFirstLetter(segment),
        icon:
          segment === 'customers'
            ? 'i-heroicons-clipboard-document-list'
            : 'i-heroicons-folder',
        to: `/${segment}`
      })
    })
  }
  return breadcrumbLinks
})

const navigation = [
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    },
    {
      label: 'Customers',
      icon: 'i-heroicons-clipboard-document-list',
      to: '/customers'
    }
  ]
]
</script>

<template>
  <div class="h-screen dark:bg-slate-900">
    <!-- Header & Breadcrumb -->
    <UContainer>
      <div class="flex min-w-full h-16">
        <UContainer class="flex min-w-full items-center justify-start">
          <div class="flex w-full items-center">
            <div class="flex w-[5%]">
              <UButton variant="ghost" @click="isOpen = !isOpen">
                <UIcon name="i-heroicons-bars-3" class="h-6 w-6"
              /></UButton>
            </div>
            <div class="flex w-[85%]"><UBreadcrumb :links="breadcrumb" /></div>
            <div class="flex w-[10%] justify-end">
              <UButton variant="ghost" class="group" @click="toggleColorMode">
                <UIcon name="i-heroicons-swatch" class="h-4 w-4" />
                <span
                  class="inline-block overflow-hidden w-0 group-hover:w-32 transition-width duration-300 ease-linear h-6 whitespace-nowrap"
                  >{{ colorModeButtonLabel }}</span
                >
              </UButton>
            </div>
          </div>
        </UContainer>
      </div>
    </UContainer>
    <UDivider />
    <!-- Navigation Slider -->
    <USlideover v-model="isOpen" side="left">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y'
        }"
      >
        <!-- Navigation Headline -->
        <template #header>
          <div class="flex items-center justify-between">
            <div class="text-md font-medium text-primary">Navigation</div>
            <div><UIcon name="i-heroicons-chevron-down" class="h-4 w-4" /></div>
          </div>
        </template>

        <!-- Main Navigation Items -->
        <UVerticalNavigation :links="navigation" :ui="{ base: 'gap-4' }" />
        <template #footer>
          <div class="flex items-center justify-between">
            <UButton variant="outline">Logout</UButton>
            <p class="text-gray-400">v0.1.20240128</p>
          </div>
        </template>
      </UCard>
    </USlideover>

    <!-- Page Body -->
    <div class="my-12"><slot /></div>

    <!-- Global Footer -->

    <div class="fixed bottom-0 w-full">
      <UDivider
        label="CRM UI"
        :ui="{ label: 'text-primary-500 dark:text-primary-400' }"
      />
      <UContainer>
        <div
          class="flex justify-between items-center p-8 text-gray-300 dark:text-gray-500 text-xs"
        >
          <div>
            &copy; {{ new Date().getFullYear() }} Simon Kramer. All Rights
            Reserved.
          </div>
          <div>
            <NuxtLink
              to="https://github.com/simon-kramer"
              target="_blank"
              external
              ><UIcon
                name="grommet-icons:github"
                dynamic
                class="h-6 w-6 hover:text-gray-300 hover:cursor-pointer"
              ></UIcon
            ></NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
