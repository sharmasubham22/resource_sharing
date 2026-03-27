import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase';
import Swal from 'sweetalert2';

export default function ReportsTab() {
    const [reports, setReports] = useState([]);
    const firebase = useFirebase();

    useEffect(()=>{
            firebase.getAllReports().then((report)=>{
                setReports(report);
            })
        },[])

    const handleDeleteReport = async (id) => {
        const result = await Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#6d466b",
                        cancelButtonColor: "#cbd5e1",
                        confirmButtonText: "Yes, delete it!",
                      });
        
                if (!result.isConfirmed) return;
      const deleteResult = await firebase.deleteReport(id);
      if (deleteResult.success) {
                setReports((prev) => prev.filter((r) => r.id !== id));
                Swal.fire({
                  title: "Deleted!",
                  text: "The report has been deleted.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                console.error("Failed to delete report:", deleteResult.error);
                Swal.fire({
                  title: "Error",
                  text: "Could not delete the report. Please try again.",
                  icon: "error",
                });
              }
            }
  return (
    <div>
      <div className="relative overflow-x-auto bg-background shadow-xs rounded-base border border-border ">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-card border-b border-t border-border">
            <tr>
              <th scope="col" className="px-6 py-3 font-body">
                Comment
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Resource
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Added by
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Reported on
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((reportsData) => (
              <tr
                key={reportsData.id}
                className="bg-background border-b border-border hover:bg-card"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                >
                  <p className="text-text-primary">{reportsData.reason}</p>
                </th>
                <td className="px-6 py-4">{reportsData.resourceTitle}</td>
                <td className="px-6 py-4">{reportsData.reportedBy?.name}</td>
                {reportsData?.createdAt?.toDate().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                <td className="px-6 py-4 space-x-3">
                  <button
                    type="button"
                    className="font-medium text-danger hover:underline cursor-pointer"
                    onClick={() => handleDeleteReport(reportsData.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
