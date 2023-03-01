import { GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS } from "./actionTypes";
import axios from "axios"

export const getTodo = (orderBy) => async (dispatch) => {
    dispatch({ type: GET_TODO_REQUEST })
    try {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
        dispatch({ type: GET_TODO_SUCCESS, payload: res.data });
        console.log("data", res.data);
        return res.data;
    } catch (err) {
        dispatch({ type: GET_TODO_FAILURE })
        console.log(err);
    }
}