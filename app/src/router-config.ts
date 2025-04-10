import { type RouterConfig } from "./model/Router";
import ViewUsers from "./views/user-datatable/user-datatable.svelte"
import ViewRoles from "./views/role-datatable/role-datatable.svelte"
import ViewProfiles from "./views/profile-datatable/profile-datatable.svelte"

export const routerConfig: RouterConfig = {
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
		'profiles': {
			path: '\/profiles\/(?<profileTypeId>[^\/]+)(\/(?<profileId>.*))?',
			component: ViewProfiles,
		},
	},
}