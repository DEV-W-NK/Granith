import { 
  LayoutDashboard, 
  Building, 
  Users, 
  Package, 
  ShoppingCart, 
  Calculator,
  UserCheck,
  BarChart3,
  Settings,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/"
  },
  {
    title: "Obras & WBS",
    icon: Building,
    href: "/obras"
  },
  {
    title: "Workforce",
    icon: Users,
    href: "/workforce",
    badge: "Geofence"
  },
  {
    title: "Materiais",
    icon: Package,
    href: "/materiais"
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    href: "/compras"
  },
  {
    title: "Contabilidade",
    icon: Calculator,
    href: "/contabilidade"
  },
  {
    title: "Fornecedores",
    icon: UserCheck,
    href: "/fornecedores"
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    href: "/relatorios"
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "bg-primary text-primary-foreground shadow-sm"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Button variant="ghost" className="w-full justify-start gap-3 h-11">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Configurações</span>
        </Button>
      </div>
    </div>
  );
}