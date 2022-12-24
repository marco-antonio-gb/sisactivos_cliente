const Orgfinanciero = () => import("../Orgfinancieros.vue");
const OrgfinancieroList = () => import("../views/OrgfinancieroList.vue");
const OrgfinancieroCreate = () => import("../views/OrgfinancieroCreate.vue");
const OrgfinancieroDetail = () => import("../views/OrgfinancieroDetail.vue");
const OrgfinancieroUpdate = () => import("../views/OrgfinancieroUpdate.vue");
const routes=
	{
		path: "/orgfinancieros",
		component: Orgfinanciero,
		children: [
			{
				path: "/",
				name: "orgfinancierosList",
				component: OrgfinancieroList,
				meta: {
					title: "Org. Financieros",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/orgfinancieros/create",
				name: "orgfinancierosCreate",
				component: OrgfinancieroCreate,
				meta: {
					title: "Crear Org. Financiero",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/orgfinancieros/detail/:idOrgfinanciero",
				name: "orgfinancierosDetail",
				component: OrgfinancieroDetail,
				meta: {
					title: "Detalle Org. Financiero",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/orgfinancieros/update/:idOrgfinanciero",
				name: "orgfinancierosUpdate",
				component: OrgfinancieroUpdate,
				meta: {
					title: "Actualizar Org. Financiero",
					permissions: ["Administrador"],
				},
			},
		],
	}
export default routes