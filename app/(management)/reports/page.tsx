import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense, lazy } from "react";
const Customers = lazy(() => import("./components/Customers"));
const Sellers = lazy(() => import("./components/Sellers"));
const SalesManagers = lazy(() => import("./components/SalesManagers"));
const Products = lazy(() => import("./components/Products"));
const Origins = lazy(() => import("./components/Origins"));
const Failures = lazy(() => import("./components/Failures"));
const Categories = lazy(() => import("./components/Categories"));

function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 ">
      <Tabs
        defaultValue="customers"
        className="w-full border border-gray-200 p-4 rounded-xl flex flex-col justify-start items-center "
      >
        <TabsList className="w-128">
          <TabsTrigger value="sellers" className="w-32">
            فروشندگان
          </TabsTrigger>
          <TabsTrigger value="salesManagers" className="w-32">
            مدیران فروش
          </TabsTrigger>
          <TabsTrigger value="products" className="w-32">
            محصولات
          </TabsTrigger>
          <TabsTrigger value="categories" className="w-32">
            دسته بندی ها
          </TabsTrigger>
          <TabsTrigger value="origins" className="w-32">
            مبدا مشتریان
          </TabsTrigger>
          <TabsTrigger value="failures" className="w-32">
            شکست ها
          </TabsTrigger>
          <TabsTrigger value="customers" className="w-32">
            مشتریان
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sellers" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Sellers />
          </Suspense>
        </TabsContent>
        <TabsContent value="salesManagers" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <SalesManagers />
          </Suspense>
        </TabsContent>
        <TabsContent value="products" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Products />
          </Suspense>
        </TabsContent>
        <TabsContent value="categories" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Categories />
          </Suspense>
        </TabsContent>
        <TabsContent value="origins" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Origins />
          </Suspense>
        </TabsContent>
        <TabsContent value="failures" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Failures />
          </Suspense>
        </TabsContent>
        <TabsContent value="customers" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <Customers />
          </Suspense>
        </TabsContent>
      </Tabs>
      <div className="w-fill flex justify-center items-center mt-10 gap-10 ">
        <Button>مجموع فروش</Button>
        <Button>مجموع سود</Button>
        <Button>معامله های موفق</Button>
        <Button>معامله های ناموفق</Button>
      </div>
    </div>
  );
}

export default ReportsPage;
