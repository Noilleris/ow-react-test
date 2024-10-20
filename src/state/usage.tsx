import { useState, useEffect } from 'react';
import axios from 'axios';

type UsageEntry = {
  message_id: number;
  timestamp: string;
  report_name?: string;
  credits_used: number;
};

type UsageData = {
  usage: UsageEntry[];
};

const useFetchData = (url: string) => {
  const [data, setData] = useState<UsageEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UsageData>(url);
        if (response.data && response.data.usage) {
          setData(response.data.usage);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;