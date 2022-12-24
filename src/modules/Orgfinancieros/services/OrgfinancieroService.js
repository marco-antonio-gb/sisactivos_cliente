const URL = "/orgfinanciero";
export default {
	methods: {
		async getServicios() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.orgfinancieros = data.data;
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
		async created() {
			try {
				if (this.$refs.formCreateOrgfinanciero.validate()) {
					this.onSave = true;
					let response = await this.axios.post(
						URL,
						this.orgfinancieroForm
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
						this.showSnackbar(response.data.errors, true, "error");
					}
					this.onSave = false;
				} else {
					this.showSnackbar(
						"Complete la informacion requerida",
						true,
						"error"
					);
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
		async showOrgFinanciero(ID) {
			this.onLoading = true;
			try {
				const { data } = await this.axios.get(URL + "/" + ID);
				this.$nextTick(() => {
					this.orgfinancieroData = data.data;
				});
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
		async updateOrgfinanciero(formData) {
			this.onSave = true;
			try {
				const { data } = await this.axios.put(
					URL + "/" + formData.idOrgfinanciero,
					formData
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					setTimeout(() => {
						this.$router.go(-1);
					}, 400);
				} else {
					this.showSnackbar(data.validator, true, "success");
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

		async delete(ID) {
			try {
				this.onSave = true;
				const { data } = await this.axios.delete(URL + "/" + ID);
				if (data.success) {
					this.$refs.confirm.cancel();
					this.showSnackbar(data.message, true, "success");
					this.$nextTick(() => {
						const index = this.orgfinancieros.findIndex(
							(post) => post.idOrgfinanciero === ID
						);
						if (~index) this.orgfinancieros.splice(index, 1);
					});
					this.reloadOrgfinancieros();
				}
			} catch (error) {
				this.$refs.confirm.cancel();
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.onSave = false;
			}
		},
		reloadOrgfinancieros() {
			this.orgfinancieros = [];
			this.getServicios();
		},
		cancelarCreateOrgfinanciero() {
			this.$router.go(-1);
		},
	},
};
