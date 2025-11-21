import { createSlice } from "@reduxjs/toolkit";

export const blogsSlice = createSlice({
    name: "blogs",
    initialState: {
        allBlogs: [],
    },
    reducers: {
        setAllBlogs: (state, action) => {
            state.allBlogs = action.payload;
        },
    },
});


export default blogsSlice.reducer;
