import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/Login";
import Home from '../components/Home'

import User from '../components/user/User'
import UserManager from "../components/user/UserManager";
import RoleManager from "../components/user/RoleManager";
import PermissionManager from "../components/user/PermissionManager";

import Monitor from "../components/monitor/Monitor";

import Question from "../components/question-manager/Question";
import Classification from "../components/question-manager/Classification";

import System from "../components/system-manager/System";





Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let isLogin = router.app.$cookies.get('isLogin');
        if (isLogin === null) {
          router.push('/');
        } else if( isLogin === 'ecin520') {
          next();
        }
      },
      children: [
        {
          path: '/User',
          name: 'User',
          component: User,
          children: [
            {
              path: '/UserManager',
              name: UserManager,
              component: UserManager,
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
          path: '/Question',
          name: 'Question',
          component: Question,
          children: [
            {
              path: '/Classification',
              name: 'Classification',
              component: Classification
            }
          ]
        },
        {
          path: '/System',
          name: 'System',
          component: System
        }
      ]
    }
  ]
});
export default router;
