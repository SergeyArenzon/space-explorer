export interface HistoryResult {
  source_id: number;
  confidence: number;
}

export interface HistoryItem {
  id: string;
  q: string;
  items: HistoryResult[];
  created_at: string;
  total: number;
}

