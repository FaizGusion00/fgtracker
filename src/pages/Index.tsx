
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";
import { useExpenseStore } from "@/lib/store";
import { formatCurrency, getTotalExpenses } from "@/lib/data";
import { StatCard } from "@/components/StatCard";
import { ExpenseChart } from "@/components/ExpenseChart";
import { RecentExpenses } from "@/components/RecentExpenses";
import { BudgetOverview } from "@/components/BudgetOverview";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { expenses, budgets } = useExpenseStore();
  
  const totalExpenses = getTotalExpenses(expenses);
  
  // Calculate total budget
  const totalBudget = budgets.reduce((acc, budget) => {
    // Only include monthly budgets in the total
    if (budget.period === "monthly" && !budget.category) {
      return acc + budget.amount;
    }
    return acc;
  }, 0);
  
  const mainBudget = budgets.find(b => b.period === "monthly" && !b.category);
  const availableBudget = mainBudget ? mainBudget.amount - mainBudget.current : 0;
  
  // Calculate percentage of budget spent
  const percentageSpent = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  const isOverBudget = percentageSpent > 100;

  // Get month name for display
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-container">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track and manage your expenses</p>
            </div>
            <AddExpenseForm />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={`${currentMonth} Spending`}
              value={formatCurrency(totalExpenses)}
              description={isOverBudget ? "Over budget" : "of your monthly budget"}
              icon={<DollarSign className="h-4 w-4" />}
              trend={isOverBudget ? "up" : percentageSpent >= 75 ? "neutral" : "down"}
              trendValue={`${percentageSpent.toFixed(0)}%`}
            />
            <StatCard
              title="Available Budget"
              value={formatCurrency(availableBudget)}
              description="remaining this month"
              icon={<Wallet className="h-4 w-4" />}
              trend={availableBudget > 0 ? "up" : "down"}
              trendValue={availableBudget > 0 ? "On track" : "Budget exceeded"}
            />
            <StatCard
              title="Largest Expense"
              value={formatCurrency(expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0)}
              description="this month"
              icon={<ArrowUpRight className="h-4 w-4 text-expense" />}
            />
            <StatCard
              title="Smallest Expense"
              value={formatCurrency(expenses.length > 0 ? Math.min(...expenses.map(e => e.amount)) : 0)}
              description="this month"
              icon={<ArrowDownRight className="h-4 w-4 text-income" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <ExpenseChart />
            <RecentExpenses />
            <BudgetOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
