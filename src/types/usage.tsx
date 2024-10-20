
export type UsageEntry = {
  message_id: number;
  timestamp: string;
  report_name?: string;
  credits_used: number;
};

export type UsageData = {
  usage: UsageEntry[];
};