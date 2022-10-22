import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  pricesProducts: 0 // общая цена продукции
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.basket = [...state.basket, action.payload]
      state.pricesProducts = state.basket.reduce((sum, current) => {
        return sum + current.price
      }, 0)
    },
    removeProductBasket (state, action) {
      state.basket = state.basket.filter((item) => item.idx !== action.payload.idx
      )
      state.pricesProducts = state.basket.reduce((sum, current) => {
        return sum = sum + current.price
      }, 0)
    }
  }
})

export const { addProduct, removeProductBasket } = basketSlice.actions

export default basketSlice.reducer