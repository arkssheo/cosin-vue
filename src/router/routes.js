import Home from '@/components/Home.vue'
import Login from '@/components/auth/Login.vue'
import User from '@/components/users/User.vue'
import NewUser from '@/components/users/NewUser.vue'
import Admin from '@/components/admin/Admin.vue'
import Finiquito from '@/components/users/CalcFiniquito.vue'
import UserFiles from '@/components/users/UserFiles.vue'
import PrintPreview from '@/components/PrintPreview.vue'
import FileUpload from '@/components/admin/FileUpload.vue'
import UserManagement from '@/components/users/UserManagement.vue'

import userStore from '../store/userStore'

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/files', component: FileUpload },
  { path: '/user_mgmt', component: UserManagement },
  { path: '/admin',
    component: Admin,
    beforeEnter (to, from, next) {
      if (userStore.state.user && userStore.state.user.role.isAdmin) {
        next()
      } else if (!userStore.state.user) {
        next('/login')
      }
    }
  },
  { path: '/admin/newuser',
    component: NewUser,
    beforeEnter (to, from, next) {
      if (userStore.state.user && userStore.state.user.role.isAdmin) {
        next()
      } else if (!userStore.state.user) {
        next('/login')
      }
    }
  },
  { path: '/user/finiquito',
    component: Finiquito,
    beforeEnter (to, from, next) {
      if (userStore.state.user) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { path: '/user/archivos',
    component: UserFiles,
    beforeEnter (to, from, next) {
      if (userStore.state.user) {
        next()
      } else {
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
  { path: '/finiquito/printpreview', component: PrintPreview },
  { path: '/admin/new/:pwd', component: NewUser }
  // { path: '*', redirect: '/user' }

]
