import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ShieldCheck, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Award, label: "Total Certificates", value: "12", color: "text-primary" },
  { icon: ShieldCheck, label: "Verified", value: "10", color: "text-secondary" },
  { icon: TrendingUp, label: "This Month", value: "3", color: "text-accent" },
  { icon: Users, label: "Verifications", value: "48", color: "text-primary" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNav />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Here's an overview of your educational credentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Certificates</CardTitle>
                <CardDescription>Your latest verified credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">Bachelor's Degree</h4>
                        <p className="text-sm text-muted-foreground">Computer Science - 2024</p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-secondary" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all">
                    <h4 className="font-semibold text-foreground mb-1">Upload New Certificate</h4>
                    <p className="text-sm text-muted-foreground">Add a new credential to your profile</p>
                  </button>
                  <button className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-accent hover:bg-accent/5 transition-all">
                    <h4 className="font-semibold text-foreground mb-1">Verify Certificate</h4>
                    <p className="text-sm text-muted-foreground">Check the authenticity of a credential</p>
                  </button>
                  <button className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-secondary hover:bg-secondary/5 transition-all">
                    <h4 className="font-semibold text-foreground mb-1">Share Credentials</h4>
                    <p className="text-sm text-muted-foreground">Generate shareable verification links</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
