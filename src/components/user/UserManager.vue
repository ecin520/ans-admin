<template>
    <div class="user-manager">
        <el-button type="success" @click="showDialog">添加用户</el-button>
        <el-button type="warning" @click="showDialog">添加用户</el-button>
        <el-button type="danger" @click="showDialog">添加用户</el-button>&nbsp;
        <el-input
                style="width: 50%"
                placeholder="请输入相关信息"
                v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <br/><br/>
        <el-table :data="tableData" style="width: 98%" @row-click="rowClick" >
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="tel_number" label="电话"></el-table-column>
            <el-table-column prop="rank" label="等级"></el-table-column>
<!--            <el-table-column prop="sign" label="签名"></el-table-column>-->
            <el-table-column prop="status" label="用户状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handle(scope.$index, scope.row)">角色</el-button>
                    <el-button size="mini" type="danger" >权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                :show-close="false"
                width="450px">
            <el-form label-position="left" label-width="100px" :mode="user">
                <el-form-item label="用户名">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="user.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="user.tel_number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteUser = false">Cancel</el-button>
                <el-button type="primary" @click="formSubmit">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="修改用户"
                :visible.sync="dialogVisible1"
                :show-close="false"
                top="1vh"
                width="650px">
            <el-form label-position="left" label-width="80px" :mode="modifyUser">
                <el-form-item label="用户名">
                    <el-input v-model="modifyUser.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="modifyUser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="modifyUser.avatar_url"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="modifyUser.tel_number"></el-input>
                </el-form-item>
                <el-form-item label="rank">
                    <el-input v-model="modifyUser.rank"></el-input>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input v-model="modifyUser.sign"></el-input>
                </el-form-item>
                <el-form-item label="status">
                    <el-input v-model="modifyUser.status"></el-input>
                </el-form-item>
                <el-form-item label="答题总数">
                    <el-input v-model="modifyUser.ans_number"></el-input>
                </el-form-item>
                <el-form-item label="答对题数">
                    <el-input v-model="modifyUser.correct_number"></el-input>
                </el-form-item>
                <el-form-item label="擅长类型">
                    <el-input v-model="modifyUser.good_at"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input v-model="modifyUser.register_time"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="deleteUser">Delete</el-button>
                <el-button type="primary" @click="modifySubmit">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="用户拥有角色"
                :visible.sync="dialogVisible2"
                :show-close="false"
                width="450px">
            <el-table :data="role" style="width: 100%" @row-click="rowClick" >
                <el-table-column prop="id" label="ID" ></el-table-column>
                <el-table-column prop="role_name" label="角色名" ></el-table-column>
                <el-table-column prop="role_describe" label="角色描述" ></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">Cancel</el-button>
                <el-button type="primary" @click="">Confirm</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                tableData: [{
                    id: '',
                    username: '',
                    nickname: '',
                    tel_number: '',
                    rank: '',
                    sign: '',
                    status: ''
                }],
                dialogVisible: false,
                dialogVisible1: false,
                dialogVisible2: false,
                role: [
                    {
                        id: '',
                        role_name: '',
                        role_describe: ''
                    }
                ],
                search: '',
                user: [
                    {
                        username: '' ,
                        password: '',
                        nickname: '',
                        tel_number: ''
                    }
                ],
                modifyUser: [
                    {
                        id: '',
                        username: '' ,
                        password: '',
                        nickname: '',
                        avatar_url: '',
                        tel_number: '',
                        rank: '',
                        sign: '',
                        status: '',
                        ans_number: '',
                        correct_number: '',
                        good_at: '',
                        register_time: ''

                    }
                ]
            }
        },
        methods: {
            showDialog() {

                this.dialogVisible = true;
            },
            handle(index) {
                this.$axios({
                    url: '/api/userRole/listRolesByUserId',
                    method: 'post',
                    params: {
                        'id': this.tableData[index].id,
                    }
                }).then(response => {

                }).catch(error => {
                    this.$message({
                        message: '查询失败',
                        type: 'error'
                    });
                });


                this.dialogVisible2 = true;

            },
            formSubmit() {

                this.$axios({
                    url: '/api/user/insertUser',
                    method: 'post',
                    data: {
                        'username': this.user.username,
                        'password': this.user.password,
                        'nickname': this.user.nickname,
                        'tel_number': this.user.tel_number
                    }
                }).then(response => {
                        this.$message({
                            message: response.data,
                            type: 'success'
                        });
                }).catch(error => {
                    this.$message({
                        message: '添加失败',
                        type: 'error'
                    });
                });
                this.dialogVisible = false;

            },
            modifySubmit() {

                this.$axios({
                    url: '/api/user/updateUser',
                    method: 'post',
                    data: {
                        'id': this.modifyUser.id,
                        'username': this.modifyUser.username,
                        'nickname': this.modifyUser.nickname,
                        'avatar_url': this.modifyUser.avatar_url,
                        'tel_number': this.modifyUser.tel_number,
                        'rank': this.modifyUser.rank,
                        'sign': this.modifyUser.sign,
                        'status': this.modifyUser.status,
                        'ans_number': this.modifyUser.ans_number,
                        'correct_number': this.modifyUser.correct_number,
                        'good_at': this.modifyUser.good_at,
                        'register_time': this.modifyUser.register_time
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: '修改失败',
                        type: 'error'
                    });
                });
                this.dialogVisible1 = false;

            },
            rowClick(row) {
                if (this.dialogVisible2 === false)
                    this.dialogVisible1 = true;
                this.modifyUser = row;
            },
            deleteUser() {

                this.$axios({
                    url: '/api/user/deleteUserById',
                    method: 'post',
                    params: {
                        'id': this.modifyUser.id
                    }
                }).then(response => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                });
                this.dialogVisible1 = false;
            }
        },
        mounted() {
            this.$axios({
                url: '/api/user/listAllUsers',
                method: 'get'
            }).then(response => {
                this.tableData = response.data;
            }).catch(error => {

            })
        }
    }
</script>

<style scoped>

</style>
