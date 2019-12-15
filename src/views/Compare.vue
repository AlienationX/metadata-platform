<template>
    <v-container fluid color="white">
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
                <v-autocomplete
                        v-model="tb1"
                        :items="tables"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
                <v-autocomplete
                        v-model="tb2"
                        :items="tables"
                        label="请选择"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-data-table
                :headers="headers"
                :items="items"
                :sort-by="[]"
                :sort-desc="[]"
                :loading="loading"
                loading-text="Loading... Please wait"
                fixed-header
                class="elevation-1"
                disable-pagination
                hide-default-footer
        >
        </v-data-table>
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            tb1: "",
            tb2: "",
            tables: [],
            headers: [
                {text: '左表字段序号', value: 'tb1_column_order', width: "100px"},
                {text: '左表字段英文名称', value: 'tb1_column_name', width: "200px"},
                {text: '左表字段中文名称', value: 'tb1_column_name_cn', width: "200px"},
                {text: '右表字段序号', value: 'tb2_column_order', width: "100px"},
                {text: '右表字段英文名称', value: 'tb2_column_name', width: "200px"},
                {text: '右表字段中文名称', value: 'tb2_column_name_cn', width: "200px"},
            ],
            items: []
        }),
        computed: {
            two_values: function () {
                return [this.tb1, this.tb2];
            }
        },
        methods: {
            getTables() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            this.tables = res.data.data.tables;
                        }
                    );
            },
            getCompareResult() {
                let params = {
                    tb1: this.tb1,
                    tb2: this.tb2,
                };
                this.$axios.get('/api/v1/resources/compare', {
                    params: params
                })
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res.data.data.items);
                            this.items = res.data.data.items;
                        }
                    )
            }
        },
        mounted() {
            this.getTables();
        },
        watch: {
            two_values: function (val) {
                if (val[0] !== "" && val[1] !== "") {
                    this.getCompareResult();
                }
            }
        }
    }
</script>