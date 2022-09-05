<template>
    <div>
        <h2>线性进度条------------百分比外显</h2>
        <d-progress :percentage='0' ></d-progress>
        <d-progress :percentage='50' ></d-progress>
        <d-progress :percentage='100' status='success' ></d-progress>
        <d-progress :percentage='60' status='exception' ></d-progress>
      
        <br>
        <h2>线性进度条------------百分比内显</h2>
        <d-progress :stroke-width="18" :percentage='0' :textInside="true"></d-progress>
        <d-progress :stroke-width="18" :percentage='50' :textInside="true"></d-progress>
        <d-progress :stroke-width="18" :percentage='100' status='success' :textInside="true"></d-progress>
        <d-progress :stroke-width="18" :percentage='60' status='exception' :textInside="true"></d-progress>
    
        <br>
        <h2>环形进度条------------</h2>
        <d-progress :percentage='0' type='circle'></d-progress>
        <d-progress :percentage='50' type='circle'></d-progress>
        <d-progress :percentage='100' type='circle' status='success'></d-progress>
        <d-progress :percentage='80' type='circle' status='exception'></d-progress>
    </div>
</template>


<script>
import DProgress from './Progress'

export default {
    components: {   //注册组件
        DProgress
    },
    data (){
        return {
            msg: 'hello vue'
        }
    }
}
</script>



<style>

</style>