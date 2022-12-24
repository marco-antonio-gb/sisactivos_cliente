export default {
	methods:{
		cancelarCreateServicio() {
			this.$router.go(-1);
		},
		async getUsuarios() {
			try {
				this.loadingUsuarios = true;
				const { data } = await this.axios.get('/responsable-usuarios');
				this.usuariosOptions = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.loadingUsuarios = false;
			}
		},
		async getServicios() {
			try {
				this.loadingServicios = true;
				const { data } = await this.axios.get('/responsable-servicios');
				this.serviciosOptions = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.loadingServicios = false;
			}
		},
	}
}