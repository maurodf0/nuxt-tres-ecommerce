<script setup lang="ts">
  /* eslint-disable vue/attribute-hyphenation */
import { useWindowSize } from '@vueuse/core';
import type { Group } from 'three';
import gsap from 'gsap';

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
	
	useGSAP( (isReduceMotion) => {
		if(!$canister.value || !$packaging.value) return

		const $canisterPosition = $canister.position;
		const $packagingPosition = $packaging.position;

		const $canisterRotation = $packaging.rotation;
		const $packagingRotation = $packaging.rotation;

		if(!isReduceMotion && window.scrollY < 20) {
			gsap.fromTo([$canisterPosition,  $packagingPosition], {
				y: -12
			}, {
				y:0,
				delay: 0.3,
				duration: 1,
				stagger: 0.2,
				ease: 'power2.inOut'
			})
		}
	})
</script>

<template>
	<TAbsoluteGroup :x="options.x" :distance="20">
		<TresGroup :position="options.canisterPosition" :scale="options.scale">
			<Levioso>
				<TresGroup ref="$canister">
					<TresGroup ref="$canisterInternal">
						<TFilmCanister
							:model="activeModel"
							:rotation="[0, 0, Math.PI / 8]"
						/>
					</TresGroup>
				</TresGroup>
			</Levioso>
		</TresGroup>
		<TresGroup :position="options.packagingPosition" :scale="options.scale">
			<Levioso>
				<TresGroup ref="$packaging">
					<TFilmPackaging
						:model="activeModel"
						:rotation="[-Math.PI / 2, 0, Math.PI / 3]"
					/>
				</TresGroup>
			</Levioso>
		</TresGroup>
	</TAbsoluteGroup>

	<TresMesh
		receive-shadow
		:position="[0, 0, -4]"
		:rotation="[0, 0, 0]"
	>
		<TresPlaneGeometry :args="[400, 400, 10, 10]" />
		<TresMeshStandardMaterial
			color="#ffffff"
			:roughness="0.5"
			:metalness="0.5"
		/>
	</TresMesh>

	<TresDirectionalLight
		cast-shadow
		:position="[-8, 6, 20]"
		:intensity=".95"
		:shadow-mapSize-width="512"
		:shadow-mapSize-height="512"
		:shadow-camera-left="-16"
		:shadow-camera-right="16"
		:shadow-camera-top="16"
		:shadow-camera-bottom="-16"
		:color="0xFFFFFF"
		dcd8d3
	/>

	<SoftShadows 
		:size="40" 
		:samples="10" 
		:focus="0.5"/>

	<Suspense>
		<Environment
			files="/textures/lobby.hdr"
			:environment-intensity=".25"
		/>
	</Suspense>
</template>