import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import {
  SignUpPage,
  MainPage,
  LandingPage,
  NotFoundPage,
  FormPage,
  MyPage,
  SignInPage,
  ForgotPasswdPage,
} from "./pages/User";
import {
  HospitalSignInPage,
  HospitalMyPage,
  HospitalProfilePage,
  HospitalSchedulePage,
} from "./pages/Hospital";
import QuoteDetailWrapper from "./pages/My/QuoteDetail";

interface ProtectedRouteProps {
  component: React.FC<RouteComponentProps>;
  isAuthenticated: boolean;
  exact?: boolean;
  path: string;
}

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: ProtectedRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/signin?next=${window.location.pathname}`} />
        )
      }
    />
  );
};

interface RouteProps {
  isAuthenticated: boolean;
}

const HospitalRoutes = (props: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={props.match.path} component={HospitalMyPage} />
      <Route
        path={`${props.match.path}/signin`}
        component={HospitalSignInPage}
      />
      <Route path={`${props.match.path}/my`} component={HospitalMyPage} />
      <Route
        path={`${props.match.path}/profile`}
        component={HospitalProfilePage}
      />
      <Route
        path={`${props.match.path}/schedule`}
        component={HospitalSchedulePage}
      />
    </Switch>
  );
};

const Routes = (props: RouteProps) => {
  return (
    <Switch>
      <Route exact path="/landing" component={LandingPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/forgotPasswd" component={ForgotPasswdPage} />
      <Route exact path="/form" component={FormPage} />
      <Route
        exact
        path="/"
        component={props.isAuthenticated ? MyPage : LandingPage}
      />
      <ProtectedRoute
        path="/mypage"
        isAuthenticated={props.isAuthenticated}
        component={MyPage}
      />
      {/* TODO: user authentication to corresponding quote */}
      <ProtectedRoute
        path="/quote/:quoteId"
        isAuthenticated={props.isAuthenticated}
        component={QuoteDetailWrapper}
      />
      <Route path="/hospital" component={HospitalRoutes} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
