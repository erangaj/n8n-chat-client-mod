<script setup lang="ts">
import Close from 'virtual:icons/mdi/close';
import Reload from 'virtual:icons/mdi/reload';
import { computed, nextTick, onMounted } from 'vue';

import GetStarted from '@n8n/chat/components/GetStarted.vue';
import GetStartedFooter from '@n8n/chat/components/GetStartedFooter.vue';
import Input from '@n8n/chat/components/Input.vue';
import Layout from '@n8n/chat/components/Layout.vue';
import MessagesList from '@n8n/chat/components/MessagesList.vue';
import { useI18n, useChat, useOptions } from '@n8n/chat/composables';
import { chatEventBus } from '@n8n/chat/event-buses';

const { t } = useI18n();
const chatStore = useChat();

const { messages, currentSessionId } = chatStore;
const { options } = useOptions();

const showCloseButton = computed(() => options.mode === 'window' && options.showWindowCloseButton);
const showRestartChatButton = computed(
	() => options.mode === 'window' && options.showRestartChatButton && !!currentSessionId.value,
);

async function getStarted() {
	if (!chatStore.startNewSession) {
		return;
	}
	void chatStore.startNewSession();
	void nextTick(() => {
		chatEventBus.emit('scrollToBottom');
	});
}

async function initialize() {
	if (!chatStore.loadPreviousSession) {
		return;
	}
	await chatStore.loadPreviousSession();
	void nextTick(() => {
		chatEventBus.emit('scrollToBottom');
	});
}

function closeChat() {
	chatEventBus.emit('close');
}

async function restartChat() {
	messages.value = [];
	currentSessionId.value = null;
	await getStarted();
}

onMounted(async () => {
	await initialize();
	if (!options.showWelcomeScreen && !currentSessionId.value) {
		await getStarted();
	}
});
</script>

<template>
	<Layout class="chat-wrapper">
		<template #header>
			<div class="chat-heading">
				<img
					v-if="options.botAvatarUrl"
					style="width: 40px; height: 40px"
					alt="Bot avatar"
					:src="options.botAvatarUrl"
				/>
				<h1>
					{{ t('title') }}
				</h1>
				<div style="display: flex; flex-direction: row">
					<button
						v-if="showRestartChatButton"
						class="chat-restart-button"
						:title="t('restartButtonTooltip')"
						@click="restartChat"
					>
						<Reload height="18" width="18" />
					</button>
					<button
						v-if="showCloseButton"
						class="chat-close-button"
						:title="t('closeButtonTooltip')"
						@click="closeChat"
					>
						<Close height="18" width="18" />
					</button>
				</div>
			</div>
			<p v-if="t('subtitle')">{{ t('subtitle') }}</p>
		</template>
		<GetStarted v-if="!currentSessionId && options.showWelcomeScreen" @click:button="getStarted" />
		<MessagesList v-else :messages="messages" />
		<template #footer>
			<Input v-if="currentSessionId" />
			<GetStartedFooter v-else />
		</template>
	</Layout>
</template>

<style lang="scss">
.chat-heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.chat-close-button {
	display: flex;
	border: none;
	padding: 8px !important;
	background: none;
	cursor: pointer;
	color: var(--chat--close--button--color, var(--chat--color-primary));

	&:hover {
		color: var(--chat--close--button--color-hover, var(--chat--color-primary));
	}
}

.chat-restart-button {
	display: flex;
	border: none;
	padding: 8px !important;
	background: none;
	cursor: pointer;
	color: var(--chat--restart--button--color, var(--chat--color-primary));

	&:hover {
		color: var(--chat--restart--button--color-hover, var(--chat--color-primary));
	}
}

.n8n-chat button {
	padding: 8px 16px;
	color: var(--chat--color-white) !important;
	background-color: var(--chat--color-primary) !important;
	border-radius: 8px 8px 8px 8px;
}
</style>
