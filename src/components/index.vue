<template>
    <div>
        <div class="container">
            字体
<!--            <Row  type="flex" justify="center">-->
<!--                <Col :span="8">-->
<!--                    <Form>-->
<!--                        <Form-item label="账号" :labelWidth="80">-->
<!--                            <Input :model="formObj"></Input>-->
<!--                        </Form-item>-->
<!--                        <Form-item label="密码" :labelWidth="80">-->
<!--                            <Input :model="formObj" ></Input>-->
<!--                        </Form-item>-->
<!--                    </Form>-->
<!--                </Col>-->
<!--            </Row>-->
            <el-row>
                <el-col :span="12">
                    <el-form>
                        <el-form-item label="账号">
                            <el-input></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
<!--                <van-image :src=""></van-image>-->
        </div>
    </div>
</template>

<script>

    export default {

      data() {
          return {
            formObj: {
                number: '',
                password: ''
            }
          }
      }
    }
</script>

<style scoped>
    .container {
        padding: 0;
        margin: 0;
    }
    .container {
        /*font-size: 16px !important;*/
    }
</style>
