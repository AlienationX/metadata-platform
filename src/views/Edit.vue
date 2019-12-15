<template>
    <v-container fluid color="white">
        <v-row class="px-2 py-0">
            <v-col cols="3">
                <v-autocomplete
                        label="请选择"
                        :items="components"
                        dense
                        outlined
                ></v-autocomplete>
            </v-col>
            <v-col>
                <v-btn class="primary"><v-icon left>mdi-plus-circle-outline</v-icon>Add Column</v-btn>
                <v-btn text class="error--text"><v-icon left>mdi-delete-circle-outline</v-icon>Disable Table</v-btn>
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
                components: [
                    'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
                ],
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
            }
        },
    }
</script>

<style scoped>

</style>