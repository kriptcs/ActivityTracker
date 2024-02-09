import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import viewAllAccs from "./views/viewAllAccs.vue";
import viewOneAcc from "./views/viewOneAcc.vue";
import signup from "./views/signup.vue";
import signin from "./views/signin.vue";
import signout from "./views/signout.vue";
import createActivity from "./views/createActivity.vue";
import viewAllActivities from "./views/viewAllActivities.vue";
import viewOneActivity from "./views/viewOneActivity.vue";
import viewOwnActivities from "./views/viewOwnActivities.vue";
import deleteActivity from "./views/deleteActivity.vue";
import updateActivity from "./views/updateActivity.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/viewAllAccs", component: viewAllAccs },
    { path: "/viewOneAcc/:id", component: viewOneAcc },
    { path: "/signup", component: signup },
    { path: "/signin", component: signin },
    { path: "/signout", component: signout },
    { path: "/createActivity", component: createActivity },
    { path: "/viewAllActivities", component: viewAllActivities },
    { path: "/viewOneActivity/:id", component: viewOneActivity },
    { path: "/viewOwnActivities", component: viewOwnActivities },
    { path: "/deleteActivity/:id", component: deleteActivity },
    { path: "/updateActivity/:id", component: updateActivity },
  ],
});

export default router;
