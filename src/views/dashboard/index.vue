<template>
  <div class="dashboard">
    <p class="start">开始使用</p>
    <section class="step-wrapper">
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="grid-content info">
            <p class="title">案例 1</p>
            <div class="sub-title">动环设施集中运维管理平台</div>
            <div class="descript">供电拓扑、效果图、综保、空间拓扑、设备拓扑</div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content">
            <img width="100%"
                 src="~@/images/step-dh.jpg"
                 alt="">
          </div>
        </el-col>
      </el-row>
    </section>
    <section class="step-wrapper">
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="grid-content info">
            <p class="title">案例 2</p>
            <div class="sub-title">线路管理</div>
            <div class="descript">线路管理</div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content">
            <img width="100%"
                 src="~@/images/step-xlgl.png"
                 alt="">
          </div>
        </el-col>
      </el-row>
    </section>
    <section class="step-wrapper">
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="grid-content info">
            <p class="title">案例 3</p>
            <div class="sub-title">中移运维</div>
            <div class="descript"></div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content">
            <img width="100%"
                 src="~@/images/step-zyyw.png"
                 alt="">
          </div>
        </el-col>
      </el-row>
    </section>
    <p class="copyright">Copyright © 2019 - 2020 Aspire. All Rights Reserved. Aspire 版权所有</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #000;
  height: 100%;
  overflow-y: auto;
  .start {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    padding: 40px;
  }
  .step-wrapper {
    padding: 50px 150px;
    .grid-content.info {
      text-align: left;
      display: flex;
      flex-direction: column;
      margin-top: 150px;
      .title {
        font-size: 32px;
        color: #fff;
        margin-bottom: 30px;
      }
      .sub-title {
        font-size: 36px;
        color: #f1f1f1;
        margin-bottom: 40px;
      }
      .descript {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .copyright {
    padding: 160px 0;
    font-size: 14px;
    font-weight: 400;
    color: hsla(0, 0%, 100%, 0.7);
    text-align: center;
  }
}
</style>>
