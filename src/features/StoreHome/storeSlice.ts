import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import * as api from '../../api/base';
import { getStoreitems } from '../../api/endpoints';

// Define a type for the slice state
type CartItem = {
  id : number,
  quantity: number
}

type storeItem = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

type storeItems = storeItem[]

interface StoreState {
  isOpen: boolean
  cartQuantity: number
  cartItems: CartItem[],
  storeItems: storeItems,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

// Define the initial state using that type
const initialState: StoreState = {
  isOpen: false,
  cartQuantity: 0,
  cartItems: [],
  storeItems: [],
  loading: 'idle'
}

export const fetchStoreitems = createAsyncThunk(
  'store/fetchStoreItems',
  async () => {
    const response = await api.get(getStoreitems)
    return response.data
  }
)


export const storeSlice = createSlice({
  name: 'cartStore',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increaseCartQuantity(state, action: PayloadAction<number>) {
        const currItems = [...state.cartItems]
        if (currItems.find(item => item.id === action.payload) == null) {
          state.cartItems = [...currItems, { id: action.payload, quantity: 1 }]
        } else {
          state.cartItems = currItems.map(item => {
            (item)
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity + 1 }
            } else {
              return item
            }
          })
        }
    },
    decreaseCartQuantity(state, action: PayloadAction<number>) {
      const currItems = [...state.cartItems]
      const id = action.payload
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        state.cartItems = currItems.filter(item => item.id !== id)
      } else {
        state.cartItems = currItems.map(item => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const currItems = [...state.cartItems]
      const id = action.payload
      state.cartItems =  currItems.filter(item => item.id !== id)
    },
    toggleOpenCart(state) {
      state.isOpen = !state.isOpen
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchStoreitems.fulfilled, (state, action) => {
      // Add user to the state array
      state.storeItems = action.payload
    })
  },
})

export const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, toggleOpenCart } = storeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getItemQuantity = (state: RootState, id: number) => {
  return state.cartStore.cartItems.find(item => item.id === id)?.quantity || 0
}

export const getcartQuantity =  (state: RootState) => state.cartStore.cartItems.reduce(
  (quantity, item) => item.quantity + quantity,
  0
)

export default storeSlice.reducer