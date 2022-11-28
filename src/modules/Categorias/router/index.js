const Categoria = () => import("../Categorias.vue");
const CategoriaList = () => import("../views/CategoriaList.vue");
const CategoriaCreate = () => import("../views/CategoriaCreate.vue");
const CategoriaDetail = () => import("../views/CategoriaDetail.vue");
const CategoriaUpdate = () => import("../views/CategoriaUpdate.vue");

const routes = {
	path: "/categorias",
	component: Categoria,
	children: [
		{
			path: "/",
			name: "categoriaList",
			component: CategoriaList,
			meta: {
				title: "Categorias",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/categorias/create",
			name: "categoriaCreate",
			component: CategoriaCreate,
			meta: {
				title: "Crear categoria",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/categorias/detail/:idCategoria",
			name: "categoriaDetail",
			component: CategoriaDetail,
			meta: {
				title: "Informacion del categoria",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/categorias/update/:idCategoria",
			name: "categoriaUpdate",
			component: CategoriaUpdate,
			meta: {
				title: "Actualizar informacion del categoria",
				permissions: ["Administrador"],
			},
		},
	],
};
export default routes;
