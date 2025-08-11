import { GetAllDishes } from "@/app/actions/database_Resquest";
import AdminDashboardListing from "@/components/AdminDashboardListing";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
    const items = await GetAllDishes();
    

  return (
    <div className="">
    <h2 className="font-extrabold mb-12">Admin DashBoard</h2>

    <div>
        <DataTable columns={columns} data={items}/>
    </div>

    </div>
  )
}
