import { BookOpenCheck, Calendar, Home, Inbox, MapPin, Search, Settings, UserCircle, ReceiptText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Menu",
    url: "/menu",
    icon: BookOpenCheck,
  },
  {
    title: "Location",
    url: "#",
    icon: MapPin,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Account",
    icon: UserCircle,
    subItems: [
      {
        title: "Account Information",
        url: "/account"
      },
      {
        title: "Payment",
        url: "/account/payment"
      },
    ],
  },  
  {
    title: "Orders",
    url: "/orders",
    icon: ReceiptText,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => item.subItems ? (
                <SidebarMenuItem key={item.title}>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6">
                      {item.subItems.map((sub) => (
                        <SidebarMenuButton key={`${item.title}-${sub.title}`} asChild>
                          <a href={sub.url}>
                            <span>{sub.title}</span>
                          </a>
                        </SidebarMenuButton>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>  
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}