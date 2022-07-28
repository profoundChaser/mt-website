<template>
  <div id="chat-container">
    <Card :height="630" :bodyStyle="{ padding: '0px' }">
      <el-col :span="6">
        <div class="friends-list-view">
          <ul class="friends-list">
            <li class="friends-list-item">
              <div class="left">
                <div class="avatar">头像</div>
              </div>
              <div class="center">
                <div class="username">名字</div>
                <div class="msg">消息</div>
              </div>
              <div class="right">
                <div class="time">昨天 20:52</div>
              </div>
            </li>
            <li class="friends-list-item">
              <div class="left">
                <div class="avatar">头像</div>
              </div>
              <div class="center">
                <div class="username">名字</div>
                <div class="msg">消息</div>
              </div>
              <div class="right">
                <div class="time">昨天 20:52</div>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
export default { components: { Card } }
</script>

<style lang="scss" scoped>
#chat-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-42%, -45%);
  width: 80%;
  .friends-list-view {
    height: 100%;
    overflow: hidden;
    background: wheat;
  }
}
</style>
