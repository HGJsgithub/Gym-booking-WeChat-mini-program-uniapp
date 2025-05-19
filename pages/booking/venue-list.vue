<template>
	<view class="venue-list-page">
		<view class="venue-card" style="margin-top: 45rpx;" hover-class="click-class" hover-stay-time="100"
			@click="navigateTo(path,'羽毛球','badminton')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/badminton.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					羽毛球馆
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区羽毛球馆。
			</view>
		</view>

		<view class="venue-card" hover-class="click-class" hover-stay-time="100"
			@click="navigateTo(path,'乒乓球','tableTennis')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/tabletennis.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					乒乓球馆
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区乒乓球馆。
			</view>
		</view>

		<view class="venue-card" hover-class="click-class" hover-stay-time="100"
			@click="navigateTo(path,'网球','tennis')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/tennis.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					网球馆
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区网球馆。
			</view>
		</view>

		<view class="venue-card" hover-class="click-class" hover-stay-time="100" @click="navigateTo(unopenPath,'篮球')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/basketball.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					篮球场
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区篮球场。
			</view>
		</view>

		<view class="venue-card" hover-class="click-class" hover-stay-time="100" @click="navigateTo(unopenPath,'游泳')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/badminton.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					游泳馆
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区游泳馆。
			</view>
		</view>

		<view class="venue-card" style="margin-bottom: 45rpx;" hover-class="click-class" hover-stay-time="100"
			@click="navigateTo(unopenPath,'健身')">
			<view class="venue-icon-and-name">
				<image src="../../static/sports_icon/bodybuilding.png" mode="widthFix" class="venue-icon"></image>
				<view class="venue-name">
					健身房
				</view>
			</view>
			<view class="thin-line"></view>
			<view class="venue-address">
				地址：广东省广州市番禺区广东工业大学大学城校区健身房。
			</view>
		</view>

	</view>


</template>

<script setup>
	const path = '/pages/booking/booking-page'
	const unopenPath = '/pages/booking/unopen-venue'

	function navigateTo(pagePath, venueTypeCN, venueTypeEN) {
		uni.navigateTo({
			url: pagePath,
			success: () => {
				uni.$emit('indexRes', {
					venueTypeCN: venueTypeCN,
					venueTypeEN: venueTypeEN
				})
			}
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.venue-list-page {
		display: flex;
		flex-direction: column;
		align-items: center;

		.venue-card {
			width: 92%;
			height: 15%;
			margin: 22rpx;
			padding-bottom: 25rpx;
			border-radius: 12rpx;
			background-color: #fff;
			box-shadow: 1px 1px 7px 4px rgba(0, 0, 0, 0.2);


			.venue-icon-and-name {
				padding: 20rpx;
				padding-left: 6%;
				padding-right: 35rpx;
				display: flex;

				.venue-icon {
					width: 13%
				}

				.venue-name {
					display: flex;
					align-items: center;
					padding-left: 20rpx;
				}
			}

			.thin-line {
				width: 94%;
				height: 0.5px;
				margin: auto;
				background-color: #e6e6e6;
			}

			.venue-address {
				margin-left: 5%;
				margin-right: 1.8%;
				padding-top: 20rpx;

				color: #5b5b5b;
				font-size: 84%
			}
		}

		.click-class {
			background: #efefef;
		}
	}
</style>