<template>
    <div class="login">
        <transition name="el-fade-in-linear">
            <el-card class="login-card">
                <img width="70%" class="image" src="@/assets/logo1.gif"><br/>
                <el-input prefix-icon="el-icon-user-solid" placeholder="username" v-model="username"></el-input><br><br>
                <el-input prefix-icon="el-icon-key" placeholder="password" v-model="password" show-password></el-input><br><br>
                <el-button @click="loginClick" class="login-btn" type="success">Login</el-button>
            </el-card>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            loginClick() {

                this.$axios({
                    url: '/api/client/user/login',
                    method: 'get',
                    params: {
                        'username': this.username,
                        'password': this.password
                    }
                }).then(response => {
                    if (response.data['status code'] === 200) {
                        this.$message({
                            message: response.data,
                            type: 'success'
                        });
                        this.$cookies.set('isLogin', 'ecin520');
                        this.$cookies.set('user', this.username);
                        this.$router.push({name: 'Home'});
                    } else {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        message: error,
                        type: 'error'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        .login-card {
            display: flex;
            justify-content: center;
            margin: 120px auto;
            width: 350px;
            .image {
                margin-left: 40px;
            }
            .login-btn {
                margin-left: 120px;
            }
        }
    }
</style>
