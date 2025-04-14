import { AdminSidebarItem } from "@/constant";

export const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter((segment) => segment); // Split path and remove empty segments
  const breadcrumbItems: { title: string; url?: string }[] = [
    { title: "Admin", url: "/admin" }, // Always start with "Admin"
  ];

  let foundMatch = false;

  // Special case for the Dashboard (exact match for /admin)
  if (pathname === "/admin") {
    const dashboardItem = AdminSidebarItem.navMain.find(
      (item) => item.url === "/admin"
    );
    if (dashboardItem) {
      breadcrumbItems.push({
        title: dashboardItem.title,
        url: dashboardItem.url,
      });
    }
    return breadcrumbItems;
  }

  // Traverse the sidebar items to match the path segments
  AdminSidebarItem.navMain.forEach((mainItem) => {
    // Skip adding "Dashboard" unless it's the exact path
    if (mainItem.url === "/admin" && pathname !== "/admin") {
      return; // Skip adding "Dashboard" to breadcrumbs for sub-paths
    }

    // Check sub-items if they exist
    if (mainItem.items) {
      mainItem.items.forEach((subItem) => {
        const subPathSegments = subItem.url
          .split("/")
          .filter((segment) => segment);

        // Match the sub-item URL with the current pathname
        if (pathname === subItem.url) {
          // Add the parent title (mainItem)
          breadcrumbItems.push({ title: mainItem.title });
          // Add the sub-item title as the last (active) breadcrumb
          breadcrumbItems.push({ title: subItem.title });
          foundMatch = true;
        }
      });
    }
  });

  // If no match is found, fallback to the pathname as the last segment
  if (!foundMatch && pathSegments.length > 1) {
    const lastSegment = pathSegments[pathSegments.length - 1]
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    breadcrumbItems.push({ title: lastSegment });
  }

  return breadcrumbItems;
};
