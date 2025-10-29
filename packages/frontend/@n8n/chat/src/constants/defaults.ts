import type { ChatOptions } from '@n8n/chat/types';

export const defaultOptions: ChatOptions = {
	webhookUrl: 'http://localhost:5678',
	webhookConfig: {
		method: 'POST',
		headers: {},
	},
	target: '#n8n-chat',
	mode: 'window',
	loadPreviousSession: true,
	chatInputKey: 'chatInput',
	chatSessionKey: 'sessionId',
	defaultLanguage: 'en',
	showWelcomeScreen: true,
	initialMessages: [
		'Hello!',
		'Please type in your question or select one of the following questions.',
	],
	i18n: {
		en: {
			title: 'Casey Tutors AI Chat',
			subtitle: '',
			footer: '',
			getStarted: 'New Conversation',
			inputPlaceholder: 'Type your question...',
			inputPlaceholderWithBubbles: 'Type your question or pick one from below...',
			closeButtonTooltip: 'Close chat',
			restartButtonTooltip: 'Restart chat',
		},
	},
	theme: {},
	enableStreaming: false,
	showWindowCloseButton: true,
	showRestartChatButton: true,
	questionBubbles: ['Question 1?'],
	botAvatarUrl: '',
	termsUrl: '',
	poweredByText: '',
};

export const defaultMountingTarget = '#n8n-chat';
