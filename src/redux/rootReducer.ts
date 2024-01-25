import { combineReducers } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import userSlice from './userSlice';

const reducer = combineReducers({
    contacts: contactsSlice,
    user: userSlice
 });

export default reducer;