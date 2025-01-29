"use client";
import { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import UsersFilters from "./UsersFilters";
import ModalContainer from "@/components/common/ModalContainer";
import UserForm from "./UserForm";
import UserAssignmentForm from "./UserAssignmentForm";
import { fetchUsers } from "@/utils/actions";

function UsersList({ search, role }: { search?: string; role: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [UserAssignmentFormOpen, setUserAssignmentFormOpen] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const { data, success, message } = await fetchUsers(search, role);
        if (success) {
          setUsers(data);
        } else {
          setMessage(message || "خطایی رخ داده است");
        }
      } catch (error) {
        setMessage("خطا در برقراری ارتباط با سرور");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, [search, role]);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!users.length) return <CustomErrorBoundary message={message} />;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        کاربران
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewUserForm />
        <ModalContainer
          dialogTitle="واگذاری به مدیر"
          buttonText="واگذاری"
          open={UserAssignmentFormOpen}
          setOpen={setUserAssignmentFormOpen}
        >
          <UserAssignmentForm
            user_ids={[1, 2, 3]}
            setOpen={setUserAssignmentFormOpen}
          />
        </ModalContainer>
      </div>
      <div className="flex justify-between items-center ">
        <UsersFilters search={search} />
        <Search />
      </div>
      <UsersTable data={users} />
    </div>
  );
}

function NewUserForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="افزودن کاربر جدید"
      buttonText="افزودن کاربر جدید"
      open={open}
      setOpen={setOpen}
    >
      <UserForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default UsersList;
