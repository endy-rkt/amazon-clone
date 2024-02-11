import { createSlice } from '@reduxjs/toolkit';

type authState = {
    auth:{
        token: string | null;
    };
};

const initialState = {
	token: null
};

const authSlice = createSlice({
	name:'auth',
	initialState,
	reducers:{
		setCredentials:(state, action) =>{
			const {accessToken} = action.payload;

			state.token = accessToken;
		},
		logOut:(state) =>{
			state.token = null;
		}
	}
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state:authState) => state?.auth?.token;