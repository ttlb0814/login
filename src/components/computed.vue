<template>
  <div>
    <el-input  v-model="major" @blur="majorBlur(major)" @keyup.enter.native="majorBlur(major)" />
    <el-input  v-model="college" @blur="collegeBlur(college)" @keyup.enter.native="collegeBlur(college)" />
    <div>{{major}}/300*750*0.7+{{college}}*0.3 =
      <p style="font-size: 32px; color: coral">{{ result }}</p>
    </div>

    <div class="dice">
      <div class="count"></div>
      <div class="count"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "computed",
  // computed: {
  //   convertInto() {
  //     return this.major/300*100*.7+this.college/750*100*.3
  //   }
  // },
  data() {
    return {
      major: 0,
      college: 0,
      result: 0
    }
  },
  methods: {
    majorBlur(major) {
      this.major = major
      console.log(this.major)
      this.convertInto()
    },
    collegeBlur(college) {
      this.college = college
      console.log(this.college)
      this.convertInto()
    },
    convertInto() {
      console.log(this.major/300*100*.7+this.college/750*100*.3)

      return this.result = this.major/300*100*.7+this.college/750*100*.3
    }
  }
}
</script>

<style scoped>
  .dice{
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    border-radius: 32px;
    padding: 40px;
    margin: 0 auto;
    background: brown;
  }
  .count{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #000000;
    margin-right: 10px;
  }
  .count:nth-of-type(2) {
    align-self: flex-end;
  }

</style>
