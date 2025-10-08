import { createSlice } from "@reduxjs/toolkit";

export const publicationSlice = createSlice({
	name: "publications",
	initialState: {
		allPublications: [],
	},
	reducers: {
		setAllReports: (state, action) => {
			state.allPublications = action.payload;
		},
	},
});

export default publicationSlice.reducer;
