<script setup>
import { RouterView } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import api from "./services/uploadFetch";

const imgurl = ref();
const file = ref(null);
const isImage = ref(false);
const imgSrc = ref();
onBeforeMount(async () => {
  await api.get("/upload").then((response) => {
    imgurl.value = response.data;
  });
});
const onHandler = () => {
  isImage.value = !isImage;
};

const uploadPost = async () => {
  try {
    const fileData = file.value;
    console.log(fileData);
    const formData = new FormData();
    formData.append("imagem", fileData);
    console.log(formData);
    await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (e) {
    console.log(e);
  }

  try {
    const formData = new FormData();
    formData.append("imagem", file.value);
    console.log(file.value);
    await api.post("/upload", formData);
  } catch (e) {
    console.log(e);
  }
};
const uploadFile = (event) => {
  file.value = event.target.files[0];
  const reader = new FileReader();
  if (file) {
    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;
      imgSrc.value = readerTarget.result;
      isImage.value = true;
    });
    console.log(reader.readAsDataURL(event.target.files[0]));
  }
};
</script>
<template>
  <div class="content">
    <div>
      <h1>preview</h1>
      <button v-if="isImage" class="close" @click="onHandler">
        <small>&times;</small>
      </button>
      <label class="picture" for="picture_input">
        <div v-if="isImage">
          <img class="image-preview" :src="imgSrc" alt="" />
        </div>
        <span v-else class="picture_image">Choose an image</span>
      </label>
        <input id="picture_input" @change="uploadFile" type="file" />
        <button @click="uploadPost">Enviar</button>
    </div>
    <div class="show-image" v-if="imgurl">
      <img class="background-right" :src="imgurl.url_img" alt="" />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
  gap: 1rem;
}
.image-preview{
  width: 100%;
}
.show-image{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 100%;
  background-color: #eee;
  border-radius: 2%;
}
img {
  object-fit: cover;
  max-height: 350px;
  max-width: 400px;
}
button {
  width: 90px;
  height: 50px;
}
#picture_input {
  display: none;
}
.picture {
  width: 400px;
  aspect-ratio: 16/9;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  border: 2px dashed currentColor;
  cursor: pointer;
  font-family: sans-serif;
  transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
}
.picture:hover {
  color: #777;
  background-color: #ccc;
}
.picture:active {
  border-color: rgb(37, 239, 172);
  background-color: #ddd;
}
.picture_image {
  max-width: 100%;
}
.close {
  display: flex;
  height: 1rem;
  width: 1rem;
  justify-content: center;
  align-items: center;
  background-color: rgb(135, 135, 135);
  color: white;
  border-radius: 40%;
  gap: 2px;
}
.close small {
  align-items: center;
  color: black;
  padding: 1px;
  font-size: 1rem;
}
</style>
