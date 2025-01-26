import UsersTable from "./UsersTable";
import { fetchUsers } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import UsersFilters from "./UsersFilters";

async function UsersList({ search, role }: { search?: string; role: string }) {
  const { data: users, success, message } = await fetchUsers(search, role);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">کاربران</h1>
      <div className="flex flex-col justify-center items-start ">
        <Search />
        <UsersFilters search={search} />
      </div>
      <UsersTable data={users} />
    </div>
  );
}

export default UsersList;
