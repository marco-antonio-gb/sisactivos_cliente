export default {
	methods: {
		async showUpdate(ID) {
			this.onLoading = true;
			try {
				const { data } = await this.axios.get(
					"responsables" + "/" + ID
					);
					if (data.success) {
						this.responsableForm.usuario_id = data.data.usuario.idUsuario;
						this.responsableForm.servicio_id =
						data.data.servicio.idServicio;
					}
				} catch (error) {
				console.log(error);
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.onLoading = false;
			}
		},
	},
};
