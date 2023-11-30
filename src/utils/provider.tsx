import PropTypes from "prop-types";

export interface ItemState {
    fetching: boolean;
    fetchingError?: Error | null;
}

export const FETCHING_STARTED = "FETCHING_STARTED";
export const FETCHING_SUCCEEDED = "FETCHING_SUCCEEDED";
export const FETCHING_FAILED = "FETCHING_FAILED";

export interface ActionProps {
    type: string;
    payload?: any;
}

export interface ItemProviderProps {
    children: PropTypes.ReactNodeLike;
}
