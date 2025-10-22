<script setup lang="ts">
import { gsap } from "gsap"
defineProps<{
  as?: string
}>()

const el = shallowRef<HTMLElement>()

useGSAP((isReducedMotion) => {
  if(!el.value) return
  	if (isReducedMotion) {
		return
	}

  gsap.set(el.value, {
    opacity:1,
  })

  gsap.from(el.value.children, {
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out",
    stagger: 0.2, 
    scrollTrigger: {
      trigger: el.value,
      start: 'top bottom-=25%',
    }
  })
})

</script>

<template>
  <component :is="as || 'section'" ref="el" >
    <slot />
  </component>
</template>