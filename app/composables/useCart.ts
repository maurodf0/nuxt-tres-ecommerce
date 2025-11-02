import { useLocalStorage } from "@vueuse/core"

//
// 🔹 Tipi TypeScript per definire la struttura dei dati
//

// Ogni elemento nel carrello ha:
// - un prodotto Stripe
// - la quantità scelta
// - e il nome (utile per visualizzarlo)
type CartItem = {
	product: StripeProduct
	quantity: number
	name: string
}

// Il carrello è un oggetto dove
// la chiave è l'id del prodotto (stringa)
// e il valore è un CartItem
type CartItems = Record<string, CartItem>

// Tipi del composable che verranno restituiti
type UseCartReturnType = {
	items: Readonly<Ref<CartItems>>      // Stato reattivo e in sola lettura
	totalPrice: ComputedRef<number>      // Totale in €
	totalItems: ComputedRef<number>      // Numero totale di pezzi
	upsertItem: (item: CartItem) => void // Aggiungi o aggiorna un item
	removeItem: (id: string) => void     // Rimuovi un item
	clear: () => void                    // Svuota completamente il carrello
}

// Chiave per salvare il carrello nel localStorage
const LOCAL_STORAGE_KEY = "farbe-cart"

//
// 🔹 Il composable vero e proprio
//
export function useCart(): UseCartReturnType {
	// `useLocalStorage` crea un ref reattivo sincronizzato con localStorage
	// Se esiste già nel browser, lo carica automaticamente.
	const items = useLocalStorage<CartItems>(LOCAL_STORAGE_KEY, {})

	// Calcola il prezzo totale in tempo reale (computed)
	const totalPrice = computed(() =>
		Object.values(items.value).reduce(
			(sum, item) => sum + item.product.price.amount * item.quantity,
			0
		)
	)

	// Calcola il numero totale di pezzi nel carrello
	const totalItems = computed(() =>
		Object.values(items.value).reduce((sum, item) => sum + item.quantity, 0)
	)

	// 🔹 Aggiungi o aggiorna un item
	function upsertItem(item: CartItem) {
		// Se la quantità è zero o minore, rimuovilo
		if (item.quantity <= 0) {
			removeItem(item.product.id)
			return
		}

		// Altrimenti aggiungilo o aggiornalo
		// (grazie alla reattività, la UI si aggiornerà automaticamente)
		items.value[item.product.id] = item
	}

	// 🔹 Rimuovi un prodotto dal carrello
	function removeItem(id: string) {
		delete items.value[id]
	}

	// 🔹 Svuota completamente il carrello
	function clear() {
		items.value = {}
	}

	// 🔹 Restituisce l’API pubblica del composable
	return {
		items: readonly(items), // Evita modifiche dirette esterne
		totalPrice,
		totalItems,
		upsertItem,
		removeItem,
		clear,
	}
}
