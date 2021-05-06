import { Router } from 'express'
import PermissionController from '@controllers/PermissionController'
import ProductController from '@controllers/ProductController'
import RoleController from '@controllers/RoleController'
import SessionController from '@controllers/SessionController'
import UserController from '@controllers/UserController'
import Permissions from './middlewares/permissions'

const router = Router()

router.post('/users', UserController.create)
router.post('/sessions', SessionController.create)
router.post('/permissions', PermissionController.create)
router.post('/roles', RoleController.create)

router.post('/products', Permissions.is(['ROLE_ADMIN']), ProductController.create)
router.get('/products', Permissions.is(['ROLE_ADMIN', 'ROLE_USER']), ProductController.showAll)
router.get('/products/:id', Permissions.is(['ROLE_ADMIN', 'ROLE_USER']), ProductController.showOne)

export { router }
