<script setup lang="ts">

  const mounted = ref(false);

  onMounted(() => {
    mounted.value = true;
  })

</script>

<template>

    <figure 
      class="transition-opacity delay-300 duration-1000 ease-in-out"
      :class="{'opacity-0' : !mounted}">
    <TresCanvas>
      <OrbitControls />
      <TresPerspectiveCamera 
        :fov="45"
        :look-at="[0,0,0,0]"
        :position="[0,0,20]" 
        />
          <slot />
        <!-- <TresAxesHelper />
        <TresGridHelper /> -->
    </TresCanvas>
    </figure>
 
</template> 