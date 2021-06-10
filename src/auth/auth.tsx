import React, { createContext, useContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import Pool from "../aws/UserPool";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/user";

interface AuthContextType {
  authenticate: (Username: string, Password: string) => Promise<any>;
  getSession: () => any;
  logout: () => void;
}

export interface UserProps {
  name?: string;
  sub?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const Auth = (props: any) => {
  const dispatch = useDispatch();

  const getSession = async () => {
    const user = Pool.getCurrentUser();
    let userObj = {};
    if (user) {
      await user.getSession((err: any, session: any) => {
        if (err) {
          console.log("eee", err);
          switch (err.name) {
            case "UserNotFoundException":
              dispatch(setUser({}));
              if (user) user.signOut();
              return {};
            default:
              console.error("ERROR");
              throw err;
          }
        } else {
          console.log("session", session);
          const userAttributes: { [id: string]: any } = {};
          user.getUserAttributes((err, attributes) => {
            if (err) {
              switch (err.name) {
                case "UserNotFoundException":
                  dispatch(setUser({}));
                  if (user) user.signOut();
                  return {};
                default:
                  console.error("ERROR");
                  throw err;
              }
            } else {
              if (attributes) {
                for (let attribute of attributes) {
                  const { Name, Value } = attribute;
                  userAttributes[Name] = Value;
                }
              }
            }
          });
          userObj = session.getIdToken().payload;
          dispatch(setUser(userObj));
          console.log("uuu");
          // const token = session.getIdToken().getJwtToken();
          // userObj = {
          //   user,
          //   headers: { Authorization: token },
          //   ...session,
          //   ...userAttributes,
          // };
        }
      });
      return userObj;
    }
  };

  const authenticate = (Username: string, Password: string) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          if (data) {
            dispatch(setUser(data.getIdToken().payload));
            resolve(data.getIdToken().payload);
          }
        },
        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      dispatch(setUser({}));
      user.signOut();
      window.open("/", "_self");
    }
  };

  return (
    <AuthContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default Auth;
