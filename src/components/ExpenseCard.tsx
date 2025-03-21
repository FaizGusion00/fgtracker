
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category, Expense } from "@/lib/types";
import { formatCurrency, formatDate, getCategoryIcon } from "@/lib/data";
import { useExpenseStore } from "@/lib/store";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ExpenseCardProps {
  expense: Expense;
  category: Category;
}

export function ExpenseCard({ expense, category }: ExpenseCardProps) {
  const { updateExpense, deleteExpense } = useExpenseStore();
  const { categories } = useExpenseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState<Expense>({ ...expense });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const CategoryIcon = getCategoryIcon(category.icon);

  const handleDelete = () => {
    deleteExpense(expense.id);
    setConfirmDelete(false);
    toast.success("Expense deleted successfully");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateExpense(expense.id, editedExpense);
    setIsEditing(false);
    toast.success("Expense updated successfully");
  };

  return (
    <>
      <Card className="expense-item overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-start justify-between p-4">
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 p-2 rounded-full mr-3"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <CategoryIcon
                  size={20}
                  style={{ color: category.color }}
                />
              </div>
              <div>
                <h3 className="font-medium">{expense.description}</h3>
                <div className="text-sm text-muted-foreground">
                  {formatDate(expense.date)} · {category.name}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">
                {formatCurrency(expense.amount)}
              </span>
              <div className="mt-1 flex space-x-1">
                <Button variant="ghost" size="icon" onClick={handleEdit} className="h-6 w-6">
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setConfirmDelete(true)} className="h-6 w-6 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={editedExpense.amount}
                onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editedExpense.description}
                onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={editedExpense.category}
                onValueChange={(value) => setEditedExpense({ ...editedExpense, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={editedExpense.date}
                onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this expense?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
