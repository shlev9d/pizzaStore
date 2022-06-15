import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'


type Pizza = {
	id: string
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliseState {
	items: Pizza[]
	status: Status
}

export type SearchPizzaParams = {
	sortBy: string,
	order: string,
	category: string,
	search: string,
	 currentPage: string
}


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizzas/fetchPizzasStatus',
	async ({ sortBy, currentPage, category, order, search }) => {
		const { data } = await axios.get<Pizza[]>(
			`https://628e5d79368687f3e715cd36.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)





const initialState: PizzaSliseState = {
	items: [],
	status: Status.LOADING,
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING
			state.items = []
		})

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})

		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR
			state.items = []
		})
	},
})

export const selectPizzasData = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
