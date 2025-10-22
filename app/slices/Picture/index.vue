<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.PictureSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
		class="grid md:grid-cols-[3fr_2fr]"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
	<figure class="contents">
   	<PrismicImage 
			:field="slice.primary.picture" 
			 class="z-20 w-full row-span-2"
			 loading="lazy"/>
		<Slidein
			class="px-4 pt-4 pb-16 rich-text"
			:class="{
				'md:self-start' : slice.variation === 'default' || slice.variation === 'bottom',
				'md:order-last md:self-end' : slice.variation === 'top'

			}">
			<PrismicRichText :field="slice.primary.caption" />
		</Slidein>
	</figure>

		<figure 
		v-if="$prismic.isFilled.image(slice.primary.secondary_picture)"
		class="flex flex-col"
		:class="{
			'md:self-end' : slice.variation === 'default' || slice.variation === 'bottom',
			'md:order-start' : slice.variation === 'top'
		}">
			<PrismicImage 
				:field="slice.primary.secondary_picture" 
				class="z-20 w-full"
				loading="lazy"/>
			<Slidein 
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'md:order-first' : slice.variation === 'bottom'
				}">
				<PrismicRichText :field="slice.primary.secondary_caption" />
			</Slidein>
	</figure>
	
		
  </section>
</template>
