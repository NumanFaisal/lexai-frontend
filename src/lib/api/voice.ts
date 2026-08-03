import api from '../axios';
import { VoiceTranscription } from '../types';

export interface VoiceTranscriptionsResponse {
  success: boolean;
  data: VoiceTranscription[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getVoiceTranscriptions = async (
  page: number = 1,
  limit: number = 10
): Promise<VoiceTranscriptionsResponse> => {
  const response = await api.get('/voice/transcriptions', {
    params: { page, limit },
  });

  return {
    success: response.data?.success ?? true,
    data: response.data?.transcriptions || response.data?.data || [],
    pagination: response.data?.pagination,
  };
};

export const uploadVoiceAudio = async (
  audioBlob: Blob
): Promise<{ success: boolean; data?: { transcript?: string; text?: string } }> => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'voice-input.webm');

  const response = await api.post('/chat/voice-input', formData);

  return response.data;
};
