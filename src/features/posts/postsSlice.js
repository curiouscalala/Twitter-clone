import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'https://e0dc5cb0-de85-4b0b-a831-1d38b0384bcf-00-1vz07zgn5c1sd.pike.replit.dev/'

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        });
    },
});

export default postsSlice.reducer;