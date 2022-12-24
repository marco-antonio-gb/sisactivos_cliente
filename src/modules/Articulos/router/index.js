/* Articulos */
const Articulo = () => import("../Articulos.vue");
const ArticuloList = () =>
	import("../views/ArticuloList.vue");
const ArticuloCreate = () =>
	import("../views/ArticuloCreate.vue");
const ArticuloDetail = () =>
	import("../views/ArticuloDetail.vue");
const ArticuloUpdate = () =>
	import("../views/ArticuloUpdate.vue");

const routes = {
	path: "/articulos",
	component: Articulo,
	children: [
		{
			path: "/",
			name: "articulosList",
			component: ArticuloList,
			meta: {
				title: "Artículos",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/create",
			name: "articuloCreate",
			component: ArticuloCreate,
			meta: {
				title: "Crear artículos",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/detail/:idArticulo",
			name: "articuloDetail",
			component: ArticuloDetail,
			meta: {
				title: "Detalle artículos",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/update/:idArticulo",
			name: "ArticuloUpdate",
			component: ArticuloUpdate,
			meta: {
				title: "Actualizar artículos",
				permissions: ["Administrador"],
			},
		},
	],
};
export default routes;
