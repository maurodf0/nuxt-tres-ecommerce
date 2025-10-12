<script setup lang="ts">
import type { Content } from '@prismicio/client'

defineProps<{
  settings?: Content.SettingsDocument
}>()
</script>

<template>
  <header>
    <nav>
      <NuxtLink to="/">
        <BrandSignature />
      </NuxtLink>

      <ul>
       <li v-for="link in settings?.data.navigation" :key="link.key">
          <PrismicLink :field="link" />
        </li>
      </ul>
      <li>
        <NuxtLink to="/cart">
          Cart
        </NuxtLink>
      </li>

    </nav>
  </header>
</template>