import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { getHospital } from "../../api/hospital";
import { setHospital } from "../../store/reducers/hospital";
import Preview from "./Containers/Preview";
import Request from "./Containers/Request";
import Schedule from "./Containers/Schedule";
import Sent from "./Containers/Sent";
import "./Main.scss";

interface ThreeTabNavbarProps {
  tabs: any[];
  viewType: string;
  selectedTab: string;
  setSelectedTab: (tabVal: string) => void;
}

const ThreeTabNavbar = (props: ThreeTabNavbarProps) => {
  return (
    <div className="main-page-main-navbar-container">
      {props.tabs &&
        props.tabs.map((tab, ind) => (
          <div className="main-page-main-navbar-item-wrapper" key={ind}>
            <div
              className={`main-page-main-navbar-item ${
                props.selectedTab === tab.value ? "selected" : ""
              }`}
              key={ind}
              onClick={() => props.setSelectedTab(tab.value)}
            >
              {tab.name}
            </div>
          </div>
        ))}
    </div>
  );
};

interface MainProps extends RouteComponentProps {
  viewType: string;
}

const Main = (props: MainProps) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const tabs: { [key: string]: any[] } = {
    my: [
      { name: "Quote Requests", value: "request" },
      { name: "Sent Quotes", value: "sent" },
      { name: "Scheduled Consultations", value: "schedule" },
    ],
    profile: [
      { name: "Account", value: "account" },
      { name: "Hospital Info.", value: "info" },
      { name: "People & Staffs", value: "people" },
    ],
  };

  useEffect(() => {
    let location = props.location.pathname.slice(1);
    location =
      location.charAt(location.length - 1) === "/"
        ? location.slice(0, -1)
        : location;
    const splitted = location.split("/");
    if (splitted.length >= 3) {
      setSelectedTab(splitted[2]);
    } else if (tabs[props.viewType]) {
      setSelectedTab(tabs[props.viewType][0].value);
    }
  }, [props.location]);

  useEffect(() => {
    setIsLoading(true);
    const initHospital = async () => {
      // TODO: get hospital ID
      const hospitalData = await getHospital({ hid: "h1" });
      const hospital = hospitalData.result;
      dispatch(setHospital(hospital));
    };
    initHospital()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Main", e);
        setIsLoading(false);
      });
  }, []);

  const selectTabHandler = (tabVal: string) => {
    setSelectedTab(tabVal);
    props.history.push(`/hospital/${props.viewType}/${tabVal}`);
  };

  return (
    <div className="main-page-container">
      <div className="main-page-sidebar-container">
        <FormattedMessage id="hello" />
      </div>
      <div className="main-page-main-container">
        {tabs[props.viewType] && (
          <ThreeTabNavbar
            tabs={tabs[props.viewType]}
            viewType={props.viewType}
            selectedTab={selectedTab}
            setSelectedTab={selectTabHandler}
          />
        )}
        <div className="main-page-main-content-container">
          <Switch>
            <Route exact path="/hospital" component={Request} />
            <Route exact path="/hospital/my" component={Request} />
            <Route exact path="/hospital/my/request" component={Request} />
            <Route
              exact
              path="/hospital/my/request/:quoteId"
              component={Preview}
            />
            <Route exact path="/hospital/my/sent" component={Sent} />
            <Route exact path="/hospital/my/schedule" component={Schedule} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Main);
