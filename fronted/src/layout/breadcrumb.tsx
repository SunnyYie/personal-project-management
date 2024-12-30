import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useLocation } from "react-router";

export function LayoutBreadcrumb() {
  const { pathname } = useLocation();

  return (
    <Breadcrumb className="bg-gray-100 py-2 px-4">
      <BreadcrumbList>
        {pathname.split("/").map((path, index) => {
          if (path === "") {
            return null;
          }

          if (index === pathname.split("/").length - 1) {
            return <BreadcrumbPage key={index}>{path}</BreadcrumbPage>;
          }

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
