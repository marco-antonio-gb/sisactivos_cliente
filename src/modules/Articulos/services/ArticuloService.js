const URL = "/articulos";
export default {
	methods: {
		/**
		 * Get all records
		 */
		async getArticulos() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.articulos = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.onLoading = false;
			}
		},
		/**
		 * Create  Usuario
		 */
		async created(data) {
			console.log(data);
			try {
				if (data.file) {
					this.onSave = true;
					let formData = new FormData();
					formData.append("imagen", data.file);
					formData.append("data", JSON.stringify(data.form));
					let response = await this.axios.post(URL, formData);
					if (response.data.success) {
						this.showSnackbar(
							response.data.message,
							true,
							"success"
						);
						setTimeout(() => {
							this.cancelarCreateArticulo();
							this.$router.go(-1);
						}, 500);
					} else {
						this.showSnackbar(response.data.errors, true, "error");
					}
					this.onSave = false;
				} else {
					this.showSnackbar("Seleccione una imagen", true, "warning");
				}
			} catch (error) {
				this.onSave = false;
				this.showSnackbar(
					error.name + ": " + error.message,
					true,
					"error"
				);
			}
		},
		async show(ID) {
			this.onLoading = true;
			try {
				const { data } = await this.axios.get(URL + "/" + ID);
				this.persona = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onLoading = false;
		},
		async update(ID) {
			this.onSave = true;
			try {
				const { data } = await this.axios.put(
					URL + "/" + ID,
					this.persona
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					setTimeout(() => {
						this.$router.go(-1);
					}, 500);
				} else {
					this.showSnackbar(data.validator, true, "success");
				}
				this.onSave = false;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onSave = false;
		},
		async delete(ID) {
			this.onSave = true;
			try {
				const { data } = await this.axios.delete(URL + "/" + ID);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					this.$nextTick(() => {
						const index = this.articulos.findIndex(
							(post) => post.idUsuario === ID
						);
						if (~index) this.articulos.splice(index, 1);
					});
				} else {
					this.showSnackbar(data.validator, true, "success");
				}
				this.onSave = false;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onSave = false;
		},
		// ---
		async getCategorias() {
			this.loading_cat = true;
			let categorias = await this.axios.get("/categorias");
			if (categorias.data.success) {
				this.categorias = categorias.data.data;
			}
			this.loading_cat = false;
		},
		async getOrganismos() {
			this.loading_org = true;
			let orgs = await this.axios.get("/orgfinanciero");
			if (orgs.data.success) {
				this.organismos = orgs.data.data;
			}
			this.loading_org = false;
		},
	},
};
