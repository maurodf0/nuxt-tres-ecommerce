<script setup lang="ts">
import type { Content } from "@prismicio/client";

import DescriptionDetails from "./DescriptionDetails.vue"
import DescriptionList from "./DescriptionList.vue";
import DescriptionTerm from "./DescriptionTerm.vue";
import Div from "./Div.vue";
import PassThrough from "./PassThrough.vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
	getSliceComponentProps<Content.ProductSlice, 
	{ stripeProducts: Record<string, StripeProduct> }>());


const prismic = usePrismic();
const product = computed( () => {
	const prismicProduct = props.slice.primary.product
	console.log(prismicProduct);
	if(!prismic.isFilled.contentRelationship(prismicProduct) || !prismicProduct.data?.stripe_id) {
		return undefined ;
	}

	const stripeProduct = props.context.stripeProducts[prismicProduct.data?.stripe_id]
	console.log(props.context)

	if(!stripeProduct){
		return undefined
	}

	return {
		...prismicProduct,
		stripeProduct
	} 
})

const quantity = ref<number>(1);
const setQuantity = (value: number) => {
	quantity.value = Math.max(1, value);
}

const onSubmit = () => {
	const { items, upsertItem } = useCart()
	if(!product.value){
		return
	}

const maybeCartQuantity = items.value[product.value.stripeProduct.id]?.quantity ?? 0

const singleItem = {
	product: product.value.stripeProduct,
	quantity: maybeCartQuantity + quantity.value,
	name: prismic.asText(product.value.data?.name) ?? ''
}
console.log(singleItem)
upsertItem(singleItem)
	setQuantity(1);
}




</script>

<template>

   <Slidein 
	 v-if="product"
	 as="article"
	 class="bounded rich-text min-h-[150vh] flex flex-col justify-center">
			<header :id="product.uid" class="rich-text pt-[25vh]">
				<PrismicRichText :field="product.data?.name" />
					<p aria-label="Price">{{ formatPrice(product.stripeProduct.price.amount) }} / ROLL</p>
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
			<form class="mt-16 text-sm flex max-w-[calc(40ch+1rem)] -ml-4 items-start" @submit.prevent="onSubmit">
				<div class="flex-1 flex items-center">
					<button class="cta" type="button" @click="setQuantity(quantity - 1)">
						-
					</button>
					<div class="flex-1 text-center">{{ quantity }}</div>
					<button class="cta" type="button" @click="setQuantity(quantity + 1)">
						+
					</button>
				</div>
				<div class="flex-1">
					<button class="w-full cta primary" type="submit">Add to Cart</button>
				</div>
			</form>
	 </Slidein>

   <Slidein 
	 	v-else
		as="article"
		class="bounded rich-text flex flex-col justify-center">
		<p>Product not found</p>
	 </Slidein>

</template>
