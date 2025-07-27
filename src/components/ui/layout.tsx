import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Plus, Search } from "lucide-react";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showBreadcrumbs?: boolean;
  className?: string;
}

export function Layout({ 
  children, 
  title, 
  showBackButton = true, 
  showBreadcrumbs = true,
  className = ""
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Główna', path: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = getSegmentName(segment);
      breadcrumbs.push({ name, path: currentPath });
    });
    
    return breadcrumbs;
  };

  const getSegmentName = (segment: string) => {
    const names: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'calendar': 'Kalendarz',
      'settings': 'Ustawienia',
      'spaces': 'Przestrzenie',
      'friends': 'Znajomi',
      'university': 'Uczelnia',
      'work': 'Praca',
      'ambitions': 'Ambicje',
      'health': 'Zdrowie & Sport',
      'finances': 'Finanse',
      'travel': 'Podróże',
      'moodboard': 'Moodboard',
      'notes': 'Notatki'
    };
    return names[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && location.pathname !== '/' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            {showBreadcrumbs && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.path}>
                      {index < breadcrumbs.length - 1 ? (
                        <>
                          <BreadcrumbLink 
                            onClick={() => navigate(crumb.path)}
                            className="cursor-pointer"
                          >
                            {crumb.name}
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      ) : (
                        <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            
            {title && (
              <h1 className="text-xl font-helvetica font-medium text-gianni-text-primary">
                {title}
              </h1>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}