import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  BarChart3, 
  FileText, 
  TrendingUp,
  Calendar,
  Users,
  Building2,
  CreditCard,
  PieChart,
  Activity
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const reportTypes = [
    {
      title: "Monthly Collection Report",
      description: "Detailed maintenance collection summary with payment status",
      icon: CreditCard,
      formats: ["PDF", "Excel"],
      category: "Financial"
    },
    {
      title: "House Occupancy Report",
      description: "Current occupancy status and vacant properties overview",
      icon: Building2,
      formats: ["PDF", "Excel"],
      category: "Property"
    },
    {
      title: "Member Directory Report",
      description: "Complete member list with contact details and house assignments",
      icon: Users,
      formats: ["PDF", "Excel", "CSV"],
      category: "Membership"
    },
    {
      title: "Vehicle Registration Report",
      description: "All registered vehicles with owner information",
      icon: BarChart3,
      formats: ["PDF", "Excel"],
      category: "Vehicle Management"
    },
    {
      title: "Financial Summary Report",
      description: "Comprehensive financial overview with charts and trends",
      icon: TrendingUp,
      formats: ["PDF"],
      category: "Financial"
    },
    {
      title: "Outstanding Dues Report",
      description: "Pending and overdue maintenance payments summary",
      icon: FileText,
      formats: ["PDF", "Excel"],
      category: "Financial"
    }
  ];

  const quickStats = [
    {
      title: "Total Reports Generated",
      value: "156",
      change: "+12 this month",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Collection Accuracy",
      value: "98.5%",
      change: "+2.1% from last month",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Active Members",
      value: "892",
      change: "+15 this month",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Occupancy Rate",
      value: "94.2%",
      change: "+1.2% from last month",
      icon: Building2,
      color: "text-orange-600"
    }
  ];

  const recentReports = [
    {
      name: "March 2024 Collection Report",
      type: "Financial",
      generated: "2 hours ago",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      name: "Q1 2024 Member Directory",
      type: "Membership",
      generated: "1 day ago",
      size: "856 KB",
      format: "Excel"
    },
    {
      name: "Vehicle Registration Summary",
      type: "Vehicle Management",
      generated: "3 days ago",
      size: "1.2 MB",
      format: "PDF"
    },
    {
      name: "Outstanding Dues Report",
      type: "Financial",
      generated: "1 week ago",
      size: "978 KB",
      format: "Excel"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Financial": "bg-green-100 text-green-800 border-green-200",
      "Property": "bg-blue-100 text-blue-800 border-blue-200",
      "Membership": "bg-purple-100 text-purple-800 border-purple-200",
      "Vehicle Management": "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[category as keyof typeof colors] || colors.Financial;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              Reports & <span className="text-gradient">Analytics</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Generate comprehensive reports and financial summaries
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="march2024">
              <SelectTrigger className="w-48 input-premium">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="march2024">March 2024</SelectItem>
                <SelectItem value="february2024">February 2024</SelectItem>
                <SelectItem value="january2024">January 2024</SelectItem>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
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
          {/* Available Reports */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Available Reports
                </CardTitle>
                <CardDescription>
                  Generate and download comprehensive reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTypes.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform">
                        <report.icon className="w-5 h-5 text-charcoal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal">
                          {report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {report.description}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                            {report.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.formats.map((format) => (
                        <Button key={format} variant="outline" size="sm" className="btn-glass">
                          <Download className="w-3 h-3 mr-1" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Activity className="w-5 h-5 mr-2" />
                Recent Reports
              </CardTitle>
              <CardDescription>
                Previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal text-sm">
                        {report.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {report.type} • {report.size}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.generated}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full btn-glass mt-4">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <PieChart className="w-5 h-5 mr-2" />
                Collection Distribution
              </CardTitle>
              <CardDescription>
                Payment status breakdown for March 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Paid</span>
                  </div>
                  <span className="font-semibold text-charcoal">₹10,48,000 (84%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                  <span className="font-semibold text-charcoal">₹1,50,000 (12%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Overdue</span>
                  </div>
                  <span className="font-semibold text-charcoal">₹50,000 (4%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <TrendingUp className="w-5 h-5 mr-2" />
                Monthly Trends
              </CardTitle>
              <CardDescription>
                Collection trends over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">March 2024</span>
                  <span className="font-semibold text-green-600">84%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">February 2024</span>
                  <span className="font-semibold text-charcoal">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">January 2024</span>
                  <span className="font-semibold text-charcoal">91%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">December 2023</span>
                  <span className="font-semibold text-charcoal">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">November 2023</span>
                  <span className="font-semibold text-charcoal">93%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">October 2023</span>
                  <span className="font-semibold text-charcoal">88%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;