import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import CategoryTable from "./CategoriesTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchCategories } from "@/utils/actions";

async function CategoryList() {
  const { data: categories, success, message } = await fetchCategories();
  if (!success) return <CustomErrorBoundary message={message} />;
  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold"> دسته بندی ها </h1>

      <CategoryTable data={categories} />
    </div>
  );
}

export default CategoryList;
