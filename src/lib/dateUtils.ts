import { Conversation } from '@/lib/types';

export function groupConversationsByDate(conversations: Conversation[]): [string, Conversation[]][] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const sevenDaysAgo = today - 7 * 86400000;
  const thirtyDaysAgo = today - 30 * 86400000;

  const groups: Record<string, Conversation[]> = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    'Previous 30 Days': [],
    Older: [],
  };

  conversations.forEach((conv) => {
    const dateVal = conv.updatedAt || conv.createdAt;
    const time = dateVal ? new Date(dateVal).getTime() : 0;

    if (!time || isNaN(time)) {
      groups.Older.push(conv);
    } else if (time >= today) {
      groups.Today.push(conv);
    } else if (time >= yesterday) {
      groups.Yesterday.push(conv);
    } else if (time >= sevenDaysAgo) {
      groups['Previous 7 Days'].push(conv);
    } else if (time >= thirtyDaysAgo) {
      groups['Previous 30 Days'].push(conv);
    } else {
      groups.Older.push(conv);
    }
  });

  return Object.entries(groups).filter(([_, items]) => items.length > 0);
}
