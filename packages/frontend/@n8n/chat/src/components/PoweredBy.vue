<script setup lang="ts">
import { useOptions } from '@n8n/chat/composables';
const { options } = useOptions();
</script>

<template>
	<div class="chat-powered-by">
		{{ options.poweredByText }}
	</div>
</template>

<style lang="scss">
.chat-powered-by {
	text-align: center;

	a {
		color: var(--chat--color-primary);
		text-decoration: none;
	}
}
</style>
