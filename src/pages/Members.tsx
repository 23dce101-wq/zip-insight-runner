import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Plus, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      house: "A-101",
      role: "Owner",
      joinDate: "Jan 2022",
      status: "active"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43211",
      house: "A-102",
      role: "Owner",
      joinDate: "Mar 2022",
      status: "active"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 98765 43212",
      house: "A-103",
      role: "Owner",
      joinDate: "Jun 2021",
      status: "active"
    },
    {
      id: 4,
      name: "Sunita Verma",
      email: "sunita.verma@email.com",
      phone: "+91 98765 43213",
      house: "B-201",
      role: "Owner",
      joinDate: "Aug 2021",
      status: "active"
    },
    {
      id: 5,
      name: "Rohit Singh",
      email: "rohit.singh@email.com",
      phone: "+91 98765 43214",
      house: "B-203",
      role: "Tenant",
      joinDate: "Dec 2023",
      status: "active"
    },
    {
      id: 6,
      name: "Kavya Reddy",
      email: "kavya.reddy@email.com",
      phone: "+91 98765 43215",
      house: "A-101",
      role: "Family Member",
      joinDate: "Jan 2022",
      status: "active"
    },
    {
      id: 7,
      name: "Arjun Kumar",
      email: "arjun.kumar@email.com",
      phone: "+91 98765 43216",
      house: "A-101",
      role: "Family Member",
      joinDate: "Jan 2022",
      status: "active"
    },
    {
      id: 8,
      name: "Meera Patel",
      email: "meera.patel@email.com",
      phone: "+91 98765 43217",
      house: "A-103",
      role: "Family Member",
      joinDate: "Jun 2021",
      status: "inactive"
    }
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.house.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const variants = {
      "Owner": "bg-purple-100 text-purple-800 border-purple-200",
      "Tenant": "bg-blue-100 text-blue-800 border-blue-200",
      "Family Member": "bg-green-100 text-green-800 border-green-200"
    };
    return variants[role as keyof typeof variants] || variants["Family Member"];
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              Member <span className="text-gradient">Directory</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive member profiles and contact information
            </p>
          </div>
          <Button className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Add New Member
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="glass-card lg:col-span-3">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="input-premium pl-10"
                  placeholder="Search by name, house, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-serif font-bold text-charcoal mb-1">
                {members.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 shadow-soft">
                    <AvatarFallback className="bg-gradient-primary text-charcoal font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-charcoal">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      House {member.house}
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Member</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className={getRoleBadge(member.role)}>
                    {member.role}
                  </Badge>
                  <Badge className={getStatusBadge(member.status)}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    Joined {member.joinDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">No members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card text-center p-4">
            <div className="text-2xl font-serif font-bold text-purple-600 mb-1">
              {members.filter(m => m.role === 'Owner').length}
            </div>
            <div className="text-sm text-muted-foreground">Owners</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-2xl font-serif font-bold text-blue-600 mb-1">
              {members.filter(m => m.role === 'Tenant').length}
            </div>
            <div className="text-sm text-muted-foreground">Tenants</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-2xl font-serif font-bold text-green-600 mb-1">
              {members.filter(m => m.role === 'Family Member').length}
            </div>
            <div className="text-sm text-muted-foreground">Family</div>
          </Card>
          <Card className="glass-card text-center p-4">
            <div className="text-2xl font-serif font-bold text-orange-600 mb-1">
              {members.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Members;