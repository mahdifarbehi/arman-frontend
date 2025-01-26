import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import OriginTable from "./OriginsTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchCustomerOrigins } from "@/utils/actions";

async function OriginList() {
  const { data: origin, success, message } = await fetchCustomerOrigins();
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">مبداهای مشتری </h1>

    
        <OriginTable data={origin} />
      
    </div>
  );
}

export default OriginList;
