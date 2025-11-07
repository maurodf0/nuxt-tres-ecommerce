<script setup lang="ts">

const prismic = usePrismic()
const { data: settings } = await useAsyncData('settings',() =>
  prismic.client.getSingle('settings', )
)

const route = useRoute();
const {clear} = useCart();


useSeoMeta({
  title: settings.value?.data.site_title,
  ogTitle: settings.value?.data.site_title,
  description: settings.value?.data.meta_description,
  ogDescription: settings.value?.data.meta_description,
  ogImage: () => prismic.asImageSrc(settings.value?.data.meta_image)
})

onMounted( () => {
  if(route.query.order === 'completed'){
    clear();
    useRouter().replace({
      path: route.path
    })
  }
})

</script>

<template>
  <div>
    <AppHeader :settings="settings" class="fixed top-0 left-0 right-0 z-30" />
    <slot />
    <AppFooter :settings="settings"/>
    <TCanvas class="fixed top-0 left-0 right-0 bottom-0 h-1vh z-1" />
  </div>
</template>

