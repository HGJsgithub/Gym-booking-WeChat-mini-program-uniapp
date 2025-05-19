<template>
  <view>
    <qf-image-cropper ref="qf" :width="1200" :height="1200" :radius="600" :gpu="true"
                      @crop="handleCrop"></qf-image-cropper>
  </view>
</template>

<script setup>
import qfImageCropper from "@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue";
import {handleCrop} from "@/methods/user/change-avatar";
const qf = ref(null)

onMounted(() => {
  qf.value.chooseImage({sourceType: ['album']})
})
</script>

<style>

</style>