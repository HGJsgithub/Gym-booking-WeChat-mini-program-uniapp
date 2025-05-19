<template>
	<view class="venueType">
		<uni-segmented-control :current="0" :values="venueType" styleType="text"
			activeColor="#11c53e"></uni-segmented-control>
	</view>

</template>

<script setup>
	const venueType = ["羽毛球", "乒乓球", "网球", "篮球", "游泳", "健身房"]
</script>

<style lang="scss">
	.venueType {
		background-color: white;

	}
</style>