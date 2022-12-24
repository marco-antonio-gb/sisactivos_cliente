import store from "@/store";
const DashboardLayout = () =>
	import("@/components/layouts/Dashboard/views/DashboardLayout.vue");
const Inicio = () => import("@/modules/Inicio/Inicio.vue");

import usuariosRoutes from "@/modules/Usuarios/router";
import perfilRoutes from "@/modules/Perfil/router";
import articulosRoutes from '@/modules/Articulos/router'
import personasRoutes from '@/modules/Personas/router'
import categoriasRoutes from '@/modules/Categorias/router'
import serviciosRoutes from '@/modules/Servicios/router'
import responsablesRoutes from '@/modules/Responsables/router'
import orgfinancierosRoutes from '@/modules/Orgfinancieros/router'
import asignacionesRoutes from '@/modules/Asignaciones/router'
import {
	_suspendaccount,
	_unauthorized,
	_unauthorizedevent,
	_forbiddencontent,
	_tokenexpired,
	_pagenotfound,
} from "@/components/pages/router";
const routes = [
	{
		path: "/",
		component: DashboardLayout,
		beforeEnter: (to, from, next) => {
			if (!store.getters["auth/authenticated"]) {
				return next({
					name: "login",
				});
			}
			if (store.getters["auth/roles"].includes("Auxiliar-Acreditacion")) {
				return next({
					name: "acreditacionInicio",
				});
			}
			next();
		},
		children: [
			{
				path: "/dashboard",
				name: "inicio",
				component: Inicio,
				meta: {
					title: "Dashboard",
					description: "Pagina Principal",
					requiresAuth: true,
				},
			},
			{ ...perfilRoutes },
			{ ...personasRoutes },
			{ ...usuariosRoutes },
			{ ...categoriasRoutes },
			{ ...articulosRoutes },
			{ ...serviciosRoutes },
			{ ...responsablesRoutes },
			{ ...orgfinancierosRoutes },
			{ ...asignacionesRoutes },
		],
	},
	{ ..._suspendaccount },
	{ ..._unauthorized },
	{ ..._unauthorizedevent },
	{ ..._forbiddencontent },
	{ ..._tokenexpired },
	{ ..._pagenotfound },
];
export default routes.map((route) => {
	return { ...route, meta: { public: false } };
});
