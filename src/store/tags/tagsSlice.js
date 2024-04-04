import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    tags: [],
    isSuccess: false,
    page: 1,
    tagsPerPage: 10,
    numberOfTags: 0,
    countPages: null,
    orderBy: 'desc',
    sortBy: 'name'
};

export const index = createAsyncThunk(
    'tags',
    async ({ page, tagsPerPage, orderBy, sortBy }) => {
        try {
            const { data } = await axios.get(
                `https://api.stackexchange.com/2.3/tags?page=${page}&order=${orderBy}&pagesize=${tagsPerPage}&sort=${sortBy}&site=stackoverflow`
            );
            return { data, page };
        } catch (err) {
            console.error(err);
        }
    }
);

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setPage(state, { payload }) {
            state.page = payload;
        },
        setOrderBy(state, action) {
            state.orderBy = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setTagsPerPage(state, action) {
            state.tagsPerPage = action.payload;
        }
    },
    extraReducers: builder =>
        builder.addCase(
            index.fulfilled,
            (state, { payload: { data, page } }) => {
                state.tags[page] = data.items;
                state.errors = [];
                state.numberOfTags = data.total;
                state.countPages = Math.ceil(data.total / state.tagsPerPage);
            }
        )
});

export const { setOrderBy, setPage, setSortBy, setTagsPerPage } =
    tagsSlice.actions;

export default tagsSlice.reducer;
