<script setup lang="ts">

</script>

<template>
        <TresMesh cast-shadow>
          <TresTorusGeometry :args="[1, 0.5, 16, 32]"/>
          <TresMeshBasicMaterial color="blue" />
      </TresMesh>

        <TresMesh 
          receive-shadow
          :position="[0,0,-4]">
          <TresPlaneGeometry :args="[400, 400, 10, 10]"/>
          <TresMeshStandardMaterial 
            color="white" 
            :roughness="0.5"
            :metalness="0.5"
          />
      </TresMesh>

      <TresDirectionalLight 
        cast-shadow
        :position="[-6,6,20]"
        :intensity=".5"
        />
</template>