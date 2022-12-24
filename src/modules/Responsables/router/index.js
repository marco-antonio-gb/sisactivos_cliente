const Responsable = () => import("../Responsables.vue");
const ResponsableList = () => import("../views/ResponsableList.vue");
const ResponsableCreate = () => import("../views/ResponsableCreate.vue");
const ResponsableDetail = () => import("../views/ResponsableDetail.vue");
const ResponsableUpdate = () => import("../views/ResponsableUpdate.vue");
const routes=
	{
		path: "/responsables",
		component: Responsable,
		children: [
			{
				path: "/",
				name: "responsablesList",
				component: ResponsableList,
				meta: {
					title: "Responsables",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/responsables/create",
				name: "responsablesCreate",
				component: ResponsableCreate,
				meta: {
					title: "Crear responsable",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/responsables/detail/:idResponsable",
				name: "responsablesDetail",
				component: ResponsableDetail,
				meta: {
					title: "Informacion del responsable",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/responsables/update/:idResponsable",
				name: "responsableUpdate",
				component: ResponsableUpdate,
				meta: {
					title: "Actualizar informacion del responsable",
					permissions: ["Administrador"],
				},
			},
		],
	}
export default routes