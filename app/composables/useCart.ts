type CartItem = {
  product: StripeProduct,
  quantity: number,
  name: string
}

// Tipizzazione di CartItems, 
// Cart Items è un oggetto chiave valore che avrà
//una stringa come chiave e un oggetto CartItem come valore
type CartItems = Record<string, CartItem>

type useCartReturnType = {
  items: unknown,
  totalPrice: ComputedRef<number>,
  totalItems: ComputedRef<number>
}

export const useCart = () => {

}