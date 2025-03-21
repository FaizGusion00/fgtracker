
import { useExpenseStore } from "@/lib/store";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  const { categories } = useExpenseStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
