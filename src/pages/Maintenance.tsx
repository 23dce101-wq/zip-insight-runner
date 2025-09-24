import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Search, 
  Plus, 
  MoreHorizontal,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Calendar,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Maintenance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const payments = [
    {
      id: 1,
      house: "A-101",
      owner: "Rajesh Kumar",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: "2024-03-03",
      status: "paid",
      method: "UPI"
    },
    {
      id: 2,
      house: "A-102",
      owner: "Priya Sharma",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: null,
      status: "pending",
      method: null
    },
    {
      id: 3,
      house: "A-103",
      owner: "Amit Patel",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: "2024-03-01",
      status: "paid",
      method: "Bank Transfer"
    },
    {
      id: 4,
      house: "B-201",
      owner: "Sunita Verma",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: null,
      status: "overdue",
      method: null
    },
    {
      id: 5,
      house: "B-203",
      owner: "Rohit Singh",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: "2024-03-04",
      status: "paid",
      method: "Cash"
    },
    {
      id: 6,
      house: "C-301",
      owner: "Kavya Reddy",
      amount: 5000,
      month: "March 2024",
      dueDate: "2024-03-05",
      paidDate: null,
      status: "pending",
      method: null
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.house.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || payment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      overdue: "bg-red-100 text-red-800 border-red-200"
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      paid: CheckCircle,
      pending: Clock,
      overdue: AlertTriangle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const stats = {
    total: payments.length * 5000,
    collected: payments.filter(p => p.status === 'paid').length * 5000,
    pending: payments.filter(p => p.status === 'pending').length * 5000,
    overdue: payments.filter(p => p.status === 'overdue').length * 5000,
    collectionRate: Math.round((payments.filter(p => p.status === 'paid').length / payments.length) * 100)
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              Maintenance <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Transparent payment tracking with automated reminders
            </p>
          </div>
          <Button className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expected
              </CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-charcoal">
                ₹{stats.total.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                March 2024
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Collected
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-green-600">
                ₹{stats.collected.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.collectionRate}% collection rate
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-yellow-600">
                ₹{stats.pending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {payments.filter(p => p.status === 'pending').length} houses
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overdue
              </CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-red-600">
                ₹{stats.overdue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {payments.filter(p => p.status === 'overdue').length} houses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Collection Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-charcoal">March 2024 Collection Progress</CardTitle>
            <CardDescription>
              Overall maintenance collection status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Collection Progress</span>
                <span className="text-2xl font-serif font-bold text-charcoal">
                  {stats.collectionRate}%
                </span>
              </div>
              <Progress value={stats.collectionRate} className="h-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{stats.collected.toLocaleString()} collected</span>
                <span>₹{(stats.pending + stats.overdue).toLocaleString()} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="input-premium pl-10"
                  placeholder="Search by house number or owner name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full lg:w-48 input-premium">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/20">
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-charcoal">Payment Records</CardTitle>
            <CardDescription>
              Detailed maintenance payment status for all houses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => {
                const StatusIcon = getStatusIcon(payment.status);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gradient-primary">
                        <StatusIcon className="w-5 h-5 text-charcoal" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">
                          House {payment.house}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="w-3 h-3 mr-1" />
                          {payment.owner}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-charcoal">
                        ₹{payment.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {payment.month}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </div>
                      {payment.paidDate && (
                        <div className="text-xs text-green-600">
                          Paid: {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusBadge(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border-white/20">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {payment.status !== 'paid' && (
                            <DropdownMenuItem>Record Payment</DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {filteredPayments.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">No payments found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Maintenance;