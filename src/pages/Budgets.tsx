
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BudgetCard } from "@/components/BudgetCard";
import { useExpenseStore } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Budget } from "@/lib/types";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Budgets = () => {
  const { budgets, categories, addBudget } = useExpenseStore();
  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState<Omit<Budget, "id">>({
    name: "",
    amount: 0,
    current: 0,
    period: "monthly",
    category: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBudget.name || newBudget.amount <= 0) {
      toast.error("Please fill in all required fields with valid values");
      return;
    }

    addBudget(newBudget);
    setNewBudget({
      name: "",
      amount: 0,
      current: 0,
      period: "monthly",
      category: undefined
    });
    setOpen(false);
    toast.success("Budget added successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-container">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Budgets</h1>
              <p className="text-muted-foreground mt-1">Set and track your spending limits</p>
            </div>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-sm transition-all duration-300 hover:shadow-md">
                  <Plus className="mr-2 h-4 w-4" /> Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Add New Budget</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name*
                    </Label>
                    <Input
                      id="name"
                      value={newBudget.name}
                      onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                      className="col-span-3"
                      placeholder="Monthly Expenses"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount*
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newBudget.amount}
                      onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) || 0 })}
                      className="col-span-3"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current" className="text-right">
                      Current
                    </Label>
                    <Input
                      id="current"
                      type="number"
                      value={newBudget.current}
                      onChange={(e) => setNewBudget({ ...newBudget, current: parseFloat(e.target.value) || 0 })}
                      className="col-span-3"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="period" className="text-right">
                      Period*
                    </Label>
                    <Select
                      value={newBudget.period}
                      onValueChange={(value: "daily" | "weekly" | "monthly" | "yearly") => 
                        setNewBudget({ ...newBudget, period: value })}
                      required
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={newBudget.category}
                      onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={undefined}>All categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Budget</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No budgets created yet. Click 'Add Budget' to get started.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budgets;
