'use client'

import React, { useState } from 'react'
import { Menu, MessageSquare, Settings, Users, PlusCircle, ChevronRight, DollarSign, BarChart2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const CRMDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [deals, setDeals] = useState([
    { id: 1, name: "Acme Corp Deal", value: 50000, stage: "New", company: "Acme Corp" },
    { id: 2, name: "TechStart Project", value: 75000, stage: "Proposition", company: "TechStart" },
    { id: 3, name: "GlobalTrade Contract", value: 100000, stage: "Won", company: "GlobalTrade" },
  ])

  const stages = ["New", "Proposition", "Won"]

  const recommendations = [
    { id: 1, product: "CRM Pro", relatedProduct: "Sales Analytics Suite" },
    { id: 2, product: "Cloud Storage", relatedProduct: "Data Backup Solution" },
  ]

  const addNewDeal = () => {
    const newDeal = {
      id: deals.length + 1,
      name: `New Deal ${deals.length + 1}`,
      value: 0,
      stage: "New",
      company: "New Company",
    }
    setDeals([...deals, newDeal])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold">CRM App</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-4">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'}`}
          >
            <BarChart2 className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'}`}
          >
            <DollarSign className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Deals</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'}`}
          >
            <Users className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Contacts</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'}`}
          >
            <Settings className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">CRM Dashboard</h2>
          <Button onClick={addNewDeal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Deal
          </Button>
        </header>

        {/* Dashboard Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {stages.map((stage) => (
                    <div key={stage} className="flex-1">
                      <h3 className="font-semibold mb-2">{stage}</h3>
                      <div className="space-y-2">
                        {deals
                          .filter((deal) => deal.stage === stage)
                          .map((deal) => (
                            <Card key={deal.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{deal.name}</p>
                                    <p className="text-sm text-gray-500">{deal.company}</p>
                                  </div>
                                  <Badge variant="secondary">
                                    ${deal.value.toLocaleString()}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">People who bought this also bought:</p>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={rec.product} />
                          <AvatarFallback>{rec.product[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{rec.product}</p>
                          <p className="text-sm text-gray-500">Recommended: {rec.relatedProduct}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default CRMDashboard