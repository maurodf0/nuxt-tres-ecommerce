import { useServerStripe } from '#stripe/server'


export default defineEventHandler( async (event) => {
  //Fetch data from Stripe
  const stripe = await useServerStripe(event);

  const {data: products } = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })
  //Format it correctly
  const productMap: Record<string, StripeProduct> = {}

  products.forEach((product) => {
    if(
      product.default_price && 
      typeof product.default_price === 'object' && 
      product.default_price.unit_amount
    )  {
        
        productMap[product.id] = {
          id: product.id,
          price: {
            id: product.default_price.id,
            amount: product.default_price.unit_amount
          }
        }

      } 
    
    })

  //Return data
  return productMap
  
})