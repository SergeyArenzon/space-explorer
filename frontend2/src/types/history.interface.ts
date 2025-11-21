export interface HistoryResult {
  source_id: number;
  confidence: number;
}

export interface HistoryItem {
  id: string;
  query: string;
  results: HistoryResult[];
  created_at: string;
}

