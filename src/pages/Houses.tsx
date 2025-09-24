import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Search, 
  Plus, 
  MoreHorizontal,
  Users,
  Phone,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Houses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const houses = [
    {
      id: "A-101",
      owner: "Rajesh Kumar",
      members: 4,
      phone: "+91 98765 43210",
      email: "rajesh@email.com",
      status: "occupied",
      maintenance: "paid"
    },
    {
      id: "A-102",
      owner: "Priya Sharma",
      members: 3,
      phone: "+91 98765 43211",
      email: "priya@email.com",
      status: "occupied",
      maintenance: "pending"
    },
    {
      id: "A-103",
      owner: "Amit Patel",
      members: 5,
      phone: "+91 98765 43212",
      email: "amit@email.com",
      status: "occupied",
      maintenance: "paid"
    },
    {
      id: "B-201",
      owner: "Sunita Verma",
      members: 2,
      phone: "+91 98765 43213",
      email: "sunita@email.com",
      status: "occupied",
      maintenance: "overdue"
    },
    {
      id: "B-202",
      owner: "",
      members: 0,
      phone: "",
      email: "",
      status: "vacant",
      maintenance: "n/a"
    },
    {
      id: "B-203",
      owner: "Rohit Singh",
      members: 3,
      phone: "+91 98765 43214",
      email: "rohit@email.com",
      status: "occupied",
      maintenance: "paid"
    },
  ];

  const filteredHouses = houses.filter(house => 
    house.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      occupied: "bg-green-100 text-green-800 border-green-200",
      vacant: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return variants[status as keyof typeof variants] || variants.occupied;
  };

  const getMaintenanceBadge = (maintenance: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
      "n/a": "bg-gray-100 text-gray-800 border-gray-200"
    };
    return variants[maintenance as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              House <span className="text-gradient">Management</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage all properties and resident information
            </p>
          </div>
          <Button className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Add New House
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="input-premium pl-10"
                  placeholder="Search by house number or owner name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-soft-gold/20">
                  All Houses ({houses.length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-green-100">
                  Occupied ({houses.filter(h => h.status === 'occupied').length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Vacant ({houses.filter(h => h.status === 'vacant').length})
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Houses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <Card key={house.id} className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <Building2 className="w-5 h-5 text-charcoal" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-serif text-charcoal">
                      House {house.id}
                    </CardTitle>
                    <CardDescription>
                      {house.status === 'occupied' ? house.owner : 'Available'}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card border-white/20">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit House</DropdownMenuItem>
                    <DropdownMenuItem>Contact Owner</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className={getStatusBadge(house.status)}>
                    {house.status.charAt(0).toUpperCase() + house.status.slice(1)}
                  </Badge>
                  <Badge className={getMaintenanceBadge(house.maintenance)}>
                    {house.maintenance.charAt(0).toUpperCase() + house.maintenance.slice(1)}
                  </Badge>
                </div>

                {house.status === 'occupied' && (
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {house.members} members
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      {house.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {house.email}
                    </div>
                  </div>
                )}

                {house.status === 'vacant' && (
                  <div className="text-center py-4 text-muted-foreground">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Property available for rent</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHouses.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">No houses found</h3>
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

export default Houses;