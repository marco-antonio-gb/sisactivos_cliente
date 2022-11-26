const SuspendAccount = () => import("@/components/pages/SuspendAccount.vue");
const Unauthorized = () => import("@/components/pages/Unauthorized.vue");
const UnauthorizedEvent = () => import("@/components/pages/UnauthorizedEvent.vue");
const ForbiddenContent = () => import("@/components/pages/ForbiddenContent.vue");
const TokenExpired = () => import("@/components/pages/TokenExpired.vue");
const PageNotFound = () => import("@/components/pages/PageNotFound.vue");

export const _suspendaccount = {
	path: "/suspender-cuenta/:usuario_id",
	name: "suspender-cuenta",
	component: SuspendAccount,
	meta: {
		title: "Suspender cuenta",
	},
};
export const _unauthorized = {
	path: "/acceso-denegado",
	name: "acceso-denegado",
	component: Unauthorized,
	meta: {
		title: "Error 403",
	},
};
export const _unauthorizedevent = {
	path: "/evento-denegado",
	name: "evento-denegado",
	component: UnauthorizedEvent,
	meta: {
		title: "Evento no autorizado",
	},
};
export const _forbiddencontent = {
	path: "/forbidden-content",
	name: "forbidden-content",
	component: ForbiddenContent,
	meta: {
		title: "Contenido no disponible",
	},
};
export const _tokenexpired = {
	path: "/session-expirado",
	name: "tokenexpired",
	component: TokenExpired,
	meta: {
		title: "Error 401",
	},
};
export const _pagenotfound = {
	path: "*",
	component: PageNotFound,
	meta: {
		title: "Error 404",
	},
};
