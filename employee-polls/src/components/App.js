import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { handleInitialData } from "../actions/shared";
import LoadingBar from "./LoadingBar";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import PollPage from "./PollPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading ? null : (
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/questions/:id" element={<PollPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
               <Route path="/add" element={<NewQuestion />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  loading: !users || Object.keys(users).length === 0 || !questions || Object.keys(questions).length === 0,
});

export default connect(mapStateToProps)(App);