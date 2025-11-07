<script setup lang="ts">
</script>

<template>

    <figure>
    <TresCanvas>
      <TresPerspectiveCamera 
        :fov="45"
        :look-at="[0,0,0,0]"
        :position="[0,0,20]" 
        />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]"/>
        <TresMeshBasicMaterial color="blue"/>
      </TresMesh>
    </TresCanvas>
    </figure>
 
</template> 