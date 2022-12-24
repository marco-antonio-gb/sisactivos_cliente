const URL = "categorias";
export default {
	methods: {
		async getCategorias() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.categorias = data.data;
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
		 * Create new Categoria
		 */
		async create() {
			this.onSave = true;
			try {
				if (this.$refs.createCategoriaForm.validate()) {
					const { data } = await this.axios.post(URL, this.categoria);
					if (data.success) {
						this.showSnackbar(data.message, true, "success");
						setTimeout(() => {
							this.$router.go(-1);
						}, 500);
					} else {
						this.showSnackbar(data.errors, true, "warning");
					}
					this.onSave = false;
				}
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.onSave = false;
			}
		},
		async show(ID) {
			this.onLoading = true;
			try {
				const { data } = await this.axios.get(URL + "/" + ID);
				this.categoria = data.data;
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
				if (this.$refs.updateCategoriaForm.validate()) {
					let response = await this.axios.put(
						URL + "/" + ID,
						this.categoria
					);
					if (response.data.success) {
						this.showSnackbar(
							response.data.message,
							true,
							"success"
						);
						setTimeout(() => {
							this.$router.go(-1);
						}, 500);
					} else {
						this.showSnackbar(
							response.data.errors,
							true,
							"warning"
						);
					}
					this.onSave = false;
				}
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onSave = false;
		},
		async deleteConfirm(ID) {
            if (
                await this.$refs.confirm.open(
                    "Confirma la eliminación de la categoría",
                    "Esta acción es irreversible ¿Segur@ que quieres continuar?"
                )
            ) {
                this.delete(ID);
            }
        },
		async delete(ID) {
			this.onSave = true;
			try {
				const { data } = await this.axios.delete(URL + "/" + ID);
				if (data.success) {
					this.$refs.confirm.cancel()
					setTimeout(() => {
						this.showSnackbar(data.message, true, "success");
						this.$nextTick(() => {
							const index = this.categorias.findIndex(
								(post) => post.idCategoria === ID
							);
							if (~index) this.categorias.splice(index, 1);
						});
						
					}, 300);
					this.getCategorias()
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
		reloadCategorias() {
			this.categorias = [];
			this.getCategorias();
		},
	},
};
