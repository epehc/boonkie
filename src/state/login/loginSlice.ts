import User from "../../domain/User";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../domain/API";


interface LoginState {
    user: User
    isLoggedIn: boolean
    isAdmin: boolean
}

const initialState: LoginState = {
    user: {
        id: 0,
        email: "",
        password: ""
    },
    isLoggedIn: false,
    isAdmin: false
}

// Define the async thunk
export const signIn = createAsyncThunk(
    'login/signIn',
    async (user: { email: string, password: string }) => {
        const response = await login(user.email, user.password);
        return { user: response.user, isLoggedIn: true, isAdmin: response.user.id === 1 };
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        logout: (state) => {
            state.user = {
                id: 0,
                email: "",
                password: ""
            }
            state.isLoggedIn = false
            state.isAdmin = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.isAdmin = action.payload.isAdmin;
        })
        .addCase(signIn.rejected, (state, action) => {
            throw new Error(action.error.message)
        });
    }
})

export const {logout} = loginSlice.actions
export default loginSlice.reducer