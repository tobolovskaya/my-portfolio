import { useTheme } from "./ThemeProvider";
import { Moon, Palette, Droplet, Monitor } from "lucide-react"; // додано Monitor
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "system", icon: <Monitor className="h-4 w-4" />, label: "System" },
    { name: "blue", icon: <Droplet className="h-4 w-4" />, label: "Light" },
    { name: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
    { name: "purple", icon: <Palette className="h-4 w-4" />, label: "Purple" },
  ];

  const renderActiveIcon = () => {
    switch (theme) {
      case "system":
        return <Monitor className="h-4 w-4" />;
      case "blue":
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "purple":
        return <Palette className="h-4 w-4" />;
      default:
        return <Droplet className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
            {renderActiveIcon()}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={theme === t.name ? "bg-accent" : ""}
          >
            <div className="flex items-center">
              {t.icon}
              <span className="ml-2">{t.label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
