import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage, ChatMode, Conversation } from '@/lib/types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  activeMode: ChatMode;
  isStreaming: boolean;
  inputValue: string;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: [],
  activeMode: 'research',
  isStreaming: false,
  inputValue: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
    setActiveConversation(state, action: PayloadAction<string | null>) {
      state.activeConversationId = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action: PayloadAction<{ id: string; updates: Partial<ChatMessage> }>) {
      const idx = state.messages.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) {
        state.messages[idx] = { ...state.messages[idx], ...action.payload.updates };
      }
    },
    appendToMessage(state, action: PayloadAction<{ id: string; content: string }>) {
      const idx = state.messages.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) {
        state.messages[idx].content += action.payload.content;
      }
    },
    setActiveMode(state, action: PayloadAction<ChatMode>) {
      state.activeMode = action.payload;
    },
    setIsStreaming(state, action: PayloadAction<boolean>) {
      state.isStreaming = action.payload;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    clearChat(state) {
      state.activeConversationId = null;
      state.messages = [];
      state.inputValue = '';
    },
    addConversation(state, action: PayloadAction<Conversation>) {
      state.conversations.unshift(action.payload);
    },
    updateConversationId(
      state,
      action: PayloadAction<{ oldId: string; newId: string }>
    ) {
      const { oldId, newId } = action.payload;
      if (state.activeConversationId === oldId) {
        state.activeConversationId = newId;
      }
      state.messages = state.messages.map((m) =>
        m.conversationId === oldId ? { ...m, conversationId: newId } : m
      );
      state.conversations = state.conversations.map((c) =>
        c.id === oldId ? { ...c, id: newId } : c
      );
    },
    updateConversationTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const { id, title } = action.payload;
      const idx = state.conversations.findIndex((c) => c.id === id);
      if (idx !== -1) {
        state.conversations[idx].title = title;
      }
    },
    removeConversation(state, action: PayloadAction<string>) {
      state.conversations = state.conversations.filter((c) => c.id !== action.payload);
      if (state.activeConversationId === action.payload) {
        state.activeConversationId = null;
        state.messages = [];
      }
    },
  },
});

export const {
  setConversations,
  setActiveConversation,
  setMessages,
  addMessage,
  updateMessage,
  appendToMessage,
  setActiveMode,
  setIsStreaming,
  setInputValue,
  clearChat,
  addConversation,
  updateConversationId,
  updateConversationTitle,
  removeConversation,
} = chatSlice.actions;

export default chatSlice.reducer;

