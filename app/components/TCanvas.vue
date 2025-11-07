<script setup lang="ts">
</script>

<template>

    <figure>
    <TresCanvas>
      <OrbitControls />
      <TresPerspectiveCamera 
        :fov="45"
        :look-at="[0,0,0,0]"
        :position="[0,0,20]" 
        />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]"/>
        <TresMeshBasicMaterial color="white" />
      </TresMesh>
        <TresAxesHelper />
        <TresGridHelper />
    </TresCanvas>
    </figure>
 
</template> 