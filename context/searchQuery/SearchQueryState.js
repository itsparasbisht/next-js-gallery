import React, { useContext, useReducer } from "react";
import SearchQueryContext from "./SearchQueryContext";

function SearchQueryState(props) {
  const initialState = {
    searchFor: "animals",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FIND-THIS":
        return {
          ...state,
          searchFor: action.query,
        };
    }
  };

  return (
    <SearchQueryContext.Provider value={useReducer(reducer, initialState)}>
      {props.children}
    </SearchQueryContext.Provider>
  );
}

export default SearchQueryState;
