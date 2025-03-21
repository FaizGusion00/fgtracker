
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from "recharts";
import { useExpenseStore } from "@/lib/store";
import { getExpensesByCategory, getMonthlyTotals, formatCurrency } from "@/lib/data";
import { CategoryTotal, MonthlyTotal } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
}: { 
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: 500 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm text-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function ExpenseChart() {
  const { expenses, categories } = useExpenseStore();
  const isMobile = useIsMobile();
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotal[]>([]);

  useEffect(() => {
    if (expenses.length && categories.length) {
      setCategoryTotals(getExpensesByCategory(expenses, categories));
      setMonthlyTotals(getMonthlyTotals(expenses));
    }
  }, [expenses, categories]);

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden">
      <CardHeader>
        <CardTitle>Expense Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="by-category" className="space-y-4">
          <TabsList>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
            <TabsTrigger value="by-month">By Month</TabsTrigger>
          </TabsList>
          <TabsContent value="by-category" className="animate-fade-in">
            {categoryTotals.length > 0 ? (
              <div className="aspect-square w-full max-w-md mx-auto md:max-w-none md:aspect-[2/1] h-80 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryTotals}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={isMobile ? undefined : renderCustomizedLabel}
                      outerRadius={isMobile ? 80 : 120}
                      fill="#8884d8"
                      dataKey="total"
                      nameKey="categoryName"
                      animationDuration={500}
                    >
                      {categoryTotals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={<CustomTooltip />}
                      formatter={(value: number) => [formatCurrency(value)]}
                    />
                    <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 text-muted-foreground">
                No expense data available
              </div>
            )}
          </TabsContent>
          <TabsContent value="by-month" className="animate-fade-in">
            {monthlyTotals.length > 0 ? (
              <div className="w-full aspect-[3/2] h-80 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyTotals}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barCategoryGap={isMobile ? 5 : 20}
                  >
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => 
                        `$${value.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}`
                      } 
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Total"]}
                    />
                    <Bar 
                      dataKey="total" 
                      name="Monthly Expense"
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 text-muted-foreground">
                No monthly data available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
