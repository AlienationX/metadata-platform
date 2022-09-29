<template>
    <nav>
        <!-- hide-on-scroll flat class="grey" -->
        <v-app-bar app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = ! drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span class="font-weight-light grey--text">Data</span>
                <span>Todo</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text class="white" @click="toAbout">about</v-btn>
            <v-btn text class="white">
                <span>Sign Out</span>
                <v-icon right>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app >
            <v-list>
                <v-row align="center" justify="center">
                    <v-avatar size="80">
                        <img src="/z.jpg" alt="avatar">
                    </v-avatar>
                </v-row>
                <v-row align="center" justify="center" class="py-3">
                    <div class=".headline .font-weight-light text-center">TODO</div>
                </v-row>
                <v-divider></v-divider>

                <v-subheader>REPORTS</v-subheader>
                <v-list>
                    <v-list-group v-for="item in items" :key="item.title" :prepend-icon="item.action"
                                  v-model="item.active" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="subItem in item.items" :key="subItem.title" router :to="subItem.route">

                            <v-list-item-content>
                                <v-list-item-title v-text="subItem.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon>{{ subItem.icon }}</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                </v-list>

            </v-list>
        </v-navigation-drawer>

    </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                drawer: false,
                items: [
                    {
                        action: 'mdi-clipboard-list-outline',
                        title: 'Todo',
                        items: [
                            {title: 'Task', icon: 'mdi-format-list-checks', route: '/'},
                        ],
                    },
                    {
                        action: 'mdi-layers-triple-outline',
                        title: 'Metadata',
                        // active: true,
                        items: [
                            {title: "查询", icon: "mdi-playlist-check", route: "/metadata"},
                            {title: "映射", icon: "mdi-alpha-m-box-outline", route: "/mapping"},
                            {title: "单表操作", icon: "mdi-file-edit-outline", route: "/edit"},
                            {title: "表结构对比", icon: "mdi-tumblr-reblog", route: "/compare"},
                            {title: "上传", icon: "mdi-cloud-upload-outline", route: "/upload"},
                            {title: "操作日志", icon: "mdi-math-log", route: "/log"},
                        ],
                    },
                    {
                        action: 'mdi-file-download-outline',
                        title: 'Template',
                        // active: true,
                        items: [
                            {title: "模板下载", icon: "mdi-cloud-download-outline", route: "/download"},
                            // {title: "示例数据维护", icon: "mdi-cloud-download-outline", route: "/manage"},
                        ],
                    },
                    {
                        action: 'mdi-leaf-maple',
                        title: 'Education',
                        items: [
                            {title: 'List Item'},
                        ],
                    },
                    {
                        action: 'mdi-leaf',
                        title: 'Family',
                        items: [
                            {title: 'List Item'},
                        ],
                    },
                    {
                        action: 'mdi-chart-multiple',
                        title: 'Health',
                        items: [
                            {title: 'List Item'},
                        ],
                    },
                    {
                        action: 'mdi-windows',
                        title: 'Office',
                        items: [
                            {title: 'List Item'},
                        ],
                    },
                    {
                        action: 'mdi-settings',
                        title: 'Setting',
                        items: [
                            {title: 'List Item'},
                        ],
                    },
                ],
                links: [
                    // {icon: "mdi-clipboard-list-outline", text: "Todo", route: "/"},
                    {icon: "mdi-playlist-check", text: "查询", route: "/metadata"},
                    {icon: "mdi-alpha-m-box-outline", text: "映射", route: "/mapping"},
                    {icon: "mdi-file-edit-outline", text: "单表操作", route: "/edit"},
                    {icon: "mdi-tumblr-reblog", text: "表结构对比", route: "/compare"},
                    {icon: "mdi-cloud-upload-outline", text: "上传", route: "/upload"},
                    {icon: "mdi-math-log", text: "操作日志", route: "/log"},

                ],
                admins: [["Management", "people_outline"], ["Settings", "settings"]],
                cruds: [
                    ["Create", "add"],
                    ["Read", "insert_drive_file"],
                    ["Update", "update"],
                    ["Delete", "delete"]
                ]
            };
        },
        methods: {
            toAbout() {
                this.$router.push("/about");
            }
        }
    };
</script>