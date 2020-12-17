import { User } from "../user.model";
import * as AuthActions from './auth.actions';
export interface State{
    user: User
}

const initialState:State = {
    user: null
}

export function authReducer(
    state = initialState, 
    action: AuthActions.AuthActions
){
    switch (action.type) {
        case AuthActions.LOGIN:
            let { userId, email, token, expiry_date} = action.payload
            const user = new User(email, userId,token, expiry_date);
            return {
                ...state,
                user
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
   
}