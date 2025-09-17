import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
	name: "reports",
	initialState: {
		allReports: [],
	},
	reducers: {
		setAllReports: (state, action) => {
			state.allReports = action.payload;
		},
	},
});

export default reportSlice.reducer;
