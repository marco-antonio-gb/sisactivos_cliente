const Persona = () => import("../Personas.vue");
const PersonaList = () => import("../views/List.vue");
const PersonaCreate = () => import("../views/Create.vue");
const PersonaDetail = () => import("../views/Detail.vue");
const PersonaUpdate = () => import("../views/Update.vue");

const routes = {
	path: "/personas",
	component: Persona,
	children: [
		{
			path: "/",
			name: "personaList",
			component: PersonaList,
			meta: {
				title: "Personas",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/personas/create",
			name: "personaCreate",
			component: PersonaCreate,
			meta: {
				title: "Crear persona",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/personas/detail/:idPersona",
			name: "personaDetail",
			component: PersonaDetail,
			meta: {
				title: "Informacion del persona",
				permissions: ["Administrador"],
			},
		},
		{
			path: "/personas/update/:idPersona",
			name: "personaUpdate",
			component: PersonaUpdate,
			meta: {
				title: "Actualizar informacion del persona",
				permissions: ["Administrador"],
			},
		},
	],
};
export default routes;
