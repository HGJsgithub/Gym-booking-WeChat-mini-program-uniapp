<template>
	<view class="user-card">
		<view class="nickname">{{props.userInfo.nickname}}</view>
		<view class="user-ID">用户ID：{{props.userInfo.id}}</view>
		<view class="phone">手机号：{{props.userInfo.phone}}</view>
		<view class="registration-time">注册时间：{{props.userInfo.createTime}}</view>
		<button class="delete-button" size="mini" type="warn" @click="deleteUser(props.index)">删除</button>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const props = defineProps({
		index: Number,
		userInfo: {
			id: Number,
			nickname: String,
			phone: String,
			createTime: String,
		}
	})

	function deleteUser(index) {
		uni.showModal({
			title: "是否删除？",
			confirmText: "否",
			cancelText: "是",
			confirmColor: "#11c53e",
			cancelColor: "#ff0000",
			success: (res) => {
				if (res.cancel) {
					store.commit('delete_User', index)
					uni.showToast({})
				}
			}
		})
	}
</script>

<style lang="scss">
	.user-card {
		// box-sizing: border-box;
		background: #fff;
		width: 100%;
		margin-bottom: 50rpx;
		padding-bottom: 30rpx;
		border: 1.5px #b2b3b4;
		border-radius: 10px;


		.nickname {
			color: #fff;
			background-color: #10d642;
			padding: 30rpx;
			font-size: 30rpx;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		.user-ID {
			width: fit-content;
			padding: 30rpx;
			padding-bottom: 0;
		}

		.phone {
			width: fit-content;
			padding: 30rpx;
			padding-bottom: 0;
		}

		.registration-time {
			float: left;
			width: fit-content;
			padding: 30rpx;
		}

		.delete-button {
			margin-top: 20rpx;
			margin-left: 200rpx;
		}
	}
</style>