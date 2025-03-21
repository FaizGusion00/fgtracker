
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/lib/types";
import { Plus, CreditCard, ShoppingCart, Home, Car, Utensils, Plane, GraduationCap, Coffee, Gift, Droplet, Banknote, Zap, Wifi, Smartphone, HeartPulse } from "lucide-react";
import { toast } from "sonner";

const CATEGORY_ICONS = [
  { name: "CreditCard", component: <CreditCard className="h-4 w-4" /> },
  { name: "ShoppingCart", component: <ShoppingCart className="h-4 w-4" /> },
  { name: "Home", component: <Home className="h-4 w-4" /> },
  { name: "Car", component: <Car className="h-4 w-4" /> },
  { name: "Utensils", component: <Utensils className="h-4 w-4" /> },
  { name: "Plane", component: <Plane className="h-4 w-4" /> },
  { name: "GraduationCap", component: <GraduationCap className="h-4 w-4" /> },
  { name: "Coffee", component: <Coffee className="h-4 w-4" /> },
  { name: "Gift", component: <Gift className="h-4 w-4" /> },
  { name: "Droplet", component: <Droplet className="h-4 w-4" /> },
  { name: "Banknote", component: <Banknote className="h-4 w-4" /> },
  { name: "Zap", component: <Zap className="h-4 w-4" /> },
  { name: "Wifi", component: <Wifi className="h-4 w-4" /> },
  { name: "Smartphone", component: <Smartphone className="h-4 w-4" /> },
  { name: "HeartPulse", component: <HeartPulse className="h-4 w-4" /> },
];

const COLORS = [
  "#FF6B6B", "#4CAF50", "#2196F3", "#FF9800", "#9C27B0", 
  "#00BCD4", "#607D8B", "#795548", "#E91E63", "#3F51B5"
];

const Categories = () => {
  const { categories, addCategory } = useExpenseStore();
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    color: COLORS[0],
    icon: "CreditCard",
    budget: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name || !newCategory.color || !newCategory.icon) {
      toast.error("Please fill in all required fields");
      return;
    }

    addCategory(newCategory);
    setNewCategory({
      name: "",
      color: COLORS[0],
      icon: "CreditCard",
      budget: 0
    });
    setOpen(false);
    toast.success("Category added successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-container">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
              <p className="text-muted-foreground mt-1">Manage your expense categories</p>
            </div>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-sm transition-all duration-300 hover:shadow-md">
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name*
                    </Label>
                    <Input
                      id="name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="col-span-3"
                      placeholder="Food & Dining"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="icon" className="text-right">
                      Icon*
                    </Label>
                    <Select
                      value={newCategory.icon}
                      onValueChange={(value) => setNewCategory({ ...newCategory, icon: value })}
                      required
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_ICONS.map((icon) => (
                          <SelectItem key={icon.name} value={icon.name}>
                            <div className="flex items-center">
                              {icon.component}
                              <span className="ml-2">{icon.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="color" className="text-right">
                      Color*
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className="w-6 h-6 rounded-full border border-gray-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          style={{ backgroundColor: color }}
                          onClick={() => setNewCategory({ ...newCategory, color })}
                          aria-selected={newCategory.color === color}
                        >
                          {newCategory.color === color && (
                            <span className="flex h-full w-full items-center justify-center">
                              <span className="sr-only">Selected</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newCategory.budget}
                      onChange={(e) => setNewCategory({ ...newCategory, budget: parseFloat(e.target.value) || 0 })}
                      className="col-span-3"
                      placeholder="0.00"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Category</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <CategoryGrid />
        </div>
      </main>
    </div>
  );
};

export default Categories;
