'use client';

import { useEffect, useState } from 'react';
import {
  BookOpenCheck,
  Calendar,
  Home,
  Inbox,
  MapPin,
  Search,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const iconMap = {
  Home,
  Menu: BookOpenCheck,
  Location: MapPin,
  Search,
  Settings,
  Calendar,
  Inbox,
};

export function AppSidebar() {
  const [items, setItems] = useState([
    { title: 'Home', url: '/', icon: 'Home', color: 'text-blue-600' },
    { title: 'Menu', url: '/menu', icon: 'Menu', color: 'text-green-600' },
    { title: 'Location', url: '#', icon: 'Location', color: 'text-yellow-600' },
  ]);

  const [isAdminEditing, setIsAdminEditing] = useState(false);

  // Detect localStorage-based edit mode
  useEffect(() => {
    const stored = localStorage.getItem('sidebarEditMode') === 'true';
    setIsAdminEditing(stored);

    const handler = () => {
      setIsAdminEditing(localStorage.getItem('sidebarEditMode') === 'true');
    };

    window.addEventListener('sidebarEditModeChanged', handler);

    return () => {
      window.removeEventListener('sidebarEditModeChanged', handler);
    };
  }, []);

  function addItem() {
    const newItem = {
      title: 'New Button',
      url: '#',
      icon: 'Search',
      color: 'text-gray-600',
    };
    setItems([...items, newItem]);
  }

  function updateItem(index: number, key: string, value: string) {
    const updated = [...items];
    // @ts-ignore
    updated[index][key] = value;
    setItems(updated);
  }

  function removeItem(index: number) {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  }

  return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap] || Home;

                  return (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <a
                              href={item.url}
                              className={`${item.color} flex items-center space-x-2`}
                          >
                            <Icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>

                        {/* Admin Edit Controls */}
                        {isAdminEditing && (
                            <div className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                              <input
                                  className="border px-1 w-full"
                                  value={item.title}
                                  onChange={(e) =>
                                      updateItem(index, 'title', e.target.value)
                                  }
                              />
                              <input
                                  className="border px-1 w-full"
                                  value={item.color}
                                  onChange={(e) =>
                                      updateItem(index, 'color', e.target.value)
                                  }
                                  placeholder="e.g. text-red-500"
                              />
                              <button
                                  className="text-red-600 text-xs"
                                  onClick={() => removeItem(index)}
                              >
                                Delete
                              </button>
                            </div>
                        )}
                      </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              {isAdminEditing && (
                  <button
                      onClick={addItem}
                      className="mt-4 ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded"
                  >
                    Add Button
                  </button>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
