
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseCard } from "./ExpenseCard";
import { useExpenseStore } from "@/lib/store";
import { ScrollArea } from "./ui/scroll-area";

export function RecentExpenses() {
  const { expenses, categories } = useExpenseStore();
  
  // Sort expenses by date (newest first) and take the last 5
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-1 md:col-span-2 overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 pb-4">
          <div className="space-y-3">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => {
                const category = categories.find(c => c.id === expense.category);
                if (!category) return null;
                
                return (
                  <ExpenseCard 
                    key={expense.id} 
                    expense={expense} 
                    category={category} 
                  />
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No expenses recorded yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
