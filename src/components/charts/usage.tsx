import React, {useMemo} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {parseISO, format} from 'date-fns';
import {UsageEntry} from "../../types/usage";
import "./usage.css";
import ChartPlaceholder from "../loading/chart";

interface UsageBarChartProps {
  data: UsageEntry[];
  isLoading: boolean;
}

const UsageBarChart: React.FC<UsageBarChartProps> = ({data, isLoading}) => {

  const groupedData = useMemo(() => {
    const grouped: { [key: string]: number } = {};

    data.forEach((entry) => {
      const date = format(parseISO(entry.timestamp), 'yyyy-MM-dd'); // Format timestamp by day
      if (!grouped[date]) {
        grouped[date] = 0;
      }
      grouped[date] += entry.credits_used;
    });

    return Object.keys(grouped).map((day) => ({
      day,
      totalCreditsUsed: grouped[day],
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="chart-container">
        <ChartPlaceholder />
      </div>
    )
  }

  return (
    <div className="chart-container" data-testid={"chart-container"}>
      { data.length > 0 ? <ResponsiveContainer width="100%" height={400}>
        <BarChart data={groupedData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="totalCreditsUsed" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>: <div>No data</div>}
    </div>
  );
};

export default UsageBarChart;