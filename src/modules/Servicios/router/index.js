const Servicio = () => import("../Servicios.vue");
const ServicioList = () => import("../views/ServicioList.vue");
const ServicioCreate = () => import("../views/ServicioCreate.vue");
const ServicioDetail = () => import("../views/ServicioDetail.vue");
const ServicioUpdate = () => import("../views/ServicioUpdate.vue");
const routes=
	{
		path: "/servicios",
		component: Servicio,
		children: [
			{
				path: "/",
				name: "serviciosList",
				component: ServicioList,
				meta: {
					title: "Servicios",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/servicios/create",
				name: "serviciosCreate",
				component: ServicioCreate,
				meta: {
					title: "Crear servicio",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/servicios/detail/:idServicio",
				name: "serviciosDetail",
				component: ServicioDetail,
				meta: {
					title: "Informacion del servicio",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/servicios/update/:idServicio",
				name: "servicioUpdate",
				component: ServicioUpdate,
				meta: {
					title: "Actualizar informacion del servicio",
					permissions: ["Administrador"],
				},
			},
		],
	}
export default routes