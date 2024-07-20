// src/features/dashboard/dashboardSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const login = createAsyncThunk(
    'dashboard/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/login/', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCustomerList = createAsyncThunk(
    'dashboard/fetchCustomerList',
    async () => {
        const response = await api.get('/customer-list');
        return response.data;
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        customers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomerList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomerList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dashboardSlice.reducer;
