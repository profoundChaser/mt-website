<template>
  <div class="theme-box ml10" @click="changeTheme" ref="themeBox">
    <div class="icon-box sun" v-if="isLight">
      <i class="el-icon-sunny"></i>
    </div>
    <div class="icon-box moon" v-else>
      <i class="el-icon-moon"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLight:true,
    }
  },
  methods:{
    changeTheme(){
        const themeBox=this.$refs.themeBox
        this.isLight=!this.isLight
        if(!this.isLight){
            themeBox.children[0].style.transform=`translateX(100%)`
        }else{
            themeBox.children[0].style.transform=`translateX(0)`
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-box {
  width: 50px;
  height: 25px;
  border-radius: 30px;
  /* box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.07), 0px 0px 3.4px rgba(0, 0, 0, 0.05),
    0px 0px 6.9px rgba(0, 0, 0, 0.042), 0px 0px 13px rgba(0, 0, 0, 0.035),
    0px 0px 25.1px rgba(0, 0, 0, 0.028), 0px 0px 68px rgba(0, 0, 0, 0.02); */
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgb(159, 158, 158);
  .icon-box {
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 30px;
    background: #fff;
    justify-content: center;
    align-items: center;
    transition: all .2s linear;
  }
  .moon{
    background: #000;
    transform: translateX(100%);
  }
}

.el-icon-sunny {
  color: rgb(217, 21, 21);
}
.el-icon-moon{
    color: rgb(237, 237, 7);
}
</style>
