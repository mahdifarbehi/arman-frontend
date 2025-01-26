import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import FailureTable from "./FailuresTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchFailures } from "@/utils/actions";

async function FailureList() {
  const { data: failure, success, message } = await fetchFailures();
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold"> دلایل شکست </h1>

  
        <FailureTable data={failure} />
     
    </div>
  );
}

export default FailureList;
