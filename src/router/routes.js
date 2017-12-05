import Home from '@/components/Home.vue'
import Login from '@/components/auth/Login.vue'
import User from '@/components/users/User.vue'
import NewUser from '@/components/users/NewUser.vue'
import Admin from '@/components/users/Admin.vue'

import userStore from '../store/userStore'
import { USER_ADMIN_ROLE_STRING } from '../constants/global'

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/admin',
    component: Admin,
    beforeEnter (to, from, next) {
      if (userStore.state.user && userStore.state.user.role === USER_ADMIN_ROLE_STRING) {
        next()
      } else if (!userStore.state.user) {
        next('/login')
      }
    }
  },
  { path: '/admin/newuser',
    component: NewUser,
    beforeEnter (to, from, next) {
      if (userStore.state.user && userStore.state.user.role === USER_ADMIN_ROLE_STRING) {
        next()
      } else if (!userStore.state.user) {
        console.log('failed auth')
        next('/login')
      }
    }
  },
  { path: '/user',
    component: User,
    beforeEnter (to, from, next) {
      if (userStore.state.user) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { path: '/admin/new/:pwd', component: NewUser },
  { path: '*', redirect: '/login' }

]
