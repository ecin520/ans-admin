<template>
    <div class="permission-manager">
        <el-button type="success" @click="showDialog">添加权限</el-button>
        <el-button type="warning" @click="showDialog">添加权限</el-button>
        <el-button type="danger" @click="showDialog">添加权限</el-button>&nbsp;
        <el-input
                style="width: 50%"
                placeholder="请输入相关信息"
                v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <br/><br/>
        <el-table border :data="tableData" style="width: 98%" @row-click="rowClick">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="permission_name" label="权限名称" width="180"></el-table-column>
            <el-table-column prop="permission_describe" label="权限描述"></el-table-column>
        </el-table>

        <el-dialog
                title="添加权限"
                :visible.sync="dialogVisible"
                :show-close="false"
                width="450px">
            <el-form label-position="left" label-width="100px" :mode="permission">
                <el-form-item label="权限名称">
                    <el-input v-model="permission.permission_name"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="permission.permission_describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRole = false">Cancel</el-button>
                <el-button type="primary" @click="formSubmit">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="修改权限"
                :visible.sync="dialogVisible1"
                :show-close="false"
                width="450px">
            <el-form label-position="left" label-width="100px" :mode="modifyPermission">
                <el-form-item label="权限名称">
                    <el-input v-model="modifyPermission.permission_name"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="modifyPermission.permission_describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="deleteRole">Delete</el-button>
                <el-button type="primary" @click="modifySubmit">Confirm</el-button>
            </span>
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
                        permission_name: '',
                        permission_describe: ''
                    }
                ],
                dialogVisible: false,
                dialogVisible1: false,
                permission: [
                    {
                        permission_name: '',
                        permission_describe: ''
                    }
                ],
                modifyPermission: [
                    {
                        permission_name: '',
                        permission_describe: ''
                    }
                ]
            }
        },
        mounted() {
            this.$axios({
                url: '/api/client/permission/listAllPermissions',
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
                this.dialogVisible1 = true;
                this.modifyPermission = row;
            },
            modifySubmit() {

                this.$axios({
                    url: '/api/client/permission/updatePermission',
                    method: 'post',
                    data: {
                        'id': this.modifyPermission.id,
                        'permission_name': this.modifyPermission.permission_name,
                        'permission_describe': this.modifyPermission.permission_describe
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
                    url: '/api/client/permission/deletePermissionById',
                    method: 'post',
                    params: {
                        'id': this.modifyPermission.id
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
                    url: '/api/client/permission/insertPermission',
                    method: 'post',
                    data: {
                        'permission_name': this.permission.permission_name,
                        'permission_describe': this.permission.permission_describe
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

            }
        }
    }
</script>

<style scoped>

</style>
