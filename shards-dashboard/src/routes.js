import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Playground from "./views/Playground";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import AudioView from './views/AudioPlayer';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/speech-to-text" />
  },
  {
    path: "/play",
    layout: DefaultLayout,
    component: AudioView
  },
  {
    path: "/speech-to-text",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/list",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/search",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/upload",
    layout: DefaultLayout,
    component: Playground
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/category",
    layout: DefaultLayout,
    component: AddNewPost
  }
];
