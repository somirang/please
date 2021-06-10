import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { Store } from "redux";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import "./App.css";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Routes from "./routes";
import Auth, { useAuthContext } from "./auth/auth";
import { RootState } from "./store";

interface AppProps {
  store: Store;
  history: History;
}

const RoutesAuthWrapper = () => {
  const auth = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: RootState) => state.user.current);
  const [user, setUser] = useState({});

  const getPageType = () => {
    const firstLoc = window.location.pathname.split("/")[1];
    return firstLoc === "hospital" ? "hospital" : "user";
  };

  useEffect(() => {
    if (isLoading || user === {}) {
      try {
        auth?.getSession().then((currUser: any) => {
          setUser(currUser);
        });
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
  }, [auth, user, isLoading]);

  return (
    <div className="app-content">
      <header className={`App-header ${getPageType()}-page`}>
        {isLoading ? (
          <div>LOADING...</div>
        ) : (
          <Routes
            isAuthenticated={
              (user && Object.keys(user).length !== 0) ||
              (currentUser && Object.keys(currentUser).length !== 0)
            }
          />
        )}
      </header>
    </div>
  );
};

const App: React.FC<AppProps> = ({ store, history }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const sidebarCloseCallback = () => setIsSidebarOpened(false);

  const sidebarOpenCallback = () => setIsSidebarOpened(true);

  return (
    <Provider store={store}>
      <div className="app-container">
        <ConnectedRouter history={history}>
          <Auth>
            <Sidebar
              isSidebarOpened={isSidebarOpened}
              sidebarCloseCallback={sidebarCloseCallback}
            />
            <Navbar onBurgerIconClickHandler={sidebarOpenCallback} />
            <RoutesAuthWrapper />
          </Auth>
        </ConnectedRouter>
      </div>
    </Provider>
  );
};

export default App;
