import bookings from "@/pages/User/bookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "History",
        items: [{
            title: "Bookings",
            url: '/user/bookings',
            component: bookings,
        }]
    }
]