<template>
    <v-container fluid color="white">

        <v-row>
            <v-col cols="12" md="10">
                <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <!-- <v-text-field-->
                <!-- v-model="search"-->
                <!-- append-icon="search"-->
                <!-- label="Search"-->
                <!-- single-line-->
                <!-- hide-details-->
                <!-- ></v-text-field>-->
            </v-col>

            <v-col cols="12" md="2">
                <v-btn class="float-right" @click="downloadExcel" outlined color="indigo">
                    Download
                    <v-icon right>mdi-cloud-download-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :sort-by="[]"
                :sort-desc="[]"
                :loading="loading"
                loading-text="Loading... Please wait"
                fixed-header
                height="600"
                multi-sort
                class="elevation-1"
        >
            <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.is_primary="{ item }">
                <v-simple-checkbox v-model="item.is_primary" disabled></v-simple-checkbox>
            </template>
            <template v-slot:item.is_required="{ item }">
                <v-simple-checkbox v-model="item.is_required" disabled></v-simple-checkbox>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    export default {
        name: "ViewMetadata",
        data() {
            return {
                tables: [],
                loading: true,
                search: '',
                headers: [
                    {
                        text: '表类型',
                        align: 'left',
                        sortable: false,
                        width: "120",
                        value: 'table_type',
                        fixed: true
                    },
                    {text: '表英文名称', value: 'table_name', width: "200px", fixed: true},
                    {text: '表中文名称', value: 'table_name_cn', width: "200px", fixed: true},
                    {text: '字段序号', value: 'column_order', width: "100px"},
                    {text: '字段英文名称', value: 'column_name', width: "200px", sortable: false},
                    {text: '字段中文名称', value: 'column_name_cn', width: "200px", sortable: false},
                    {text: '字段类型', value: 'column_type', width: "100px", sortable: false},
                    {text: '字段长度', value: 'column_length', width: "100px", sortable: false},
                    {text: '是否主键', value: 'is_primary', width: "100px", sortable: false},
                    {text: '是否必填', value: 'is_required', width: "100px", sortable: false},
                    {text: '映射字段（医保）', value: 'column_map_yb', width: "100px", sortable: false},
                    {text: '映射字段（农合）', value: 'column_map_nh', width: "100px", sortable: false},
                    {text: '映射字段（HIS）', value: 'column_map_his', width: "100px", sortable: false},
                    {text: '备注', value: 'remark', width: "100px", sortable: false},
                    {text: '状态', value: 'status', width: "100px"},
                    {text: '完成日期', value: 'finish_date', width: "200px"},
                    {text: '操作人', value: 'operator', width: "100px"},
                    {text: '操作时间', value: 'operate_dt', width: "200px"},
                ],
                items: [],
            }
        },
        mounted() {
            this.requestApiGitHub();
            this.requestApi();
        },
        methods: {
            getColor(status) {
                if (status === '已完成') return 'green';
                else if (status === '未完成') return 'red';
                else return 'white'
            },
            requestApi() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((res) => {
                        this.items = res.data.data.metadata;
                        this.loading = false;
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err)
                    })
            },
            requestApiGitHub() {
                this.$axios.get('https://api.github.com/users/fasd')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                        }
                    );
            },
            downloadExcel() {
                this.$axios.get('/api/v1/resources/metaxlsx', {responseType: 'blob'})
                    .then((res) => {
                        // eslint-disable-next-line no-console
                        console.log(res.data, res.headers, res.headers['content-disposition']);
                        const filename = res.headers['content-disposition'].split(";")[1].replace("filename=", "");
                        const aLink = document.createElement("a");
                        let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        aLink.href = URL.createObjectURL(blob);
                        aLink.download = filename;
                        aLink.click();
                        document.body.appendChild(aLink);
                    })
            }
        },
    }
</script>

<style scoped>

</style>