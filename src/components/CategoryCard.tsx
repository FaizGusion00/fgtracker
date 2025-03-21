
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExpenseStore } from "@/lib/store";
import { Category } from "@/lib/types";
import { formatCurrency, getCategoryBudgetProgress, getCategoryIcon } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { expenses } = useExpenseStore();
  const { spent, budget, percentage } = getCategoryBudgetProgress(
    category.id,
    expenses,
    [category]
  );
  
  const IconComponent = getCategoryIcon(category.icon);
  
  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 85) return "bg-orange-500";
    return "bg-primary";
  };

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="flex-shrink-0 p-2 rounded-full"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent
                size={16}
                style={{ color: category.color }}
              />
            </div>
            <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {formatCurrency(spent)} of {formatCurrency(budget)}
            </span>
            <span className={cn(
              "font-medium",
              percentage >= 100 ? "text-destructive" : ""
            )}>
              {percentage.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={Math.min(percentage, 100)}
            className={cn("h-2", getProgressColor())}
          />
        </div>
      </CardContent>
    </Card>
  );
}
