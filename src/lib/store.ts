
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Expense, Category, Budget, Settings } from './types';
import { generateId, defaultCategories, sampleExpenses, sampleBudgets } from './data';

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  settings: Settings;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  resetToSampleData: () => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: sampleExpenses,
      categories: defaultCategories,
      budgets: sampleBudgets,
      settings: {
        currency: 'MYR',
        theme: 'light',
        language: 'en'
      },

      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { id: generateId(), ...expense }]
      })),

      updateExpense: (id, updatedExpense) => set((state) => ({
        expenses: state.expenses.map((expense) => 
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      })),

      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id)
      })),

      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { id: generateId(), ...category }]
      })),

      updateCategory: (id, updatedCategory) => set((state) => ({
        categories: state.categories.map((category) => 
          category.id === id ? { ...category, ...updatedCategory } : category
        )
      })),

      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((category) => category.id !== id)
      })),

      addBudget: (budget) => set((state) => ({
        budgets: [...state.budgets, { id: generateId(), ...budget }]
      })),

      updateBudget: (id, updatedBudget) => set((state) => ({
        budgets: state.budgets.map((budget) => 
          budget.id === id ? { ...budget, ...updatedBudget } : budget
        )
      })),

      deleteBudget: (id) => set((state) => ({
        budgets: state.budgets.filter((budget) => budget.id !== id)
      })),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      resetToSampleData: () => set({
        expenses: sampleExpenses,
        categories: defaultCategories,
        budgets: sampleBudgets
      })
    }),
    {
      name: 'expense-store'
    }
  )
);
