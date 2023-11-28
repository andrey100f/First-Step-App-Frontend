import {UniversityProps} from "./UniversityProps";
import PropTypes from "prop-types";
import React, {useEffect, useReducer, useState} from "react";
import {usePreferences} from "../utils/usePreferemces";
import {getUniversities} from "./UniversityApi";

export interface UniversityState {
    universities?: UniversityProps[],
    fetching: boolean,
    fetchingError?: Error | null;
}

interface ActionProps {
    type: string;
    payload?: any;
}

const initialState = {
    fetching: false,
}

const FETCHING_STARTED = "FETCHING_STARTED";
const FETCHING_SUCCEEDED = "FETCHING_SUCCEEDED";
const FETCHING_FAILED = "FETCHING_FAILED";

const reducer: (state: UniversityState, action: ActionProps) => UniversityState = (state, {type, payload}) => {
    switch (type) {
        case FETCHING_STARTED:
            return { ...state, fetching: true, fetchingError: null };
        case FETCHING_SUCCEEDED:
            return { ...state, universities: payload.universities, fetching: false };
        case FETCHING_FAILED:
            return { ...state, fetchingError: payload.error, fetching: false };
        default:
            return state;
    }
}

export const UniversityContext = React.createContext<UniversityState>(initialState);

interface UniversityProviderProps {
    children: PropTypes.ReactNodeLike;
}

export const UniversityProvider: React.FC<UniversityProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {universities, fetching, fetchingError} = state;
    const {get} = usePreferences();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = async () => {
            const result = await get("fsaLoginToken");
            setToken(result!);
        };

        getToken();
    }, []);

    useEffect(getUniversitiesEffect, [token]);

    const value = {universities, fetching, fetchingError};

    return (
        <UniversityContext.Provider value={value}>
            {children}
        </UniversityContext.Provider>
    );

    function getUniversitiesEffect() {
        let canceled = false;

        if(token) {
            fetchUniversities();
        }

        return () => {
            canceled = true;
        }

        async function fetchUniversities() {
            try {
                dispatch({ type: FETCHING_STARTED });

                const universities = await getUniversities(token);

                if (!canceled) {
                    dispatch({ type: FETCHING_SUCCEEDED, payload: { universities } });
                }
            } catch (error) {
                if (!canceled) {
                    dispatch({ type: FETCHING_FAILED, payload: { error } });
                }
            }
        }
    }
}