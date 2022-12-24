export default {
	methods: {
		detailItem(item) {
			this.$router.push({ path: "/servicios/update/" + item.id });
		},
		async deleteItem(itemId) {
            if (
                await this.$refs.confirm.open(
                    "Confirmacion para eliminar item",
                    "Esta seguro que quiere eliminar este Servicio?"
                )
            ) {
                this.delete(itemId);
            }
        },
	},
};
