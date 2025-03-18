import { useState, useEffect } from "react";
import { Sun, Moon, Bell, Menu, User } from "lucide-react";
import Dashboard from "./Dashboard";

function Button({ className, variant = "default", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-all ${
        variant === "ghost"
          ? "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{children[0]}</div>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md right-0">
          {children.slice(1)}
        </div>
      )}
    </div>
  );
}

function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme change
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div
        className={`h-screen m-0 bg-gray-200 dark:bg-red-800 p-4 shadow-lg transition-all ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden left-1"
        }`}
      >
        {isSidebarOpen  (
          <>
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
              className="mb-4 "
            >
              Close
            </Button>
            <p className="text-lg font-semibold">Sidebar Content</p>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md w-full">
          {/* Sidebar Toggle */}
          <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
          </Button>

          {/* Right-side icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </Button>

            {/* Notification */}
            <Button variant="ghost">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <Button variant="ghost" className="p-0">
                <User className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600" />
              </Button>
              <DropdownMenuItem onClick={() => alert("Go to Dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Edit Profile")}>
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Logged Out")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 p-6 bg-white dark:bg-gray-900 transition-colors">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
