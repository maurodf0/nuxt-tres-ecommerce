<script setup lang="ts">
import type { Content } from '@prismicio/client'

defineProps<{
  settings?: Content.SettingsDocument
}>()
</script>

<template>
  <header>
    <nav class="flex justify-between items-center">
      <NuxtLink to="/" class="cta py-mx ml-4">
        <BrandSignature class="text-lg"/>
      </NuxtLink>

      <ul class="xl:w-[calc(40%+2rem)] flex items-center pl-8 pr-4 backdrop-blur gap-5">
       <li v-for="link in settings?.data.navigation" :key="link.key">
          <PrismicLink :field="link" class="cta"/>
        </li>
          <li class="ml-auto">
        <NuxtLink to="/cart" class="cta">
          Cart (0)
        </NuxtLink>
      </li>
      </ul>


    </nav>
  </header>
</template>

<style scoped>
@reference "@/assets/css/main.css";

a {
	@apply transition-opacity duration-300 ease-in-out;
}

header:has(a:hover) a:not(:hover) {
	opacity: .25;
}
</style>