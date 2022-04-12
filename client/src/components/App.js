import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage";
import DetailVideoPage from "./views/DetailVideoPage/DetailVideoPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";
import ListCommentPage from "./views/ListCommentPage/ListCommentPage";
import ListUserPage from "./views/ListUserPage/ListUserPage";
import ListVideoPage from "./views/ListVideoPage/ListVideoPage";
import EditUserPage from "./views/ListUserPage/EditUserPage";
import MyVideoPage from "./views/MyVideoPage/MyVideoPage";
import EditVideoPage from "./views/ListVideoPage/EditVideoPage";
import ManagerMyVideoPage from "./views/MyVideoPage/ManagerMyVideoPage";
import MusicPage from "./views/FilterPage/MusicPage";
import FilmPage from "./views/FilterPage/FilmPage";
import NewsPage from "./views/FilterPage/NewsPage";
import SportPage from "./views/FilterPage/SportPage";
import AnimalPage from "./views/FilterPage/AnimalPage";
import EditMyProfilePage from "./views/MyVideoPage/EditMyProfile";
import ReviewAdminPage from "./views/ReviewAdminPage/ReviewAdminPage";
import CreateUserPage from "./views/ListUserPage/CreateUserPage";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/Music" component={Auth(MusicPage, null)} />
          <Route
            exact
            path="/Film&Animation"
            component={Auth(FilmPage, null)}
          />
          <Route exact path="/News" component={Auth(NewsPage, null)} />
          <Route exact path="/Sport" component={Auth(SportPage, null)} />
          <Route
            exact
            path="/Pets&Animals"
            component={Auth(AnimalPage, null)}
          />
          <Route exact path="/MyVideo" component={Auth(MyVideoPage, true)} />
          <Route
            exact
            path="/EditMyProfile"
            component={Auth(EditMyProfilePage, true)}
          />
          <Route
            exact
            path="/ManagerMyVideo"
            component={Auth(ManagerMyVideoPage, true)}
          />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/video/upload"
            component={Auth(UploadVideoPage, true)}
          />
          <Route
            exact
            path="/video/:videoId"
            component={Auth(DetailVideoPage)}
          />
          <Route
            exact
            path="/subscription"
            component={Auth(SubscriptionPage, null)}
          />
          <Route
            exact
            path="/Review"
            component={Auth(ReviewAdminPage, true, true)}
          />
          <Route
            exact
            path="/ListComment"
            component={Auth(ListCommentPage, true, true)}
          />
          <Route
            exact
            path="/ListUser"
            component={Auth(ListUserPage, true, true)}
          />
          <Route
            exact
            path="/EditUser/:id"
            component={Auth(EditUserPage, true, true)}
          />
          <Route
            exact
            path="/CreateUser"
            component={Auth(CreateUserPage, true, true)}
          />
          <Route
            exact
            path="/EditVideo/:id"
            component={Auth(EditVideoPage, true, true)}
          />
          <Route
            exact
            path="/EditMyVideo/:id"
            component={Auth(EditVideoPage, true, false)}
          />
          <Route
            exact
            path="/ListVideo"
            component={Auth(ListVideoPage, true, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
