import { configureStore } from '@reduxjs/toolkit';

import tagsReducer from './tags/tagsSlice';

export default configureStore({
    reducer: {
        tags: tagsReducer
    }
});
