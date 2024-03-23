import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {productsApi} from '../Services/fetchProducts.js';
import addToCartReducer from '../features/addtoCartSlice.js';
import userReducer from '../features/userSlice.js'
import userShippingAddressReducer from '../features/addShippingInfo.js'
import orderReducer from '../features/orderSlice.js'
import addReviewReducer from '../features/addReview.js'
export const store= configureStore({
    reducer:{
        cart:addToCartReducer,
        shippingAddress:userShippingAddressReducer,
        user:userReducer,
        order:orderReducer,
        review:addReviewReducer,
        [productsApi.reducerPath]:productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);