import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

import User from '../components/user/User'
import UserManager from "../components/user/UserManager";
import RoleManager from "../components/user/RoleManager";
import PermissionManager from "../components/user/PermissionManager";

import Monitor from "../components/monitor/Monitor";
import SystemManager from "../components/system-manager/SystemManager";
import QuestionManager from "../components/question-manager/QuestionManager";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/User',
          name: 'User',
          component: User,
          children: [
            {
              path: '/UserManager',
              name: UserManager,
              component: UserManager
            },
            {
              path: '/RoleManager',
              name: RoleManager,
              component: RoleManager
            },
            {
              path: '/PermissionManager',
              name: PermissionManager,
              component: PermissionManager
            }
          ]
        },
        {
          path: '/Monitor',
          name: 'Monitor',
          component: Monitor
        },
        {
          path: '/SystemManager',
          name: 'SystemManager',
          component: SystemManager
        },
        {
          path: '/QuestionManager',
          name: 'QuestionManager',
          component: QuestionManager
        }
      ]
    }
  ]
})
