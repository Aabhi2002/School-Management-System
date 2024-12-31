// Import statements should be at the top of the file
import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

const REACT_APP_BASE_URL = "http://localhost:5000";  // Base URL

export const getAllComplains = (id, address) => async (dispatch) => {
    // Check if 'id' and 'address' are provided
    if (!id || !address) {
        dispatch(getFailed("Invalid ID or address provided."));
        return;
    }

    dispatch(getRequest());  // Dispatch 'getRequest' action before API call

    try {
        // Making the API call using the base URL
        const { data } = await axios.get(`${REACT_APP_BASE_URL}/${address}List/${id}`);

        // Check if the response contains a 'message' (usually for failure)
        if (data.message) {
            dispatch(getFailed(data.message));
        } else {
            dispatch(getSuccess(data));  // Dispatch 'getSuccess' if the API call is successful
        }
    } catch (error) {
        // Handle errors (e.g., network issues or server errors)
        dispatch(getError(error.response?.data?.message || error.message));
    }
};
