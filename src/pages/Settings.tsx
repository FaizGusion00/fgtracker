
import { useEffect } from "react";
import { useExpenseStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import { currencies } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  const { settings, updateSettings } = useExpenseStore();
  const { theme, setTheme } = useTheme();

  const handleCurrencyChange = (value: string) => {
    updateSettings({ currency: value });
    toast.success(`Currency changed to ${currencies[value].name}`);
  };

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  // Apply theme on initial load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-container">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">Customize your experience</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how FGExpense Tracker looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="theme">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <Switch 
                    id="theme" 
                    checked={theme === "dark"}
                    onCheckedChange={handleThemeChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={settings.currency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currencies).map(([code, { name, symbol }]) => (
                        <SelectItem key={code} value={code}>
                          {symbol} - {name} ({code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currency used throughout the application
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
