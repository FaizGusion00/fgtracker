
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetCard } from "./BudgetCard";
import { useExpenseStore } from "@/lib/store";
import { ScrollArea } from "./ui/scroll-area";

export function BudgetOverview() {
  const { budgets } = useExpenseStore();

  return (
    <Card className="col-span-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 pb-4">
          <div className="space-y-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No budgets created yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
