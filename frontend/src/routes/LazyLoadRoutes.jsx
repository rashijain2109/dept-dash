import React from "react";
import Loadable from "react-loadable";


const loading = <div>Loading...</div>;

export const Home = Loadable({
  "loader": () => import("../components/Home"),
  "loading": () => loading
});

export const ErrorPage404 = Loadable({
  "loader": () => import("../components/404"),
  "loading": () => loading
});

export const Login = Loadable({
  "loader": () => import("../components/Login"),
  "loading": () => loading
});

export const Logout = Loadable({
  "loader": () => import("../components/Logout"),
  "loading": () => loading
});

export const Dashboard = Loadable({
  "loader": () => import("../views/Dashboard"),
  "loading": () => loading
});


export const Projects = Loadable({
  "loader": () => import("../views/Projects"),
  "loading": () => loading
});

export const FacultyProfile = Loadable({
  "loader": () => import("../views/FacultyProfile"),
  "loading": () => loading
});

export const Publications = Loadable({
  "loader": () => import("../views/Publications"),
  "loading": () => loading
});



