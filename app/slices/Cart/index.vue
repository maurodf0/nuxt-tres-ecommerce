<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CartSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const { items, removeItem, totalPrice } = useCart();
</script>

<template>
	<div>
		<Slidein
			id="cart"
			as="form"
			class="bounded rich-text min-h-screen flex flex-col"
			method="POST"
			action="/api/checkout"
		v-bind="getSceneAttributes({
			position: 'center',
			model: $prismic.isFilled.contentRelationship(slice.primary.product) ? slice.primary.product.uid : undefined,
		})"
		>
		<PrismicRichText :field="slice.primary.title" />
		<ClientOnly>
			<template v-if="Object.keys(items).length">
				<PrismicRichText :field="slice.primary.text" />
				<ul class="mt-16 max-w-[40ch]">
					<li v-for="item in items" :key="item.product.id" class="flex items-center">
						<span class="flex-1">{{ item.name }}</span> 
						<span class="flex-1 text-right" :aria-label="`Quantity for ${item.name}`">{{ item.quantity }}</span> 
						<span class="flex-1 text-right"
						:aria-label="`Price for ${item.name}`">{{ formatPrice(item.product.price.amount * item.quantity)  }}</span>
						<button 
							type="button" 
							@click="removeItem(item.product.id)"
							class="cta w-12.5 -mr-4">
							x
						</button>
						<input type="hidden" :name="item.product.price.id" :value="item.quantity">
					</li>	
				</ul>
				<hr clas="max-w-[40ch]" />
				<p aria-label="Total Price" class="text-right pr-8.5">{{ formatPrice(totalPrice) }}</p>
				<button type="submit" class="cta primary mt-16 max-w-[40ch] w-full">Checkout</button>
			</template>
			<PrismicRichText v-else :field="slice.primary.empty_text" />
		</ClientOnly>
	</Slidein>
</div>
</template>
