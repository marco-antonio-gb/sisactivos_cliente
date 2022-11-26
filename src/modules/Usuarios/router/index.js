/* USUARIOS */
const Usuario = () => import("../Usuarios.vue");
const UsuarioList = () => import("../views/UsuarioList.vue");
const UsuarioCreate = () => import("../views/UsuarioCreate.vue");
const UsuarioDetail = () => import("../views/UsuarioDetail.vue");
const UsuarioUpdate = () => import("../views/UsuarioUpdate.vue");
const routes=
	{
		path: "/usuarios",
		component: Usuario,
		children: [
			{
				path: "/",
				name: "usuariosList",
				component: UsuarioList,
				meta: {
					title: "Usuarios",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/usuarios/create",
				name: "usuariosCreate",
				component: UsuarioCreate,
				meta: {
					title: "Crear usuario",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/usuarios/detail/:idUsuario",
				name: "usuariosDetail",
				component: UsuarioDetail,
				meta: {
					title: "Informacion del usuario",
					permissions: ["Administrador"],
				},
			},
			{
				path: "/usuarios/update/:idUsuario",
				name: "usuarioUpdate",
				component: UsuarioUpdate,
				meta: {
					title: "Actualizar informacion del usuario",
					permissions: ["Administrador"],
				},
			},
		],
	}
export default routes