
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/lib/types";
import { formatCurrency } from "@/lib/data";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const percentage = (budget.current / budget.amount) * 100;
  const remaining = budget.amount - budget.current;
  
  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 85) return "bg-orange-500";
    return "";
  };

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{budget.name}</CardTitle>
          <span className="text-xs text-muted-foreground capitalize">{budget.period}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-semibold">{formatCurrency(budget.current)}</span>
            <span className="text-muted-foreground text-sm">of {formatCurrency(budget.amount)}</span>
          </div>
          <Progress
            value={Math.min(percentage, 100)}
            className="h-2"
            indicatorClassName={getProgressColor()}
          />
          <div className="flex justify-between items-center text-sm">
            <span className={cn(
              remaining < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {remaining < 0 ? "Over by " : "Left: "} 
              {formatCurrency(Math.abs(remaining))}
            </span>
            <span className={cn(
              "font-medium",
              percentage >= 100 ? "text-destructive" : ""
            )}>
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
