const Asignacion = () => import("../Asignacion.vue");
const AsignacionList = () => import("../views/AsignacionList.vue");
const AsignacionCreate = () => import("../views/AsignacionCreate.vue");
const AsignacionDetail = () => import("../views/AsignacionDetail.vue");
const AsignacionUpdate = () => import("../views/AsignacionUpdate.vue");
const routes=
	{
		path: "/asignaciones",
		component: Asignacion,
		children: [
			{
				path: "/",
				name: "asignacionesList",
				component: AsignacionList,
				meta: {
					title: "Asignaciones",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/asignaciones/create",
				name: "asignacionesCreate",
				component: AsignacionCreate,
				meta: {
					title: "Crear asignacion",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/asignaciones/detail/:idAsignacion",
				name: "asignacionesDetail",
				component: AsignacionDetail,
				meta: {
					title: "Informacion del asignacion",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/asignaciones/update/:idAsignacion",
				name: "asignacionUpdate",
				component: AsignacionUpdate,
				meta: {
					title: "Actualizar informacion del asignacion",
					permissions: ["Administrador"],
				},
			},
		],
	}
export default routes