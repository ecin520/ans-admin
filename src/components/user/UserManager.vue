<template>
    <el-table :data="tableData" style="width: 98%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>

        <el-table-column prop="tel_number" label="电话"></el-table-column>
        <el-table-column prop="rank" label="等级"></el-table-column>
        <el-table-column prop="sign" label="签名"></el-table-column>
        <el-table-column prop="status" label="用户状态"></el-table-column>

    </el-table>
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
                }]
            }
        },
        methods: {

        },
        mounted() {
            this.$axios({
                url: '/api/fuck',
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
