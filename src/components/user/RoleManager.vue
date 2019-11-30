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
        <el-table :data="tableData" style="width: 98%" @row-click="rowClick">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="role_name" label="角色名称" width="180"></el-table-column>
            <el-table-column prop="role_describe" label="角色描述"></el-table-column>
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
                role: [
                    {
                        role_name: '',
                        role_describe: ''
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
                url: '/api/role/listAllRoles',
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
                this.modifyRole = row;
            },
            modifySubmit() {

                this.$axios({
                    url: '/api/role/updateRole',
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
                    url: '/api/role/deleteRoleById',
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
                    url: '/api/role/insertRole',
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

            }
        }
    }
</script>

<style scoped>

</style>
