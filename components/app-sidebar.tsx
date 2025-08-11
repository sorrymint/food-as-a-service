import { BookOpenCheck, Calendar, Home, Inbox, MapPin, Search, Settings, UserCircle, ReceiptText, Icon } from "lucide-react"

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
import { title } from "process"

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
    url: "/footerLinks/locations",
    icon: MapPin,
  },
  {
    title: "Settings",
    url: "/settings",
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

const Admin = [
  {
    title: "Dashbord",
    url: "/admin/dashboard",
  },
  {
    title: "Add Item",
    url: "/admin/create",
  },
  {
    title: "See Other Work",
    url: "/admin/see-our-work",
  },
  {
    title: "Admin Profile",
    url: "/admin",
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
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>
        {Admin.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url} title={item.title}>
                {/* <span>{item.emoji}</span> */}
                <span>{item.title}</span>
              </a>          
              </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}