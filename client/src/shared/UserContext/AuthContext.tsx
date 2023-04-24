import React, { createContext, useReducer, useEffect, useMemo } from "react";

export const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") || "")
    : "",
};

export const UserContext = createContext<any>(initialState);

export const actionStates = {
  DISPATCH_USER: "DISPATCH_USER",
  DISPATCH_TOKEN: "DISPATCH_TOKEN",
  REMOVE_USER: "REMOVE_USER",
};

export const UserReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionStates.DISPATCH_USER: {
      return {
        ...state,
        user: { email: action.email, password: action.password },
      };
    }
    case actionStates.DISPATCH_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case actionStates.REMOVE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};
const AuthContext = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.token]);

  /**
   * accept email and password that's gonna be stored in LocalStorage to persist user
   * @param {string} email
   * @param {string} password
   */
  const loginUser = (email: string, password: string) => {
    dispatch({
      type: actionStates.DISPATCH_USER,
      email: email,
      password: password,
    });
  };

  /**
   * accept token that's gonna be stored in LocalStorage to persist token
   * @param {string} token
   */
  const handleToken = (token: string) => {
    dispatch({
      type: actionStates.DISPATCH_TOKEN,
      token: token,
    });
  };

  const handleLogutUser = () => {
    dispatch({
      type: actionStates.REMOVE_USER,
      user: null,
    });
    localStorage.clear();
  };

  const data = useMemo(
    () => ({
      state: state,
      loginUser: loginUser,
      handleToken: handleToken,
      handleLogutUser: handleLogutUser,
    }),
    [state]
  );

  return (
    <div>
      <UserContext.Provider value={data}>{children}</UserContext.Provider>
    </div>
  );
};

export default AuthContext;
