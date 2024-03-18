# CRM

## Informations

The CRM can execute all basic CRUD operations and has a few small extras. However, it's important to note that type safety is not guaranteed everywhere, and the current /pages as well as the default.vue layout would need to be refactored in a real environment including the header, footer, user menu, etc., as well as the InfoBanner, DataTable, Pagination, and EditModal. Certain functions, such as pagination, are also dependent on the Mock API; normally, they would be implemented via the store over the meta of the /customer response and not "manually" formed via method.

For rapid prototyping, Nuxt UI was used, with additional technologies including Nuxt 3.10.0, Vue 3.3.9, Pinia 0.5.1 (2.x) as centralized store management. Implemented as modules through Nuxt itself and not as standalone dependencies to enable centralized management via the Nuxt DevTools and ensure a better overview.

Since the Nuxt 3.9.x update, the NuxtUI has been throwing hydration warnings, which, however, are supposed to be resolved with the new Vue version 3.5, as it will then be possible to use a Vue-specific composable for implementation. The issue is already listed on GitHub as NuxtUI Hydration.[Github Issue: NuxtUI Hydration](https://github.com/nuxt/ui/issues/1171).

## Setup/Install

```bash
# yarn
yarn install

```

## DB Server (json-server)

To start the Mock API DB Server:

```bash
# yarn
yarn startdb

```

## Dev Server

```bash
# yarn
yarn run dev -o

```
