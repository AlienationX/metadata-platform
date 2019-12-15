<template>
    <div>
        <!--        <v-form>-->
        <!-- <v-container>-->
        <!--      <v-row class="px-2 py-0">-->
        <!--        <v-col cols="3">-->
        <!--          <v-autocomplete-->
        <!--                  label="表中文名称"-->
        <!--                  :items="components"-->
        <!--                  dense-->
        <!--                  outlined-->
        <!--                  multiple-->
        <!--          ></v-autocomplete>-->
        <!--        </v-col>-->
        <!--        <v-col cols="3">-->
        <!--          <v-autocomplete-->
        <!--                  label="表英文名称"-->
        <!--                  :items="components"-->
        <!--                  dense-->
        <!--                  multiple-->
        <!--          ></v-autocomplete>-->
        <!--        </v-col>-->
        <!--        <v-col cols="3">-->
        <!--          <v-autocomplete-->
        <!--                  label="字段中文名称"-->
        <!--                  :items="components"-->
        <!--                  dense-->
        <!--                  multiple-->
        <!--          ></v-autocomplete>-->
        <!--        </v-col>-->
        <!--        <v-col cols="3">-->
        <!--          <v-autocomplete-->
        <!--                  label="字段英文名称"-->
        <!--                  :items="components"-->
        <!--                  dense-->
        <!--          ></v-autocomplete>-->
        <!--        </v-col>-->

        <!--      </v-row>-->

        <!-- </v-container>-->
        <!--        </v-form>-->

        <v-row>
            <v-col cols="11">
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

            <v-col cols="1">
                <v-btn class="primary" tile>下载</v-btn>
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
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item.column_name)"
                >
                    mdi-square-edit-outline
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item.column_name)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

    </div>
</template>

<script>
    export default {
        name: "ViewMetadata",
        data() {
            return {
                windowSize: {
                    x: 0,
                    y: 0,
                },
                components: [],
                loading: 'false',
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
                    {text: '表英文名称', value: 'table_name', width: "100px", fixed: true},
                    {text: '表中文名称', value: 'table_name_cn', width: "200px", fixed: true},
                    {text: '字段序号', value: 'column_order', width: "100px"},
                    {text: '字段英文名称', value: 'column_name', width: "200px", sortable: false},
                    {text: '字段中文名称', value: 'column_name_cn', width: "200px", sortable: false},
                    {text: '字段类型', value: 'column_type', width: "100px", sortable: false},
                    {text: '字段长度', value: 'column_length', width: "100px", sortable: false},
                    {text: '是否主键', value: 'is_primary', width: "100px", sortable: false},
                    {text: '是否必填', value: 'is_required', width: "100px", sortable: false},
                    {text: '映射字段', value: 'column_map', width: "100px", sortable: false},
                    {text: '备注', value: 'remark', width: "100px", sortable: false},
                    {text: '状态', value: 'status', width: "100px"},
                    {text: '添加时间', value: 'insert_st', width: "200px"},
                    {text: '添加人', value: 'insert_operator', width: "100px"},
                    {text: '更新时间', value: 'update_st', width: "200px"},
                    {text: '更新人', value: 'update_operator', width: "100px"},
                    {text: '删除时间', value: 'delete_st', width: "200px"},
                    {text: '删除人', value: 'delete_operator', width: "100px"},
                ],
                items: [],
            }
        },
        mounted() {
            this.onResize();
            this.requestApiGitHub();
            this.requestApi();
        },
        methods: {
            onResize() {
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },
            getColor(status) {
                if (status === '已完成') return 'green'
                // else if (calories > 200) return 'orange'
                else return 'red'
            },
            editItem(input) {
                // eslint-disable-next-line no-console
                console.log(input);
                return "yes"
            },
            deleteItem(input) {
                // eslint-disable-next-line no-console
                console.log(input);
            },
            requestApi() {
                this.$axios.get('/api/v1/resources/metadatas')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            this.items = res.data.data.metadata;
                            this.components = res.data.data.tables;
                        }
                    )
                    .catch((err) => {
                            // eslint-disable-next-line no-console
                            console.log(err)
                        }
                    );
            },
            requestApiGitHub() {
                this.$axios.get('https://api.github.com/users/fasd')
                    .then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                        }
                    );
            }
        },
    }
</script>

<style scoped>

</style>