<template>
  <div class="question-review">
    <el-table
        :resizable="false"
        :data="question"
        highlight-current-row
        :border="true"
        @row-click="questionItemRowClick">
      <el-table-column :show-overflow-tooltip="true" align="center" prop="id" label="ID"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="type_name" label="类型"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="question_owner" label="作者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="question_describe"
                       label="问题描述"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="question_explain"
                       label="问题解释"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="item_a" label="A"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="item_b" label="B"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="item_c" label="C"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="item_d" label="D"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="item_ans" label="正确选项"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" prop="question_status"
                       label="status"></el-table-column>
    </el-table>

    <el-dialog
        :visible.sync="questionCardDialog"
        :title="question.type_name"
        :show-close="false"
        top="1vh"
        width="690px">
      <el-card>
        <div slot="header">
          <span>{{question.question_describe}}</span>
        </div>
        <el-alert :title="'A. '+question.item_a" type="success" :closable="false"></el-alert>
        <el-alert :title="'B. '+question.item_b" type="success" :closable="false"></el-alert>
        <el-alert :title="'C. '+question.item_c" type="success" :closable="false"></el-alert>
        <el-alert :title="'D. '+question.item_d" type="success" :closable="false"></el-alert>
        <h2 style="color: #67C23A">正确答案：{{question.item_ans}}</h2>
        <h2 style="color: #F56C6C">解析：</h2>
        <p>{{question.question_explain}}</p>
      </el-card>
      <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="noPass">审核不通过</el-button>
          <el-button type="success" @click="pass">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                questionCardDialog: false,
                question: [
                    {
                        'id': '',
                        'type_name': '',
                        'question_owner': '',
                        'question_describe': '',
                        'question_explain': '',
                        'item_a': '',
                        'item_b': '',
                        'item_c': '',
                        'item_d': '',
                        'item_ans': '',
                        'question_status': ''
                    }
                ],
            }
        },
        methods: {
            questionItemRowClick(row) {

                this.question = row;
                this.questionCardDialog = true;
            },
            noPass() {
                this.$message({
                    message: this.question.id,
                    type: 'error'
                });
            },
            pass() {

                this.$axios({
                    url: '/api/client/question/updateQuestion',
                    method: 'post',
                    data: {
                        'id': this.question.id,
                        'type_name': this.question.type_name,
                        'question_owner': this.owner,
                        'question_describe': this.question.question_describe,
                        'question_explain': this.question.question_explain,
                        'item_a': this.question.item_a,
                        'item_b': this.question.item_b,
                        'item_c': this.question.item_c,
                        'item_d': this.question.item_d,
                        'item_ans': this.question.item_ans,
                        'question_status': 1
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

            }
        },
        created() {
            this.$axios({
                url: '/api/client/question/listAllQuestions',
                method: 'get',
                params: {
                    'status': 2
                }
            }).then(response => {
                this.question = response.data
            }).catch(error => {
                this.$message({
                    message: error,
                    type: 'error'
                });
            });
        }
    }
</script>

<style scoped>

</style>