<script setup lang="ts">
import type { Content } from "@prismicio/client";

import DescriptionDetails from "./DescriptionDetails.vue"
import DescriptionList from "./DescriptionList.vue";
import DescriptionTerm from "./DescriptionTerm.vue";
import Div from "./Div.vue";
import PassThrough from "./PassThrough.vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(getSliceComponentProps<Content.ProductSlice>());
console.log(props.slice.primary.product);
const prismic = usePrismic();
const product = computed( () => {
	const prismicProduct = props.slice.primary.product
	
	if(!prismic.isFilled.contentRelationship(prismicProduct) || !prismicProduct.data.stripe_id) {
		return undefined ;
	}

	return {
		...prismicProduct
	} 
})
</script>

<template>

   <Slidein 
	 v-if="product"
	 as="article"
	 class="bounded rich-text min-h-[150vh] flex flex-col justify-center">
			<header :id="product.uid" class="rich-text pt-[25vh]">
				<PrismicRichText :field="product.data?.name" />
					<p aria-label="Price">TODO / ROLL</p>
			</header>
			<section class="rich-text">
				<h3 class="sr-only">Description</h3>
				<PrismicRichText :field="product.data?.description" />
			</section>
			<section class="rich-text">
				<h3 class="sr-only">Charateristics</h3>
				<PrismicTable 
					:field="product.data?.characteristic"
					:components="{
						table: DescriptionList,
						tbody: PassThrough,
						tr: Div,
						th: DescriptionTerm,
						td: DescriptionDetails
					}"
					 />
			</section>
	 </Slidein>

   <Slidein v-else>
		<p>Product not found</p>
	 </Slidein>

</template>
