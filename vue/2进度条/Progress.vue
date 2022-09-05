<template>
    <div class='progress'
        :class="[
            status ? `is-${status}` : '',
            `progress--${type}`
        ]"
    >
        <div class="progress-bar" v-if="type == 'line'">
            <div class="progress-bar__outer" :style="{height: strokeWidth+'px'}" >
                <div class="progress-bar__inner" :style="barStyle">
                    <div class="progress-bar__innerText" v-if="textInside && showText">{{ percentage }}%</div>
                </div>
            </div>
        </div>

        <div class="progress-circle"
        :style="{width: width+'px',height: width+'px'}"
         v-else
         >
            <svg viewBox="0 0 100 100">
                <path
                    :d="trackPath"
                    fill='none'
                    :stroke-width='relativeStrokeWidth'
                    stroke="#e5e9f2"
                ></path>
                <path
                    :d="trackPath"
                    fill='none'
                    :stroke-width='relativeStrokeWidth'
                    :stroke="stroke"
                    :style="circlePathStyle"
                    stroke-linecap='round'
                ></path>
            </svg>
        </div>

        <div class="progress__text"
            :style="{fontSize: progressTextSize+'px'}"
            v-if="!textInside && showText"
        >
            <template v-if='!status'>{{ percentage }}% </template> 
            <i v-else class="icon" :class="iconClass"></i>
        </div>
    </div>
</template>



<script>
export default {
    props: {
        strokeWidth: {  //进度条宽度
            type: Number,
            default: 6
        },
        percentage: {   //百分比
            type: Number,
            required: true,
            default: 0,
            // validator (value){
                // return value>=0 && value<=100;
            // },
            validator: val => val>=0 && val<=100
        },
        status: {   //进度条当前状态
            type: String
        },
        type: {     //进度条类型
            type: String,
            default: 'line',
            validator: val => ['line','circle'].indexOf(val)
        },
        textInside: {   //true百分比内显  false 百分比外显
            type: Boolean,
            default: false
        },
        showText: {     //是否显示进度条文字内容
            type: Boolean,
            default: true
        },
        color: {    //进度条背景颜色
            type: String
        },
        width: {
            type: Number,
            default: 126
        }
    },
    computed: {     
        progressTextSize () {
            return 12+this.strokeWidth*0.4;
        },
        stroke (){
            let color;
            if(this.color){
                return this.color;
            }
            switch (this.status){
                case 'success': 
                    color = '#13ce66';
                    break;
                case 'exception' :
                    color = '#ff4949';
                    break;
                default:
                    color = '#20a0ff';
            }
            return color;
        },
        barStyle (){
            return {
                width: this.percentage+'%',
                backgroundColor: this.stroke
            }
        },
        iconClass (){
            if(this.type == 'line'){
                return this.status == 'success' 
                    ? 'icon-circle-check'
                    : 'icon-circle-close'
            }else{
                return this.status == 'success' 
                    ? 'icon-check'
                    : 'icon-close'
            }
        },
        trackPath (){
            const radius = 50 - this.relativeStrokeWidth/2;
            return `M 50 50 
            m 0 -${radius}  
            a ${radius} ${radius} 0 1 1 0 ${radius * 2} 
            a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
        },
        relativeStrokeWidth (){
            return this.strokeWidth * 100 / this.width;
        },
        perimater (){
            const radius = 50 - this.relativeStrokeWidth/2;
            return 2 * Math.PI *radius;
        },
        circlePathStyle (){
            const perimater = this.perimater;
            return {
                strokeDasharray: `${perimater}px, ${perimater}px`,
                strokeDashoffset: (1 - this.percentage / 100) * perimater + 'px'
            }
        }
    }
}
</script>



<style>
.progress--circle{
    display: inline-block;
    position: relative;
}
.progress--circle .progress__text{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    margin-left: 0;
}
.progress.is-success{
    color: #67c23a;
}
.progress.is-exception{
    color: #f56c6c;
}
.progress-bar{
    display: inline-block;
    /* width: calc(100%-50px); */
    width: 100%;
    display: inline-block;
    padding-right: 50px;
    box-sizing: border-box;
    margin-right: -50px;
}
.progress-bar__outer{
    border-radius: 100px;
    background-color: #ebeef5;
}
.progress-bar__inner{
    height: 100%;
    line-height: 1;
    border-radius: 100px;
    background-color: yellow;
    transition: width 1s ease;
    text-align: right;
    vertical-align: middle;
}
.progress__text{
    display: inline-block;
    margin-left: 10px;
}
.progress-bar__innerText{
    color: #fff;
    display: inline-block;
    font-size: 12px;
    margin: 0 5px;
}

@font-face {
  font-family: 'icon';  /* project id 1308999 */
  src: url('./icon/iconfont.eot');
  src: url('./icon/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./icon/iconfont.woff2') format('woff2'),
  url('./icon/iconfont.woff') format('woff'),
  url('./icon/iconfont.ttf') format('truetype'),
  url('./icon/iconfont.svg#iconfont') format('svg');
}

.icon{
    font-family: 'icon' !important;
    font-size: 16px;
    font-style: normal;
}
.icon-circle-check::before{
    content: '\e663';
}
.icon-circle-close::before{
    content: '\e605';
}
.icon-check::before{
    content: '\e742';
}
.icon-close::before{
    content: '\e61f';
}
</style>