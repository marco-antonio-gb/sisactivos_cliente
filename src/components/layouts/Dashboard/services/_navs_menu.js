export default {
	items: [
		{
			title: "Inicio",
			href: "/",
			icon: "mdi-home",
			role: [ "Administrador", ]
		},
        {
			_children: "Almacen",
			role: [ "Administrador"]
		},
        {
			title: "Articulos",
			href: "/articulos",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			title: "Categorias",
			href: "/categorias",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			_children: "Asignacion",
			role: [ "Administrador"]
		},
        {
			title: "Responsables",
			href: "/responsables",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			title: "Asignacion",
			href: "/asignacion",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			_children: "Transferencias",
			role: [ "Administrador"]
		},
        {
			title: "Salidas",
			href: "/salidas",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			title: "Transferencias",
			href: "/transferencias",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			_children: "Acceso",
			role: [ "Administrador"]
		},
        {
			title: "Usuarios",
			href: "/usuarios",
			icon: "mdi-account-lock",
			role: [ "Administrador", ]
		},
        {
			title: "Roles",
			href: "/roles",
			icon: "mdi-account-lock",
			role: [ "Administrador", ]
		},
        
        {
			title: "Ajustes",
			href: "/settings",
			icon: "mdi-cog",
			role: [ "Administrador", ]
		},
	]
};
