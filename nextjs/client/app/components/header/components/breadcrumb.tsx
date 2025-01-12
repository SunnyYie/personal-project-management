"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function LayoutBreadcrumb() {
  return (
    <Breadcrumb className="bg-gray-100 px-4 py-2 dark:bg-gray-800 dark:text-gray-200">
      <BreadcrumbList>
        {/* {pathname.split("/").map((path, index) => {
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
        })} */}

        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
