import { createSlice } from "@reduxjs/toolkit";

export const  generalSlice = createSlice({
	name: "general",
	initialState: {
		allEvents: [],
	},
	reducers: {
		setAllEvents: (state, action) => {
			state.allEvents = action.payload;
		},
	},
});

export default generalSlice.reducer;
