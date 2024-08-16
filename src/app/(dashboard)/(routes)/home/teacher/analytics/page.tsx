import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GetAnalytics } from "../../../../../../../actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";


const AnalyticsPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/home")
    }

    const { data, totalRevenue, totalSales } = await GetAnalytics(userId);

    const chartData = data.map((item: { nome: string; total: number }) => ({
        name: item.nome,
        total: item.total
    }));

    return ( 
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Lucro"
                    value={totalRevenue}
                    shouldFormat
                />
                <DataCard
                    label="Vendas Totais"
                    value={totalSales}
                />
            </div>
            <Chart
                data={chartData}
            />
        </div>
     );
}
 
export default AnalyticsPage;