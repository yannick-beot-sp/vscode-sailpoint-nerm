import Router from "./services/Router";
import ViewUsers from "./views/user-datatable/user-datatable.svelte"
import ViewRoles from "./views/role-datatable/role-datatable.svelte"

export default new Router({
	window: window,
	
	routes: {
		'users': {
			path: '/users',
			component: ViewUsers,
		},
		'roles': {
			path: '/roles',
			component: ViewRoles,
		},
	},
})