import { FilterBar } from "@/src/assets/components/management/FilterBar";
import { StudentTable } from "@/src/assets/components/management/StudentTable";
import { mockStudentManagement } from "@/src/lib/mock-student-management";
import { Pagination } from "@/src/assets/components/management/Pagination";
import { ErrorState } from "@/src/assets/components/dashboard/ErrorState";

export default function StudentManagementPage() {
  const response = mockStudentManagement;

  if (response.responseCode !== 0) return <ErrorState code={response.responseCode} message={response.responseMessage} />;

  return (
    <div className="p-8 max-w-400 mx-auto space-y-4">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Management</h1>
          <p className="text-slate-500 text-sm">Manage and view student records</p>
        </div>
      </div>
      
      <FilterBar />
      <StudentTable students={response.data} />
      
      {/* Pagination using the dataCount standard key */}
      <Pagination 
        totalItems={response.dataCount} 
        itemsPerPage={5} 
        currentPage={1} 
      />
    </div>
  );
}