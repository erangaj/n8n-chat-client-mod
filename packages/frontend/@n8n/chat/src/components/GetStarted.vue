<script setup lang="ts">
import Button from '@n8n/chat/components/Button.vue';
import { useI18n, useOptions } from '@n8n/chat/composables';
const { options } = useOptions();

const { t } = useI18n();
</script>
<template>
	<div
		style="
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
		"
	>
		<div class="chat-get-started">
			<div class="chat-get-disclaimer-title">Disclaimer</div>
			<div class="chat-get-disclaimer-text">
				By using this chatbot, you agree to the <br />
				<a :href="options.termsUrl">Terms & Conditions</a>
			</div>
			<Button @click="$emit('click:button')">
				{{ t('getStarted') }}
			</Button>
		</div>
	</div>
</template>

<style lang="scss">
.chat-get-started {
	padding-top: var(--chat--spacing);
	padding-bottom: var(--chat--spacing);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.chat-get-disclaimer-title {
	font-size: 24px;
	line-height: 32px;
}

.chat-get-disclaimer-text {
	font-size: 16px;
	line-height: 24px;
	width: 100%;
	text-align: center;
	margin: 10px 0 40px 0;
}
.chat-get-disclaimer-text a {
	color: #16bed7;
	font-weight: 500;
}
</style>
