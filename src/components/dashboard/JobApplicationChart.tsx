
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const mockData = [
  { date: "Jan", applications: 4 },
  { date: "Feb", applications: 7 },
  { date: "Mar", applications: 10 },
  { date: "Apr", applications: 8 },
  { date: "May", applications: 12 },
  { date: "Jun", applications: 15 },
  { date: "Jul", applications: 8 },
  { date: "Aug", applications: 5 },
  { date: "Sep", applications: 9 },
  { date: "Oct", applications: 14 },
  { date: "Nov", applications: 18 },
  { date: "Dec", applications: 7 },
];

const JobApplicationChart = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Applications Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationChart;
