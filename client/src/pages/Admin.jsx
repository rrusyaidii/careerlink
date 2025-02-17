import { FaSuitcaseRolling, FaCalendarCheck, FaUsers } from "react-icons/fa";
import customFetch from "../../../utils/customFetch";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import StatItem from "../components/StatItem";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    console.log("nunez", response.data);

    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page!!", {
      autoClose: 2000,
    });
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaUsers />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />
    </Wrapper>
  );
};
export default Admin;
