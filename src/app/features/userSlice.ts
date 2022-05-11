import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    cin: string;
    phone: string;
    accountNumber: number;
    PIN: number;
    ccn: number;
    balance: number;
}

interface userState {
    users: User[];
}

const initialState: userState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }
    }
});

export const { addUser, setUsers } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.users;
export default userSlice.reducer;
