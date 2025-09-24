import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Houses", path: "/houses" },
    { name: "Members", path: "/members" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Reports", path: "/reports" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-soft group-hover:shadow-hover transition-all duration-300">
              <Building2 className="w-8 h-8 text-charcoal" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-charcoal">
                Society Management
              </h1>
              <p className="text-sm text-muted-foreground">Premium Community</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-soft-gold text-charcoal shadow-soft"
                    : "text-muted-foreground hover:text-charcoal hover:bg-soft-gold/30"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Profile Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                  <Avatar className="h-12 w-12 shadow-soft">
                    <AvatarFallback className="bg-gradient-primary text-charcoal font-semibold">
                      PM
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-white/20">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-charcoal">Pramukh Admin</p>
                  <p className="text-xs text-muted-foreground">admin@society.com</p>
                </div>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-soft-gold text-charcoal shadow-soft"
                    : "text-muted-foreground hover:text-charcoal hover:bg-soft-gold/30"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;