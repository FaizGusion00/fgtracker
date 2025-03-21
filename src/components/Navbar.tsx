import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { AddExpenseForm } from "./AddExpenseForm";
import { Link } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu"; 

export default function Navbar() {
  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-semibold text-2xl">
            FGExpense
          </Link>
          <div className="flex items-center space-x-4">
            <AddExpenseForm />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
