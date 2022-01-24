import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(VueRouter)

const router = new VueRouter({ routes })

router.beforeEach(beforeEach)

export default router
