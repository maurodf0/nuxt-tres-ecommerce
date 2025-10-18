<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to \`getSliceComponentProps\` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.RichTextSlice>(
));
</script>

<template>
  <section class="bounded rich-text">
    <PrismicRichText :field="slice.primary.title" />
    <PrismicRichText :field="slice.primary.text" />
    <div v-if="slice.primary.ctas" class="mt-16 flex -ml-4">
  <PrismicLink 
   v-for="link in slice.primary.ctas" :key="link.key"
   :field="link" :class="link.variant" class="cta" />
    </div>
  </section>
</template>

<style scoped>
section:deep(.richtext) {
  max-width: 600px;
  margin: 6em auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

section:deep(.richtext .codespan) {
  font-family: monospace;
}
</style>
