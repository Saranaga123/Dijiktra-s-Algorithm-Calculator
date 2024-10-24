<template>
  <div>
    <div class="blue">
      <p class="heroquo">
        <span  class="herosaying">Dijiktra’s Algorithm Calculator</span>
        <br>
        <span class="subherosaying">Discovering Optimal Routes Through Nodes Using Dijkstra's Method</span></p>

    </div>
    <div class="lightblue">

    </div>
    <div class="container">
        <div class="inputs">
          <h3 class="topic">Select Path</h3>
          <div>
            <label for="startNode" class="subtitle">From Node:</label>
            <br>
            <select v-model="startNode" id="startNode" class="selectbx">
              <option hidden disabled selected>- Select -</option>
              <option v-for="node in nodes" :key="node" :value="node">{{ node }}</option>
            </select>
          </div>
          <div>
            <label for="endNode" class="subtitle">To Node:</label>
            <br>
            <select v-model="endNode" id="endNode" class="selectbx">
              <option v-for="node in nodes" :key="node" :value="node">{{ node }}</option>
            </select>
          </div>
          <button @click="clearSelection" :disabled="!startNode && !endNode" class="btn btnwhite">Clear</button>
          <button @click="findShortestPath" :disabled="!startNode || !endNode" class="btn btnorange">
  <i class="fas fa-calculator"></i> Calculate
</button>

        </div>
        <div  class="results">

          <div v-if="result">
            <h3 class="topic">Result</h3>
            <p>From Node "{{ startNode }}", to Node "{{ endNode }}": {{ result.path.join(', ') }}</p>
            <p>Total Distance: {{ result.distance }}</p>

            <div class="graph-container" data-v-469af010="">
              <div class="node" :class="{ nodeselected: nodeA }"
              style="top:80px; left:15px;" data-v-469af010="">A</div>
              <div class="node" :class="{ nodeselected: nodeB }"
              style="top:20px; left:60px;" data-v-469af010="">B</div>
              <div class="node" :class="{ nodeselected: nodeC }"
              style="top:150px; left:60px;" data-v-469af010="">C</div>
              <div class="node" :class="{ nodeselected: nodeD }"
              style="top:150px; left:150px;" data-v-469af010="">D</div>
              <div class="node" :class="{ nodeselected: nodeE }"
              style="top:80px; left:105px;" data-v-469af010="">E</div>
              <div class="node" :class="{ nodeselected: nodeF }"
              style="top:20px; left:150px;" data-v-469af010="">F</div>
              <div class="node" :class="{ nodeselected: nodeG }"
              style="top:150px; left:250px;" data-v-469af010="">G</div>
              <div class="node" :class="{ nodeselected: nodeH }"
              style="top:19px; left:250px;" data-v-469af010="">H</div>
              <div class="node" :class="{ nodeselected: nodeI }"
              style="top:80px; left:350px;" data-v-469af010="">I</div>
            </div>
            <div class="pathvar">
              <span v-for="(node, index) in result.path" :key="index">
                {{ node }}
              <span v-if="index < result.path.length - 1">
                  <i class="fas fa-arrow-right"></i>
                </span>
              </span>
            </div>

          </div>
          <div v-if="!result" class="imgtag">
            <img :src="require('@/assets/hero.png')" alt="hero" class="imgh">
          </div>

        </div>
      </div>

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { nodegraph, dijkstra } from '@/utils/graph';

export default defineComponent({
  data() {
    return {
      startNode: '',
      nodeA: false,
      nodeB: false,
      nodeC: false,
      nodeD: false,
      nodeE: false,
      nodeF: false,
      nodeG: false,
      nodeH: false,
      nodeI: false,
      endNode: '',
      nodes: Object.keys(nodegraph),
      result: null as { path: string[]; distance: number } | null,
    };
  },
  watch: {
    startNode(newValue: string) {
      this.resetNodeFlags();
      this.setNodeFlag(newValue, true);
    },
  },
  methods: {
    resetNodeFlags() {
      this.nodeA = false;
      this.nodeB = false;
      this.nodeC = false;
      this.nodeD = false;
      this.nodeE = false;
      this.nodeF = false;
      this.nodeG = false;
      this.nodeH = false;
      this.nodeI = false;
    },
    setNodeFlag(node: string, value: boolean) {
      if (node === 'A') this.nodeA = value;
      else if (node === 'B') this.nodeB = value;
      else if (node === 'C') this.nodeC = value;
      else if (node === 'D') this.nodeD = value;
      else if (node === 'E') this.nodeE = value;
      else if (node === 'F') this.nodeF = value;
      else if (node === 'G') this.nodeG = value;
      else if (node === 'H') this.nodeH = value;
      else if (node === 'I') this.nodeI = value;
    },
    findShortestPath() {
      const result = dijkstra(nodegraph, this.startNode, this.endNode);
      this.result = result || { path: [], distance: Infinity };
      this.resetNodeFlags();

      if (this.result.path.length > 0) {
        for (const node of this.result.path) {
          this.setNodeFlag(node, true);
        }
      }
    },
    clearSelection() {
      this.startNode = '';
      this.endNode = '';
      this.result = null;
    },
  },
});
</script>

<style scoped>
.pathvar{
  width:100%;
  text-align: center;
  font-weight: bold;
}
@media only screen and (min-width: 1280px) and (max-width: 1439px) {
  .container {
    background-color: #FFF;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    float: left;
    position: fixed;
    top:247px;
    z-index: 3;
    box-shadow: 0px 8px 22px 2px #0000001F;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 402px;
    padding: 32px 24px 32px 32px;
    opacity: 0px;

  }
  .imgh{
    height: 350px;
  }
}
@media only screen and (min-width: 1440px) and (max-width: 1919px) {
  .container {
    background-color: #FFF;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    float: left;
    position: fixed;
    top:247px;
    z-index: 3;
    box-shadow: 0px 8px 22px 2px #0000001F;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    height: 402px;
    padding: 32px 24px 32px 32px;
    opacity: 0px;

  }
  .imgh{
    height: 350px;
  }
}
@media only screen and (min-width: 1920px)  {
  .container {
    background-color: #FFF;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    float: left;
    position: fixed;
    top:247px;
    z-index: 3;
    box-shadow: 0px 8px 22px 2px #0000001F;
    width: 50%;
    margin-left: 22%;
    margin-right: 25%;
    height: 402px;
    padding: 32px 24px 32px 32px;
    opacity: 0px;

  }
  .imgh{
    height: 350px;
  }
}
.graph-container {
  position: relative;
  width: 400px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 auto;
  background-image: url('@/assets/graphback.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.node {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  font-size: 10px;
}
.nodeselected{
  background-color: #9e1010;
}
/* .imgh{
  height: 255px;
} */
.imgtag{
  text-align: center;

}
.btnwhite{
  color: #DA753C;
  border: #DA753C solid 1px;

}
.btnorange{
  background-color:#DA753C;
  color:white;
  border: white solid 1px;
  margin-left: 12px;
}
.heroquo{
  margin-top: 79px;
  text-align: center;
}
.herosaying{
  styleName: fontScale7/semiBold;
  font-family: Poppins;
  font-size: 36px;
  font-weight: 600;
  line-height: 48px;
  text-align: center;
  color: white;
}
.subherosaying{
  styleName: fontScale2/regular;
font-family: Poppins;
font-size: 18px;
font-weight: 400;
line-height: 24px;
text-align: center;

  color: white;
}
.btn{
  width: Hug (146px)px;
  height: Hug (44px)px;
  padding: 12px 16px 12px 16px;
  gap: 16px;
  border-radius: 8px;
  opacity: 0px;
  cursor: pointer;
}
.subtitle{
styleName: fontScale0/regular;
font-family: Poppins;
font-size: 14px;
font-weight: 400;
line-height: 18px;
text-align: left;

}
.selectbx{
  width: 80%;
  height: 42px;
  font-size: 14px;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.inputs {
  width:50%;
  float: left;
}

.results {
  width:50%;
  float: left;
}
.blue{
  background-color: #1154A3;
  width: 100%;
  position: fixed;
  top:0px;
  left: 0px;
  height:377px;
  z-index: 2;
  float: left;
}
.lightblue{
  background-color: #e7f3ff;
  position: fixed;
  top:0px;
  left: 0px;
  width: 100%;
  height:100vh;
  z-index: 1;
}
.topic{
styleName: fontScale3/semiBold;
font-family: Poppins;
font-size: 20px;
font-weight: 600;
line-height: 28px;
text-align: left;
color: #1154A3;

}
</style>
