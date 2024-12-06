import React, { useEffect, useState } from "react";
import SummaryApi from "../comman";
import "../App.css";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

export default function AllUser() {
  const [allUser, setallUser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateuserDetail, setupdateuserDetail] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });
  const fetchAllUser = async () => {
    const datares = await fetch(SummaryApi.all_user.url, {
      method: SummaryApi.all_user.method,
      credentials: "include",
    });

    const dataapi = await datares.json();
    if (dataapi.success) {
      setallUser(dataapi.data);
    }
    if (dataapi.error) {
      toast.error(dataapi.message);
    }
    console.log(dataapi);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data?.name}</td>
                <td>{data?.email}</td>
                <td>{data?.role}</td>
                <td>{moment(data?.createdAt).format("LL")}</td>
                <td onClick={() => setupdateuserDetail(data)}>
                  <button className="bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white" onClick={() => setopenUpdateRole(true)}>
                    <MdModeEdit  />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && <ChangeUserRole onClose={()=>setopenUpdateRole(false)} name={updateuserDetail.name} email={updateuserDetail.email} role={updateuserDetail.role} userId={updateuserDetail._id} funcallagain={fetchAllUser} />}
    </div>
  );
}
