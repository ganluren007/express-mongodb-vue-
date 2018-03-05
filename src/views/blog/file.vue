<template>
	<form method="post" enctype="multipart/form-data" action="http://localhost:3000/dataInpute">
		<input type="text" name="username">
		<input type="password" name="password">
		<input type="file" name="thumbnail">
		<input type="submit">
	</form>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import * as variables from "../../assets/js/common/variables.js";
	export default {
		beforeCreate: function() {

		},
		created() {

		},
		data() {
			return {

			}
		},
		components: {

		},
		methods: {

		},
		watch: {

		},
		mounted() {

		},
		computed: {

		}
	}
</script>

<style>

</style>