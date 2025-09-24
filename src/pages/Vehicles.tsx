import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Bike, 
  Search, 
  Plus, 
  MoreHorizontal,
  Filter,
  User,
  MapPin,
  Calendar
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

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const vehicles = [
    {
      id: 1,
      number: "MH 01 AB 1234",
      type: "Four Wheeler",
      brand: "Honda City",
      color: "White",
      owner: "Rajesh Kumar",
      house: "A-101",
      registeredDate: "Jan 15, 2022",
      status: "active"
    },
    {
      id: 2,
      number: "MH 01 XY 5678",
      type: "Two Wheeler",
      brand: "Honda Activa",
      color: "Red",
      owner: "Priya Sharma",
      house: "A-102",
      registeredDate: "Mar 22, 2022",
      status: "active"
    },
    {
      id: 3,
      number: "MH 01 CD 9012",
      type: "Four Wheeler",
      brand: "Maruti Swift",
      color: "Blue",
      owner: "Amit Patel",
      house: "A-103",
      registeredDate: "Jun 10, 2021",
      status: "active"
    },
    {
      id: 4,
      number: "MH 01 EF 3456",
      type: "Two Wheeler",
      brand: "Royal Enfield",
      color: "Black",
      owner: "Rohit Singh",
      house: "B-203",
      registeredDate: "Dec 05, 2023",
      status: "active"
    },
    {
      id: 5,
      number: "MH 01 GH 7890",
      type: "Four Wheeler",
      brand: "Hyundai Creta",
      color: "Silver",
      owner: "Sunita Verma",
      house: "B-201",
      registeredDate: "Aug 18, 2021",
      status: "inactive"
    },
    {
      id: 6,
      number: "MH 01 IJ 2345",
      type: "Two Wheeler",
      brand: "TVS Apache",
      color: "Red",
      owner: "Kavya Reddy",
      house: "A-101",
      registeredDate: "Feb 28, 2023",
      status: "active"
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.house.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === "all" || 
      (filterType === "two-wheeler" && vehicle.type === "Two Wheeler") ||
      (filterType === "four-wheeler" && vehicle.type === "Four Wheeler");
    
    return matchesSearch && matchesFilter;
  });

  const getVehicleIcon = (type: string) => {
    return type === "Two Wheeler" ? Bike : Car;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      "Two Wheeler": "bg-blue-100 text-blue-800 border-blue-200",
      "Four Wheeler": "bg-purple-100 text-purple-800 border-purple-200"
    };
    return variants[type as keyof typeof variants] || variants["Two Wheeler"];
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const stats = {
    total: vehicles.length,
    twoWheeler: vehicles.filter(v => v.type === "Two Wheeler").length,
    fourWheeler: vehicles.filter(v => v.type === "Four Wheeler").length,
    active: vehicles.filter(v => v.status === "active").length
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              Vehicle <span className="text-gradient">Registry</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage all two-wheelers and four-wheelers with easy tracking
            </p>
          </div>
          <Button className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Register Vehicle
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card text-center p-4">
            <div className="text-3xl font-serif font-bold text-charcoal mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">Total Vehicles</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-3xl font-serif font-bold text-blue-600 mb-1">
              {stats.twoWheeler}
            </div>
            <div className="text-sm text-muted-foreground">Two Wheeler</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-3xl font-serif font-bold text-purple-600 mb-1">
              {stats.fourWheeler}
            </div>
            <div className="text-sm text-muted-foreground">Four Wheeler</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-3xl font-serif font-bold text-green-600 mb-1">
              {stats.active}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="input-premium pl-10"
                  placeholder="Search by vehicle number, brand, owner, or house..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full lg:w-48 input-premium">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/20">
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                  <SelectItem value="four-wheeler">Four Wheeler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const VehicleIcon = getVehicleIcon(vehicle.type);
            return (
              <Card key={vehicle.id} className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <VehicleIcon className="w-5 h-5 text-charcoal" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-charcoal">
                        {vehicle.number}
                      </CardTitle>
                      <CardDescription>
                        {vehicle.brand} - {vehicle.color}
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
                      <DropdownMenuItem>Edit Vehicle</DropdownMenuItem>
                      <DropdownMenuItem>Contact Owner</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getTypeBadge(vehicle.type)}>
                      {vehicle.type}
                    </Badge>
                    <Badge className={getStatusBadge(vehicle.status)}>
                      {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{vehicle.owner}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      House {vehicle.house}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      Registered {vehicle.registeredDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Car className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">No vehicles found</h3>
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

export default Vehicles;