<template>
    <div class="serverError-index">
        <div class="content">
            <h1>服务器出错了,请刷新页面尝试重新连接</h1>
            <img src="../../assets/gif/401.gif" alt=""/>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.serverError-index{
    width:100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>