import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action{
    readonly type = LOGIN;
    constructor(public payload: { email: string, userId: string, token: string, expiry_date: Date }){}
}


export class Logout implements Action{
    readonly type = LOGOUT;
}


export type AuthActions = Login | Logout;