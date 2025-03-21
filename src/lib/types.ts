
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  isRecurring?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget: number;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  current: number;
  period: "daily" | "weekly" | "monthly" | "yearly";
  category?: string;
}

export interface MonthlyTotal {
  month: string;
  total: number;
}

export interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  total: number;
  percentage: number;
  color: string;
}
