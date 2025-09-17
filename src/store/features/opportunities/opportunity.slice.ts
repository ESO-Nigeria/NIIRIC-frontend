import { createSlice } from "@reduxjs/toolkit";

export const opportunitySlice = createSlice({
	name: "opportunities",
	initialState: {
		allOpportunities: [],
	},
	reducers: {
		setAllReports: (state, action) => {
			state.allOpportunities = action.payload;
		},
	},
});

export default opportunitySlice.reducer;
