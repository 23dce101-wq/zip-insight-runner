import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Download,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Houses",
      value: "248",
      change: "+3 this month",
      icon: Building2,
      color: "text-blue-600"
    },
    {
      title: "Total Members",
      value: "892",
      change: "+12 this month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Vehicles",
      value: "456",
      change: "+8 this month",
      icon: Car,
      color: "text-purple-600"
    },
    {
      title: "Monthly Collection",
      value: "₹12,48,000",
      change: "+5.2% from last month",
      icon: DollarSign,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      action: "New member registered",
      details: "Rajesh Kumar - House B-204",
      time: "2 hours ago"
    },
    {
      action: "Maintenance payment received",
      details: "₹5,000 from House A-301",
      time: "4 hours ago"
    },
    {
      action: "Vehicle registered",
      details: "Honda City - MH 01 AB 1234",
      time: "6 hours ago"
    },
    {
      action: "Maintenance reminder sent",
      details: "25 houses - March 2024",
      time: "1 day ago"
    }
  ];

  const pendingTasks = [
    {
      task: "Review pending maintenance payments",
      count: "12 houses",
      priority: "high"
    },
    {
      task: "Approve new member applications",
      count: "3 applications",
      priority: "medium"
    },
    {
      task: "Update vehicle registrations",
      count: "5 vehicles",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              Welcome back, <span className="text-gradient">Pramukh</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's what's happening in your society today
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="btn-premium">
              <Plus className="w-4 h-4 mr-2" />
              Quick Actions
            </Button>
            <Button variant="outline" className="btn-glass">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-bold text-charcoal">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Collection Overview */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <TrendingUp className="w-5 h-5 mr-2" />
                Monthly Collection Overview
              </CardTitle>
              <CardDescription>
                March 2024 maintenance collection status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Collected</span>
                  <span className="text-green-600 font-semibold">₹10,48,000</span>
                </div>
                <Progress value={84} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>84% of total</span>
                  <span>₹2,00,000 pending</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-green-600">208</div>
                  <div className="text-sm text-muted-foreground">Houses Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-orange-600">40</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <AlertCircle className="w-5 h-5 mr-2" />
                Pending Tasks
              </CardTitle>
              <CardDescription>
                Items requiring your attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/30 hover:bg-white/40 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-charcoal text-sm">
                      {task.task}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.count}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                </div>
              ))}
              <Button variant="outline" className="w-full btn-glass mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates from your society
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-soft-gold mt-2" />
                  <div className="flex-1">
                    <p className="font-medium text-charcoal">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;