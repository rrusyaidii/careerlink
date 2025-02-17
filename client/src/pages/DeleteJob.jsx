import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import customFetch from "../../../utils/customFetch";

export async function action({ params }) {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job successfully deleted", { autoClose: 3000 });
  } catch (error) {
    toast.error(error?.response?.data?.msg, { autoClose: 2000 });
  }
  return redirect("/dashboard/all-jobs");
}
