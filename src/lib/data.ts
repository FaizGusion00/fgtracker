import { Expense, Category, Budget, MonthlyTotal, CategoryTotal } from "./types";
import { 
  CreditCard, ShoppingCart, Home, Car, Utensils, 
  Plane, GraduationCap, Coffee, Gift, Droplet, 
  Banknote, Zap, Wifi, Smartphone, HeartPulse 
} from "lucide-react";
import { useExpenseStore } from "./store";

// Generate a unique ID 
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Defined currencies
export const currencies: { [key: string]: { symbol: string, name: string } } = {
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit' },
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' }
};

// Format currency based on selected currency
export const formatCurrency = (amount: number): string => {
  const { settings } = useExpenseStore.getState();
  const currency = currencies[settings.currency] || currencies.MYR;
  
  return `${currency.symbol}${amount.toFixed(2)}`;
};

// Format date
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get month name from date
export const getMonthName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short' });
};

// Sample Categories
export const defaultCategories: Category[] = [
  { id: "cat1", name: "Food & Dining", color: "#FF6B6B", icon: "Utensils", budget: 500 },
  { id: "cat2", name: "Shopping", color: "#4CAF50", icon: "ShoppingCart", budget: 300 },
  { id: "cat3", name: "Housing", color: "#2196F3", icon: "Home", budget: 1200 },
  { id: "cat4", name: "Transportation", color: "#FF9800", icon: "Car", budget: 400 },
  { id: "cat5", name: "Entertainment", color: "#9C27B0", icon: "CreditCard", budget: 200 },
  { id: "cat6", name: "Travel", color: "#00BCD4", icon: "Plane", budget: 500 },
  { id: "cat7", name: "Education", color: "#607D8B", icon: "GraduationCap", budget: 300 },
  { id: "cat8", name: "Coffee", color: "#795548", icon: "Coffee", budget: 100 },
  { id: "cat9", name: "Gifts", color: "#E91E63", icon: "Gift", budget: 150 },
  { id: "cat10", name: "Utilities", color: "#3F51B5", icon: "Zap", budget: 250 }
];

// Map category icon strings to actual components
export const getCategoryIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    "CreditCard": CreditCard,
    "ShoppingCart": ShoppingCart,
    "Home": Home,
    "Car": Car,
    "Utensils": Utensils,
    "Plane": Plane,
    "GraduationCap": GraduationCap,
    "Coffee": Coffee,
    "Gift": Gift,
    "Droplet": Droplet,
    "Banknote": Banknote,
    "Zap": Zap,
    "Wifi": Wifi,
    "Smartphone": Smartphone,
    "HeartPulse": HeartPulse
  };
  
  return icons[iconName] || CreditCard;
};

// Sample Expenses
export const sampleExpenses: Expense[] = [
  { id: "exp1", amount: 45.99, description: "Grocery shopping", category: "cat1", date: "2023-05-01" },
  { id: "exp2", amount: 120.50, description: "New shoes", category: "cat2", date: "2023-05-03" },
  { id: "exp3", amount: 1200, description: "Rent payment", category: "cat3", date: "2023-05-01", isRecurring: true },
  { id: "exp4", amount: 35.40, description: "Gas", category: "cat4", date: "2023-05-04" },
  { id: "exp5", amount: 86.23, description: "Restaurant dinner", category: "cat1", date: "2023-05-06" },
  { id: "exp6", amount: 15.99, description: "Movie tickets", category: "cat5", date: "2023-05-07" },
  { id: "exp7", amount: 550, description: "Flight tickets", category: "cat6", date: "2023-05-10" },
  { id: "exp8", amount: 42.30, description: "Coffee shop", category: "cat8", date: "2023-05-12" },
  { id: "exp9", amount: 125.45, description: "Textbooks", category: "cat7", date: "2023-05-15" },
  { id: "exp10", amount: 75, description: "Birthday gift", category: "cat9", date: "2023-05-18" },
  { id: "exp11", amount: 32.99, description: "Lunch", category: "cat1", date: "2023-05-20" },
  { id: "exp12", amount: 230, description: "Electricity bill", category: "cat10", date: "2023-05-22", isRecurring: true },
  { id: "exp13", amount: 22.50, description: "Taxi fare", category: "cat4", date: "2023-05-25" },
  { id: "exp14", amount: 65.75, description: "Online shopping", category: "cat2", date: "2023-05-27" },
  { id: "exp15", amount: 18.99, description: "Coffee and cake", category: "cat8", date: "2023-05-29" }
];

// Sample Budgets
export const sampleBudgets: Budget[] = [
  { id: "budget1", name: "Monthly Spending", amount: 3000, current: 2754.09, period: "monthly" },
  { id: "budget2", name: "Food", amount: 500, current: 165.21, period: "monthly", category: "cat1" },
  { id: "budget3", name: "Shopping", amount: 300, current: 186.25, period: "monthly", category: "cat2" },
  { id: "budget4", name: "Transportation", amount: 400, current: 57.90, period: "monthly", category: "cat4" }
];

// Get expenses by category
export const getExpensesByCategory = (expenses: Expense[], categories: Category[]): CategoryTotal[] => {
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  const categoryTotals: Record<string, { total: number, name: string, color: string }> = {};
  
  expenses.forEach(expense => {
    const category = categories.find(cat => cat.id === expense.category);
    if (!category) return;
    
    if (!categoryTotals[category.id]) {
      categoryTotals[category.id] = { total: 0, name: category.name, color: category.color };
    }
    
    categoryTotals[category.id].total += expense.amount;
  });
  
  return Object.entries(categoryTotals).map(([categoryId, data]) => ({
    categoryId,
    categoryName: data.name,
    total: data.total,
    percentage: totalAmount > 0 ? (data.total / totalAmount) * 100 : 0,
    color: data.color
  })).sort((a, b) => b.total - a.total);
};

// Get monthly totals
export const getMonthlyTotals = (expenses: Expense[]): MonthlyTotal[] => {
  const monthlyTotals: Record<string, number> = {};
  
  expenses.forEach(expense => {
    const month = getMonthName(expense.date);
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += expense.amount;
  });
  
  return Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total
  }));
};

// Get total expenses
export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
};

// Get category budget progress
export const getCategoryBudgetProgress = (
  categoryId: string, 
  expenses: Expense[], 
  categories: Category[]
): { spent: number, budget: number, percentage: number } => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return { spent: 0, budget: 0, percentage: 0 };
  
  const spent = expenses
    .filter(exp => exp.category === categoryId)
    .reduce((acc, exp) => acc + exp.amount, 0);
  
  return {
    spent,
    budget: category.budget,
    percentage: category.budget > 0 ? (spent / category.budget) * 100 : 0
  };
};
