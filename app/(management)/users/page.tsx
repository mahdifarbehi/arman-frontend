import { Suspense } from "react";
import UsersList from "./components/UsersList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function UsersPage(props: {
  searchParams: Promise<{
    search?: string;
    role: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";
  const role = searchParams.role || "";

  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <UsersList search={searchTerm} role={role} />
      </Suspense>
    </section>
  );
}

export default UsersPage;
