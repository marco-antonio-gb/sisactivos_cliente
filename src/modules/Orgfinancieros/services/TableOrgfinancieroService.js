export default {
	methods: {
		detailItem(itemId) {
			this.$router.push({ name: "orgfinancierosDetail", params:{idOrgfinanciero:itemId}});
		},
		updateItem(itemId) {
			this.$router.push({ name: "orgfinancierosUpdate", params:{idOrgfinanciero:itemId}});
		},
		async deleteItem(itemId) {
            if (
                await this.$refs.confirm.open(
                    "Confirmacion para eliminar item",
                    "Esta seguro que quiere eliminar este Org. Financiero?"
                )
            ) {
                this.delete(itemId);
            }
        },
	},
};
