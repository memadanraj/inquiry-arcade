
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BarChart3, CreditCard, Plus, Trash2, Edit, Eye, Users, Package, Lock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { toast } from 'sonner';

// Mock subscription plans data
const mockPlans = [
  {
    id: 1,
    name: "Basic",
    price: 0,
    billingCycle: "monthly",
    description: "Access to basic study materials and limited questions",
    features: [
      "Access to basic study materials",
      "Ask up to 5 questions per day",
      "View public answers",
    ],
    status: "active",
    subscriberCount: 2453,
    revenue: 0,
  },
  {
    id: 2,
    name: "Premium",
    price: 9.99,
    billingCycle: "monthly",
    description: "Full access to all study materials and unlimited questions",
    features: [
      "Access to ALL study materials",
      "Unlimited questions",
      "Priority answers",
      "Ad-free experience",
      "Download materials for offline use"
    ],
    status: "active",
    subscriberCount: 873,
    revenue: 8721.27,
  },
  {
    id: 3,
    name: "Premium Annual",
    price: 99.99,
    billingCycle: "yearly",
    description: "Annual subscription with all premium features at a discounted rate",
    features: [
      "All Premium features",
      "2 months free (compared to monthly)",
      "Early access to new features",
      "Priority support"
    ],
    status: "active",
    subscriberCount: 341,
    revenue: 34087.59,
  },
  {
    id: 4,
    name: "Campus Pro",
    price: 19.99,
    billingCycle: "monthly",
    description: "For serious students - includes exclusive preboard materials and solution guides",
    features: [
      "All Premium features",
      "Exclusive preboard exams",
      "Step-by-step solution guides",
      "1-on-1 doubt clearing sessions",
      "Personalized study plan"
    ],
    status: "draft",
    subscriberCount: 0,
    revenue: 0,
  }
];

// Mock subscription users data
const mockSubscribers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    plan: "Premium",
    startDate: "2023-11-15",
    nextBillingDate: "2024-04-15",
    status: "active",
    totalSpent: 49.95,
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.j@example.com",
    plan: "Premium Annual",
    startDate: "2024-01-10",
    nextBillingDate: "2025-01-10",
    status: "active",
    totalSpent: 99.99,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    plan: "Premium",
    startDate: "2023-09-22",
    nextBillingDate: "2024-03-22",
    status: "cancelled",
    totalSpent: 59.94,
  },
];

const SubscriptionManagement = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [isViewSubscribersDialogOpen, setIsViewSubscribersDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    billingCycle: 'monthly',
    description: '',
    features: [''],
    status: 'draft'
  });

  const handleAddPlan = () => {
    const newPlanItem = {
      id: plans.length + 1,
      name: newPlan.name,
      price: parseFloat(newPlan.price),
      billingCycle: newPlan.billingCycle,
      description: newPlan.description,
      features: newPlan.features.filter(f => f.trim() !== ''),
      status: newPlan.status,
      subscriberCount: 0,
      revenue: 0,
    };
    
    setPlans([...plans, newPlanItem]);
    setIsAddPlanDialogOpen(false);
    toast.success("New subscription plan created successfully");
    
    // Reset form
    setNewPlan({
      name: '',
      price: '',
      billingCycle: 'monthly',
      description: '',
      features: [''],
      status: 'draft'
    });
  };

  const handleAddFeature = () => {
    setNewPlan({...newPlan, features: [...newPlan.features, '']});
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan({...newPlan, features: updatedFeatures});
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures.splice(index, 1);
    setNewPlan({...newPlan, features: updatedFeatures});
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
    toast.success("Subscription plan deleted successfully");
  };

  const handleActivatePlan = (id: number) => {
    setPlans(plans.map(plan => 
      plan.id === id ? {...plan, status: 'active'} : plan
    ));
    toast.success("Subscription plan activated successfully");
  };

  const handleViewSubscribers = (id: number) => {
    setSelectedPlanId(id);
    setIsViewSubscribersDialogOpen(true);
  };

  const selectedPlan = selectedPlanId ? plans.find(plan => plan.id === selectedPlanId) : null;
  const planSubscribers = subscribers.filter(sub => 
    selectedPlan && sub.plan === selectedPlan.name
  );

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscriberCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Subscription Management</h2>
          <p className="text-muted-foreground">Manage subscription plans and subscribers</p>
        </div>
        
        <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Subscription Plan</DialogTitle>
              <DialogDescription>
                Create a new subscription plan for your users
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input 
                  id="name" 
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  placeholder="e.g., Premium"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                    placeholder="e.g., 9.99"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="billingCycle">Billing Cycle</Label>
                  <Select 
                    value={newPlan.billingCycle}
                    onValueChange={(value) => setNewPlan({...newPlan, billingCycle: value})}
                  >
                    <SelectTrigger id="billingCycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="one-time">One-time Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                  placeholder="Describe what this plan offers"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddFeature}
                  >
                    Add Feature
                  </Button>
                </div>
                
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g., Unlimited questions"
                    />
                    {newPlan.features.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="active" 
                  checked={newPlan.status === 'active'}
                  onCheckedChange={(checked) => 
                    setNewPlan({...newPlan, status: checked ? 'active' : 'draft'})
                  }
                />
                <Label htmlFor="active">Make plan active immediately</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddPlan} 
                disabled={!newPlan.name || !newPlan.price || !newPlan.description}
              >
                Create Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <CreditCard className="h-8 w-8 text-indigo-500 mb-2" />
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">${totalRevenue.toFixed(2)}</h3>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </GlassCard>
        
        <GlassCard className="p-4 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <Users className="h-8 w-8 text-emerald-500 mb-2" />
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{totalSubscribers}</h3>
          <p className="text-sm text-muted-foreground">Active Subscribers</p>
        </GlassCard>
        
        <GlassCard className="p-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <Package className="h-8 w-8 text-purple-500 mb-2" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{plans.filter(p => p.status === 'active').length}</h3>
          <p className="text-sm text-muted-foreground">Active Plans</p>
        </GlassCard>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Subscription Plans</h3>
        
        {plans.map(plan => (
          <GlassCard key={plan.id} className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg">{plan.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    plan.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                  </span>
                </div>
                
                <div className="my-2">
                  <span className="text-2xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billingCycle}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="space-y-2 md:text-right">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Subscribers: </span>
                    <span className="font-medium">{plan.subscriberCount}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Revenue: </span>
                    <span className="font-medium">${plan.revenue.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleViewSubscribers(plan.id)}
                  >
                    <Users className="h-4 w-4" />
                    Subscribers
                  </Button>
                  
                  {plan.status !== 'active' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                      onClick={() => handleActivatePlan(plan.id)}
                    >
                      <Eye className="h-4 w-4" />
                      Activate
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {/* View Subscribers Dialog */}
      <Dialog open={isViewSubscribersDialogOpen} onOpenChange={setIsViewSubscribersDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPlan ? `${selectedPlan.name} Subscribers` : 'Plan Subscribers'}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan ? `${planSubscribers.length} subscribers to this plan` : 'Loading...'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-4">
              {planSubscribers.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Start Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Next Billing</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-background divide-y divide-border">
                      {planSubscribers.map(subscriber => (
                        <tr key={subscriber.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium">{subscriber.name}</div>
                                <div className="text-sm text-muted-foreground">{subscriber.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{subscriber.startDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{subscriber.nextBillingDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscriber.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">${subscriber.totalSpent.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No subscribers yet</h3>
                  <p className="text-muted-foreground mt-1 max-w-xs">This plan doesn't have any subscribers yet. Once users subscribe, they'll appear here.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionManagement;
