import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "./product.model";
import { Cart } from "./cart";
import { computed, inject } from "@angular/core";
import { ProductService } from "./product.service";
import { tapResponse } from '@ngrx/operators';
import { exhaustMap } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { select } from "@ngrx/store";


interface State {
    products: Product[];
    cart: Cart;
    category: string | null;
    error: any | null;
}

const initialState: State = {
    products: [],
    cart: { id: 0, items: [] },
    category: '',
    error: null,
}

export const ProductsStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed(({products, category}) => ({
        filteredProducts: computed(() => products().filter(p => category() ? p.category === category() : true))
    })),
    withMethods((store, productsService = inject(ProductService)) => ({
        addProductToCart: (product: Product) => {
            const cart = store.cart();
            const item = cart.items.find(i => i.product.id === product.id);
            if (item) {
                item.quantity++;
            } else {
                cart.items.push({ product, quantity: 1 });
            }
            patchState(store, { cart });
        },
        selectCategory: (category: string | null) => patchState(store, { category }),
        loadProducts: rxMethod<void>(
            exhaustMap(() => productsService.getProducts().pipe(
                tapResponse({
                    next: (products: Product[]) => patchState(store, { products }),
                    error: (error: any) => patchState(store, { error })
                })
            )
        )
    )
    }))
);
