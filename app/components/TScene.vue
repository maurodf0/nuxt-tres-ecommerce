<script setup lang="ts">
  /* eslint-disable vue/attribute-hyphenation */
	import { useWindowSize } from '@vueuse/core';
import type { Group } from 'three';

	const { width } = useWindowSize()

	const activeModel = ref<string>('800');
	const $canister = ref<Group | null>();
	const $canisterInternal = ref<Group | null>();
	const $packaging = ref<Group | null>();

	useLoop().onBeforeRender(({elapsed}) => {
		if($canisterInternal.value){
			$canisterInternal.value.rotation.y = Math.PI / 4 - Math.sin(elapsed * 0.25) *
Math.PI / 2		}
	} )

const options = computed(() => {
	if (width.value >= 1280) {
		return {
			x: 0.33,
			canisterPosition: [1.5, 2.5, 0],
			packagingPosition: [-1.5, -2.5, 0],
			scale: 1,
		} as const
	}

	return {
		x: 0.5,
		canisterPosition: [2.5, 4.5, 0],
		packagingPosition: [-2.5, -5, 0],
		scale: 0.75,
	} as const
})
	
</script>

<template>
	<TAbsoluteGroup :x="options.x" :distance="20">
		<TresGroup :position="[1.5, 2.5, 0]" :scale="options.scale">
		<Levioso> 
			<TresGroup 
				ref="$canister">
					<TresGroup ref="$canisterInternal" >
						<TFilmCanister 
							:model="activeModel"
							:rotation="[0,0, Math.PI / 8]"/>
				</TresGroup>
			</TresGroup>
		</Levioso>
	</TresGroup>
</TAbsoluteGroup>

	<TAbsoluteGroup :x="options.x" :distance="20">
		<TresGroup :position="[-1.5, -2.5, 0]" :scale="options.scale">
		<Levioso> 
			<TresGroup 
				ref="$packaging">
						<TFilmPackaging 
							:model="activeModel"
							:rotation="[-Math.PI / 2, 0, Math.PI / 5]"/>
			
			</TresGroup>
		</Levioso>
</TresGroup>
</TAbsoluteGroup>

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
		files="/textures/lobby.hdr" 
			:environment-intensity="0.5"
		/>
	</Suspense>
</template>