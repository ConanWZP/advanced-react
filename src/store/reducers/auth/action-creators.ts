import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => {
        return {
            type: AuthActionEnum.SET_USER,
            payload: user
        }
    },
    setIsAuth: (auth: boolean): SetAuthAction => {
        return {
            type: AuthActionEnum.SET_AUTH,
            payload: auth
        }
    },
    setIsLoading: (payload: boolean): SetIsLoadingAction => {
        return {
            type: AuthActionEnum.SET_IS_LOADING,
            payload: payload
        }
    },
    setError: (payload: string): SetErrorAction => {
        return {
            type: AuthActionEnum.SET_ERROR,
            payload: payload
        }
    },

    login: (username: string, password: string) => {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true));
                setTimeout(async () => {

                    const response = await axios.get<IUser[]>(`./users.json`)
                    /*const response = await UserService.getUsers()*/

                    const mockUser = response.data.find(user => user.username === username && user.password === password)
                    if (mockUser) {
                        localStorage.setItem('auth', 'true')
                        localStorage.setItem('username', mockUser.username)
                        dispatch(AuthActionCreators.setUser(mockUser))
                        dispatch(AuthActionCreators.setIsAuth(true))
                    } else {
                        dispatch(AuthActionCreators.setError('Неверный логин или пароль'))
                    }
                    dispatch(AuthActionCreators.setIsLoading(false));
                }, 1000)

            }
            catch (e) {
                dispatch(AuthActionCreators.setError(`Произошла ошибка при логине`))
            }
        }
    },
    logout: () => {
        return async (dispatch: AppDispatch) => {
                localStorage.removeItem('auth')
                localStorage.removeItem('username')
                dispatch(AuthActionCreators.setUser({} as IUser))
                dispatch(AuthActionCreators.setIsAuth(false))

        }
    }

}