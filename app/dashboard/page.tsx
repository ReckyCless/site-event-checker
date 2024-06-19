import DashboardCard from "@/components/dashboard/DashboardCard";
import PostsTable from "@/components/posts/PostsTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <DashboardCard
          title="Мероприятия"
          count={10}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Посетители"
          count={19}
          icon={<User className="text-slate-500" size={72} />}
        />
      </div>
      <AnalyticsChart />
      <PostsTable title="Мероприятия" limit={5} />
    </>
  );
}
