<script setup lang="ts">
// Consts & imports
const isOpen = ref(false);
const colorMode = useColorMode();
const colorModeButtonLabel = ref("Enable Light Mode");
const route = useRoute();
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// ColorMode Toggle
const toggleColorMode = () => {
  if (colorMode.preference === "system") {
    colorMode.preference = "light";
    colorModeButtonLabel.value = "Enable Dark Mode";
  } else {
    colorMode.preference = "system";
    colorModeButtonLabel.value = "Enable Light Mode";
  }
};

// Breadcrumb Logic
const breadcrumb = computed(() => {
  const breadcrumbLinks = [
    {
      label: "Dashboard",
      icon: "i-heroicons-home",
      to: "/",
    },
  ];
  if (route.path !== "/") {
    const pathSegments = route.path.split("/").filter(Boolean);
    pathSegments.forEach((segment) => {
      breadcrumbLinks.push({
        label: capitalizeFirstLetter(segment),
        icon:
          segment === "customers"
            ? "i-heroicons-clipboard-document-list"
            : "i-heroicons-folder",
        to: `/${segment}`,
      });
    });
  }
  return breadcrumbLinks;
});
</script>

<template>
  <div class="h-screen dark:bg-slate-900">
    <div class="flex min-w-full h-16 border-b border-primary-700">
      <UContainer class="flex min-w-full items-center justify-start">
        <div class="flex w-full items-center">
          <div class="flex w-[5%]">
            <UIcon
              name="i-heroicons-bars-3"
              class="h-8 w-8"
              @click="isOpen = !isOpen"
            />
          </div>
          <div class="flex w-[85%]"><UBreadcrumb :links="breadcrumb" /></div>
          <div class="flex w-[10%] justify-end">
            <UButton label="Toggle" @click="toggleColorMode" variant="outline"
              ><UIcon name="i-heroicons-swatch" class="h-4 w-4" />{{
                colorModeButtonLabel
              }}</UButton
            >
          </div>
        </div>
      </UContainer>
    </div>

    <USlideover v-model="isOpen" side="left">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-primary dark:divide-primary-700',
        }"
      >
        <template #header>
          <div class="text-lg font-medium">Navigation</div>
        </template>

        <div>Navigation links here</div>

        <template #footer>
          <div class="flex items-center justify-between">
            <UButton variant="outline">Logout</UButton>
            <p class="text-gray-400">v0.1.20240128</p>
          </div>
        </template>
      </UCard>
    </USlideover>
    <div class="mt-6"><slot /></div>
  </div>
</template>
