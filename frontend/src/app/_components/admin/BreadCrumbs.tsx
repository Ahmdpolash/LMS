"use client";

import { generateBreadcrumbs } from "@/utils/GenerateBreadCrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathname);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index < breadcrumbs.length - 1 ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={crumb.url || "#"}>
                      {crumb.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
