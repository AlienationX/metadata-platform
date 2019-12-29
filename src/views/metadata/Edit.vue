<template>
    <v-container fluid color="white">

        <v-row style="background-color:white;height:auto" class="elevation-1 mx-0">
            <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                        label="请选择"
                        :items="components"
                        dense
                        solo
                ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
                <v-dialog v-model="dialog" persistent max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary float-right" dark v-on="on">
                            <v-icon left>mdi-plus-circle-outline</v-icon>
                            Add Column
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">
                            <span class="headline">Add Column</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4" v-for="item in diaglogItems"
                                           :key="item.value">
                                        <v-text-field
                                                :label="item.text"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-checkbox
                                                v-model="checkbox"
                                                label="是否主键"
                                                color="primary"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-checkbox
                                                v-model="checkbox"
                                                label="是否必填"
                                                color="primary"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                                label="备注"
                                                rows="2"
                                                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                                                hint="Hint text"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small class="red--text">*indicates required field</small>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="green darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                multi-sort
                class="elevation-1"
        >
            <!--<template v-slot:top>-->
            <!--    <v-toolbar flat color="white">-->
            <!--        <v-row align="center">-->
            <!--            <v-col cols="12" sm="6" md="4">-->
            <!--                <div class="pt-10">-->
            <!--                    <v-autocomplete-->
            <!--                            label="请选择"-->
            <!--                            :items="components"-->
            <!--                            dense-->
            <!--                            solo-->
            <!--                    ></v-autocomplete>-->
            <!--                </div>-->
            <!--            </v-col>-->
            <!--            &lt;!&ndash;<v-divider&ndash;&gt;-->
            <!--            &lt;!&ndash;        class="mx-4"&ndash;&gt;-->
            <!--            &lt;!&ndash;        inset&ndash;&gt;-->
            <!--            &lt;!&ndash;        vertical&ndash;&gt;-->
            <!--            &lt;!&ndash;&gt;</v-divider>&ndash;&gt;-->
            <!--            <v-spacer></v-spacer>-->
            <!--            <v-btn color="primary float-right" dark>-->
            <!--                <v-icon left>mdi-plus-circle-outline</v-icon>-->
            <!--                Add Column-->
            <!--            </v-btn>-->
            <!--        </v-row>-->
            <!--    </v-toolbar>-->
            <!--</template>-->
            <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-square-edit-outline
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <v-snackbar
                v-model="snackbar"
                right
                dark
                color="red darken-2"
                :multi-line="true"
                :timeout="timeout"
        >
            Add column success.
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
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
                dialog: false,
                snackbar: false,
                timeout: 3000,
                checkbox: false,
                components: [
                    'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
                ],
                loading: 'false',
                search: '',
                headers: [
                    {text: 'Actions', value: 'action', sortable: false},
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
                    {text: '添加时间', value: 'insert_date', width: "200px"},
                    {text: '添加人', value: 'insert_operator', width: "100px"},
                    {text: '更新时间', value: 'update_date', width: "200px"},
                    {text: '更新人', value: 'update_operator', width: "100px"},
                    {text: '删除时间', value: 'delete_date', width: "200px"},
                    {text: '删除人', value: 'delete_operator', width: "100px"},
                ],
                items: [
                    {
                        table_type: 'DWB',
                        table_name: 'DWB_CLIENT',
                        table_name_cn: '客户信息表',
                        column_order: 1,
                        column_name: 'clientid',
                        column_name_cn: '客户id',
                        column_type: 'VARCHAR2',
                        column_length: '32',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-10 12:03:14',
                        insert_operator: 'lisi',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '已完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWB',
                        table_name: 'DWB_CLIENT',
                        table_name_cn: '客户信息表',
                        column_order: 1,
                        column_name: 'clientname',
                        column_name_cn: '客户姓名',
                        column_type: 'VARCHAR2',
                        column_length: '32',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-10 12:03:14',
                        insert_operator: 'lisi',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '已完成',
                        finish_date: '2019-12-01 00:00:01'
                    },
                    {
                        table_type: 'DWB',
                        table_name: 'DWB_CLIENT',
                        table_name_cn: '客户信息表',
                        column_order: 1,
                        column_name: 'sex',
                        column_name_cn: '性别',
                        column_type: 'VARCHAR2',
                        column_length: '32',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-10 12:03:14',
                        insert_operator: 'lisi',
                        update_date: '2019-12-05 23:59:59',
                        update_operator: '亚信',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计医疗机构概览统计医疗机构概览统计aaaaaaaaaa',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                    {
                        table_type: 'DWS',
                        table_name: 'DWS_Org_sum',
                        table_name_cn: '医疗机构概览统计',
                        column_order: 1,
                        column_name: 'durationType',
                        column_name_cn: '时间类型',
                        column_type: 'VARCHAR2',
                        column_length: '16',
                        is_primary: 1,
                        is_required: 1,
                        column_map: '',
                        remark: '',
                        insert_date: '2019-10-03',
                        insert_operator: '张三',
                        update_date: '',
                        update_operator: '',
                        delete_date: '',
                        delete_operator: '',
                        status: '未完成',
                        finish_date: ''
                    },
                ],
            }
        },
        computed: {
            diaglogItems: function () {
                return this.headers;
            }
        },
        mounted() {
            this.onResize()
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
            save() {
                this.snackbar = true;
                this.dialog = false;
            }
        },
    }
</script>

<style scoped>

</style>