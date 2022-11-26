const Perfil = () => import("@/modules/Perfil/Perfil.vue");
const PerfilDetail = () => import("@/modules/Perfil/views/PerfilDetail.vue");
const PerfilUpdate = () => import("@/modules/Perfil/views/PerfilUpdate.vue");

const routes = {
	path: "/perfil",
	component: Perfil,
	children: [
		{
			path: "/",
			name: "perfil",
			component: PerfilDetail,
			meta: {
				title: "Perfil de usuario",
				permissions: ["allUsers"]
			}
		},
		{
			path: "/perfil/update/:idUsuario",
			name: "perfilUpdate",
			component: PerfilUpdate,
			meta: {
				title: "Actualizar perfil",
				permissions: ["allUsers"]
			}
		}
	]
}
export default routes