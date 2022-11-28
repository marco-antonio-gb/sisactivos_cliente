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
				title: "Articulos",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/create",
			name: "articulosCreate",
			component: ArticuloCreate,
			meta: {
				title: "Crear articulo",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/detail/:idArticulo",
			name: "articulosDetail",
			component: ArticuloDetail,
			meta: {
				title: "Detalle articulo",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/articulos/update/:idArticulo",
			name: "ArticuloUpdate",
			component: ArticuloUpdate,
			meta: {
				title: "Actualizar informacion  ",
				permissions: ["Administrador"],
			},
		},
	],
};
export default routes;
