import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, REGISTER, ERROR, CHANGE_DISPLAY_NAME } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/myAxios';


import { useNavigate } from 'react-router-dom';


// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);



export const JWTProvider = ({ children }) => {
    
    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
              
                if (serviceToken) {
                    setSession(serviceToken);
                    const config = {
                        headers: { Authorization: `Bearer ${serviceToken}` }
                    };
                    const response = await axios.get('/account/me', config);
                    const { user }  = response.data.data;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                        
                    });
                    
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post("/auth/login", { email, password });
        const { user, accessToken } = response.data.data;
        setSession(accessToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (firstName, lastName, email, password, confirmPassword) => {
        // todo: this flow need to be recode as it not verified
        const response = await axios.post('/auth/sign-up', {firstName, lastName, email, password, confirmPassword});
        const { user, accessToken } = response.data.data;
        setSession(accessToken);
        dispatch({
            type: REGISTER,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    
    };

    const changeDisplayName = async (displayName) => {
        const response = await axios.post("/user/changeDisplayName", { displayName });
        const { user } = response.data.data;
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
            
        });
    };

    const changeOnlineAvailability = async (onlineAvailability) => {
        const response = await axios.post("/user/changeOnlineAvailability", { onlineAvailability });
        const { user } = response.data.data;
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
            
        });
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT,  });
        navigate('/login')
    };

    const resetPassword = (email) => console.log(email);

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, changeDisplayName, changeOnlineAvailability }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
