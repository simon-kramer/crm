<script setup lang="ts">
// Consts & imports
const isOpen = ref(false);
const colorMode = useColorMode();
const route = useRoute();
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// ColorMode Toggle
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "system" ? "light" : "system";
};

// Breadcrumb Logic
const links = computed(() => {
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
    <div class="flex min-w-full h-12 border-b border-primary">
      <UContainer class="flex min-w-full items-center justify-start">
        <div class="flex w-full items-center">
          <div class="flex w-[5%]">
            <UIcon
              name="i-heroicons-bars-3"
              class="h-8 w-8"
              @click="isOpen = !isOpen"
            />
          </div>
          <div class="flex w-[85%]"><UBreadcrumb :links="links" /></div>
          <div class="flex w-[10%] justify-end">
            <UButton label="Toggle" @click="toggleColorMode" variant="outline"
              ><UIcon name="i-heroicons-swatch" class="h-4 w-4" />Color
              Mode</UButton
            >
          </div>
        </div>
      </UContainer>
    </div>

    <USlideover v-model="isOpen" side="left">
      <div class="flex-1"></div>
    </USlideover>
    <div class="mt-6"><slot /></div>
  </div>
</template>
