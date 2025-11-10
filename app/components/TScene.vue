<script setup lang="ts">
  /* eslint-disable vue/attribute-hyphenation */
	import type { Group } from 'three';

	const $canister = ref<Group | null>();
	const $canisterInternal = ref<Group | null>();

	useLoop().onBeforeRender(({elapsed}) => {
		if($canisterInternal.value){
			$canisterInternal.value.rotation.y = Math.PI / 4 - Math.sin(elapsed * 0.25) *
Math.PI / 2		}
	} )
	
</script>

<template>
	<TresGroup :position="[1.5, 2.5, 0]">
	<Levioso> 
		<TresGroup 
			ref="$canister">
				<TresGroup ref="$canisterInternal" >
					<TFilmCanister 
						model="200"
						:rotation="[0,0, Math.PI / 8]"/>
			</TresGroup>
		</TresGroup>
	</Levioso>
</TresGroup>
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
		:position="[-8, 6, 20]"
		:intensity=".5"
		:shadow-mapSize-width="512"
		:shadow-mapSize-height="512"
		:shadow-camera-left="-16"
		:shadow-camera-right="16"
		:shadow-camera-top="16"
		:shadow-camera-bottom="-16"
		
	/>

	<SoftShadows :size="50" :samples="7" />

	<Suspense>
		<Environment 
		files="/textures/lobby2.hdr" 
			:environment-intensity="0.25"
		/>
	</Suspense>
</template>