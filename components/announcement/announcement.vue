<template>
	<view class="announcement" :class="{'active': props.radius}">
		<uni-collapse>
			<uni-collapse-item :title="props.ann.title">
				<view class="contentStyle">
					{{props.ann.content}}
				</view>
			</uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script setup>
	const props = defineProps({
		ann: {
			id: Number,
			title: String,
			content: String
		},
		radius: Boolean
	})
</script>

<style lang="scss">
	.announcement {
		background: #fff;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;



		.contentStyle {
			padding: 35rpx;
			font-size: 40rpx;
		}

	}

	.active {
		margin-bottom: 0;
		padding-top: 15rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>