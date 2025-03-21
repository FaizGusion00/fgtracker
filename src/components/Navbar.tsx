
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  PieChart, 
  ListPlus, 
  Target, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: <ListPlus className="w-5 h-5" />,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <PieChart className="w-5 h-5" />,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: <Target className="w-5 h-5" />,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            FGExpense
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in md:hidden">
          <div className="container p-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                  FGExpense
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={toggleMobileMenu}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
