<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onBeforeMount, onUpdated } from 'vue';
import api from "./services/uploadFetch"
const imgurl = ref()
const inputImg = ref()
onBeforeMount(async ()=>{
  await api.get('/upload').then(response =>{
    imgurl.value = response.data
    console.log(imgurl)
  })

})

async function postUpload(){
  try {
        const formData = new FormData()
        formData.append("imagem", inputImg.value)
        await api.post('/upload',formData)
      } catch(e) {
        console.log(e)
      }
}
</script>
<template>
  <div>
    <img :src="imgurl.url_img" alt="">
  </div>
  <div>
    <img v-if="inputImg" :src="inputImg.value" alt="">
  </div>
  <form action="">
    <input ref="input" type="file">
  </form>
  <button @click="postUpload()">Click</button>
  <RouterView />
</template>

<style scoped>

</style>
