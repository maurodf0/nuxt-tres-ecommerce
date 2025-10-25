<script setup lang="ts">
import type { Content } from "@prismicio/client";

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

   <Slidein v-if="product">
		{{product }}
	 </Slidein>

   <Slidein v-else>
		<p>Product not found</p>
	 </Slidein>

</template>
