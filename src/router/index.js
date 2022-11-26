import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";
import routes from "./routes/index.js";
Vue.use(Router);
const router = new Router({
	mode: "history",
	linkActiveClasss: "is-active",
	routes: [
		{
			path: "/",
			redirect: "/dashboard",
		},
	].concat(routes),
});
router.beforeEach((to, from, next) => {
 
	var userPermissions = store.getters["auth/roles"];
	// var userEvents = store.getters["auth/eventos"];
	let titlePage = to.meta.title ? " - " + to.meta.title : "";
	document.title = process.env.VUE_APP_TITLE + titlePage;
	if (store.getters["auth/authenticated"]) {
		if (to.meta.permissions && to.meta.permissions.length > 0) {
			let isAllowed = userPermissions.some((role) =>
				to.meta.permissions.includes(role)
			);
			// if (to.params.idEvento) {
			//     let isGestor = to.params.idEvento ? userEvents.includes(to.params.idEvento) : false;
			//     if (isGestor || userPermissions.includes('Administrador')) {
			//         return next();
			//     } else {
			//         return next("/evento-denegado");
			//     }
			// }
			if (to.meta.permissions.includes("allUsers")) {
				return next();
			} else if (!isAllowed) {
				return next("/acceso-denegado");
			}
		}
	}
	next();
});
export default router;
