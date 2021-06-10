import NotFound from "../NotFound";
import Main from "./Main";
import SignIn from "./SignIn";

const My = () => <Main viewType="my" />;
const Profile = () => <Main viewType="profile" />;
const Schedule = () => <Main viewType="schedule" />;

export {
  NotFound as NotFoundPage,
  My as HospitalMyPage,
  Profile as HospitalProfilePage,
  Schedule as HospitalSchedulePage,
  SignIn as HospitalSignInPage,
};
