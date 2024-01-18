import PropTypes from "prop-types";

/**
 * Interfata reprezantand starea unui element in cadrul unui context
 */
export interface ItemState {
  fetching: boolean;
  fetchingError?: Error | null;
}

/**
 * Constantele care reprezintă tipurile de acțiuni disponibile în cadrul reducerului pentru gestionarea stării.
 */
export const FETCHING_STARTED = "FETCHING_STARTED";
export const FETCHING_SUCCEEDED = "FETCHING_SUCCEEDED";
export const FETCHING_FAILED = "FETCHING_FAILED";

/**
 * Interfata pentru actiuni in cadrul reducer-ului
 */
export interface ActionProps {
  type: string;
  payload?: any;
}

/**
 * Interfata pentru proprietatile componente care servesc drept provider pentru un anumit tip de element
 */
export interface ItemProviderProps {
  children: PropTypes.ReactNodeLike;
}
