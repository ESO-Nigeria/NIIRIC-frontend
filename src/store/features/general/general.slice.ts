import { createSlice } from "@reduxjs/toolkit";

export const  generalSlice = createSlice({
	name: "general",
	initialState: {
		allEvents: [],
		eventId: '',
	},
	reducers: {
		setAllEvents: (state, action) => {
			state.allEvents = action.payload;
		},
		setEventId: (state, action) => {
			state.eventId = action.payload
		}
	},
});

export const {setEventId } = generalSlice.actions;
export default generalSlice.reducer;
