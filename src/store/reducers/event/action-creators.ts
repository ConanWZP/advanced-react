import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const EventActionCreator = {
    setGuests: (payload: IUser[]):SetGuestsAction => {
        return {
            type: EventActionEnum.SET_GUESTS,
            payload: payload
        }
    },
    setEvents: (payload: IEvent[]):SetEventsAction => {
        return {
            type: EventActionEnum.SET_EVENTS,
            payload: payload
        }
    },
    fetchGuests: () => {
        return async (dispatch: AppDispatch) => {
            try {
                const response = await axios.get<IUser[]>('./users.json')
                /*const response = await UserService.getUsers()*/
                dispatch(EventActionCreator.setGuests(response.data))
            } catch (e) {
                console.log(e)
            }
        }
    },
    createEvent: (event: IEvent) => {
        return async (dispatch: AppDispatch) => {
            try {
                const events = localStorage.getItem('events') || '[]'
                const json = JSON.parse(events) as IEvent[]
                json.push(event)
                dispatch(EventActionCreator.setEvents(json));
                localStorage.setItem('events', JSON.stringify(json))
            } catch (e) {
                console.log(e)
            }
        }
    },
    fetchEvents: (username: string) => {
        return async (dispatch: AppDispatch) => {
            try {
                const events = localStorage.getItem('events') || '[]'
                const json = JSON.parse(events) as IEvent[]
                const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
                dispatch(EventActionCreator.setEvents(currentUserEvents))
            } catch (e) {
                console.log(e)
            }
        }
    }
}