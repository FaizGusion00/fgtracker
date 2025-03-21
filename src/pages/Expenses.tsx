
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ExpenseCard } from "@/components/ExpenseCard";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { useExpenseStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { formatCurrency } from "@/lib/data";

const Expenses = () => {
  const { expenses, categories } = useExpenseStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("date-desc");

  // Filter expenses based on search term and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort expenses based on selected sort order
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortOrder) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Group expenses by month
  const expensesByMonth: Record<string, typeof expenses> = {};
  
  sortedExpenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!expensesByMonth[monthYear]) {
      expensesByMonth[monthYear] = [];
    }
    
    expensesByMonth[monthYear].push(expense);
  });

  const totalFilteredAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-container">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Expenses</h1>
              <p className="text-muted-foreground mt-1">
                {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} totaling {formatCurrency(totalFilteredAmount)}
              </p>
            </div>
            <AddExpenseForm />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search expenses..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="amount-desc">Highest Amount</SelectItem>
                <SelectItem value="amount-asc">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4 animate-fade-in">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-3 pr-4">
                  {sortedExpenses.length > 0 ? (
                    sortedExpenses.map(expense => {
                      const category = categories.find(c => c.id === expense.category);
                      return category ? (
                        <ExpenseCard 
                          key={expense.id} 
                          expense={expense} 
                          category={category} 
                        />
                      ) : null;
                    })
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No expenses found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-6 animate-fade-in">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-6 pr-4">
                  {Object.entries(expensesByMonth).length > 0 ? (
                    Object.entries(expensesByMonth).map(([monthYear, monthExpenses]) => {
                      const monthTotal = monthExpenses.reduce((total, exp) => total + exp.amount, 0);
                      
                      return (
                        <div key={monthYear} className="space-y-3">
                          <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 z-10">
                            <h3 className="text-lg font-medium">{monthYear}</h3>
                            <p className="text-sm text-muted-foreground">
                              Total: {formatCurrency(monthTotal)}
                            </p>
                          </div>
                          <div className="space-y-3">
                            {monthExpenses.map(expense => {
                              const category = categories.find(c => c.id === expense.category);
                              return category ? (
                                <ExpenseCard 
                                  key={expense.id} 
                                  expense={expense} 
                                  category={category} 
                                />
                              ) : null;
                            })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No expenses found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Expenses;
