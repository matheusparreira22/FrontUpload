<script setup>
import { RouterView } from 'vue-router'
import { ref, onBeforeMount,  computed } from 'vue';
import api from "./services/uploadFetch"

const imgurl = ref()
const file = ref(null)
onBeforeMount(async ()=>{
  await api.get('/upload').then(response =>{
    imgurl.value = response.data
  })

})

const uploadPost =  async ()=>{

  try {
        const fileData = file.value
        console.log(fileData)
        const formData = new FormData()
        formData.append("imagem", fileData)
        console.log(formData)
        await api.post('/upload',formData,{
          headers: {"Content-Type":"multipart/form-data"}
        })
      } catch(e) {
        console.log(e)
      }

  
  try {
        const formData = new FormData()
        formData.append("imagem", file.value)
        console.log(file.value)
        await api.post('/upload',formData)
      } catch(e) {
        console.log(e)
      }
};
const uploadFile = (event) => {
  console.log (event.target.files[0])
  file.value = event.target.files[0];
  console.log(file.value)
};

</script>
<template>
  <div v-if="imgurl">
    <img :src="imgurl.url_img" alt="">
  </div>
  <input @change="uploadFile" type="file">
  <button @click="uploadPost">Click</button>
  <RouterView />
</template>

<style scoped>

</style>
