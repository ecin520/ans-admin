<template>
    <div class="role-manager">
        <el-button type="success" @click="showDialog">添加角色</el-button>
        <el-button type="warning" @click="showDialog">添加角色</el-button>
        <el-button type="danger" @click="showDialog">添加角色</el-button>&nbsp;
        <el-input
                style="width: 50%"
                placeholder="请输入相关信息"
                v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <br/><br/>
        <el-table :data="tableData" highlight-current-row style="width: 98%"  border @row-click="rowClick">
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="role_name" label="角色名称" ></el-table-column>
            <el-table-column prop="role_describe" label="角色描述"></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="grantPermission(scope.$index, scope.row)">授权</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="添加角色"
                :visible.sync="dialogVisible"
                :show-close="false"
                width="450px">
            <el-form label-position="left" label-width="100px" :mode="role">
                <el-form-item label="角色名称">
                    <el-input v-model="role.role_name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="role.role_describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRole = false">Cancel</el-button>
                <el-button type="primary" @click="formSubmit">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="修改角色"
                :visible.sync="dialogVisible1"
                :show-close="false"
                width="450px">
            <el-form label-position="left" label-width="100px" :mode="modifyRole">
                <el-form-item label="角色名称">
                    <el-input v-model="modifyRole.role_name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="modifyRole.role_describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="deleteRole">Delete</el-button>
                <el-button type="primary" @click="modifySubmit">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="角色拥有权限"
                :visible.sync="dialogVisible2"
                :show-close="false"
                top="1vh"
                width="550px">
            <el-table :data="permission" border style="width: 100%">
                <el-table-column prop="id" label="ID" ></el-table-column>
                <el-table-column prop="permission_name" label="权限名" ></el-table-column>
                <el-table-column prop="permission_describe" label="权限描述" ></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="grantPermissionClick">授予权限</el-button>
                <el-button type="primary" @click="">确认</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="授予权限"
                :visible.sync="dialogVisible3"
                :show-close="false"
                top="1vh"
                width="650px">
            <el-table :data="permissionTable" style="width: 100%" border @row-click="permissionTableRowClick">
                <el-table-column prop="id" label="ID" ></el-table-column>
                <el-table-column prop="permission_name" label="权限名" ></el-table-column>
                <el-table-column prop="permission_describe" label="权限描述" ></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        id: '',
                        role_name: '',
                        role_describe: ''
                    }
                ],
                dialogVisible: false,
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
                role: [
                    {
                        role_name: '',
                        role_describe: ''
                    }
                ],
                permission: [
                    {
                        id: '',
                        permission_name: '',
                        permission_describe: ''
                    }
                ],
                permissionTable: [
                    {
                        id: '',
                        permission_name: '',
                        permission_describe: ''
                    }
                ],
                modifyRole: [
                    {
                        role_name: '',
                        role_describe: ''
                    }
                ]
            }
        },
        mounted() {
            this.$axios({
                url: '/api/client/role/listAllRoles',
                method: 'get'
            }).then(response => {
                this.tableData = response.data
            }).catch(error => {
                this.$message({
                    message: '查询失败！',
                    type: 'error'
                });
            });

        },
        methods: {
            showDialog() {
                this.dialogVisible = true;
            },
            rowClick(row) {
                if (this.dialogVisible2 === false) {
                    this.dialogVisible1 = true;
                }
                this.modifyRole = row;
            },
            permissionTableRowClick(row) {

                this.$confirm('此操作将授予该用户此角色，是否授予？', 'Tiptop', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$axios({
                        url: '/api/client/rolePermission/insertRolePermission',
                        method: 'post',
                        params: {
                            'rid': this.modifyRole.id,
                            'pid': row.id
                        }
                    }).then(response => {
                        this.$message({
                            type: 'success',
                            message: response.data
                        });
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: '授予权限失败'
                        });
                    }).finally(fina =>{
                        this.dialogVisible2 = false;
                        this.dialogVisible3 = false;
                    });
                }).catch(() => {

                });

            },
            modifySubmit() {

                this.$axios({
                    url: '/api/client/role/updateRole',
                    method: 'post',
                    data: {
                        'id': this.modifyRole.id,
                        'role_name': this.modifyRole.role_name,
                        'role_describe': this.modifyRole.role_describe
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: '修改失败！',
                        type: 'error'
                    });
                });
                this.dialogVisible1 = false;


            },
            deleteRole() {

                this.$axios({
                    url: '/api/client/role/deleteRoleById',
                    method: 'post',
                    params: {
                        'id': this.modifyRole.id
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: error,
                        type: 'error'
                    });
                });
                this.dialogVisible1 = false;

            },
            formSubmit() {

                this.$axios({
                    url: '/api/client/role/insertRole',
                    method: 'post',
                    params: {
                        'role_name': this.role.role_name,
                        'role_describe': this.role.role_describe
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: '添加失败！',
                        type: 'error'
                    });
                });
                this.dialogVisible = false;

            },
            grantPermission(index) {
                this.modifyRole = this.tableData[index];
                this.$axios({
                    url: '/api/client/rolePermission/listPermissionsByRoleId',
                    method: 'post',
                    params: {
                        'rid': this.modifyRole.id
                    }
                }).then(response => {
                    this.permission = response.data
                }).catch(error => {
                    this.$message({
                        message: '查询失败！',
                        type: 'error'
                    });
                });
                this.dialogVisible2 = true;
            },
            grantPermissionClick() {
                this.dialogVisible3 = true;

                this.$axios({
                    url: '/api/client/permission/listAllPermissions',
                    method: 'get'
                }).then(response => {
                    this.permissionTable = response.data
                }).catch(error => {
                    this.$message({
                        message: '查询失败！',
                        type: 'error'
                    });
                });


            }
        }
    }
</script>

<style scoped>

</style>
