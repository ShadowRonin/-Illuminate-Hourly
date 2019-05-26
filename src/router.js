import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ApplicationDetails from "./views/ApplicationDetails";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/application/:id",
      name: "application",
      component: ApplicationDetails
    }
  ]
});
