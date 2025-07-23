import React, { useState, useCallback, useRef } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { MetricCard } from '@/components/common/MetricCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, Plus, Settings, Move, Trash2, BarChart3, 
  TrendingUp, Users, DollarSign, Target, Activity, Save, RotateCcw
} from 'lucide-react';

interface DashboardPanel {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'kpi';
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  data?: any;
  config?: any;
}

interface DashboardLayout {
  id: string;
  name: string;
  panels: DashboardPanel[];
  createdAt: string;
  isDefault: boolean;
}

const defaultPanels: DashboardPanel[] = [
  {
    id: '1',
    type: 'metric',
    title: 'Monthly Revenue',
    width: 300,
    height: 120,
    x: 0,
    y: 0,
    data: { value: 67000, change: 15.2, positive: true },
    config: { icon: DollarSign, color: 'primary' }
  },
  {
    id: '2',
    type: 'metric',
    title: 'Active Users',
    width: 300,
    height: 120,
    x: 320,
    y: 0,
    data: { value: 2458, change: 8.1, positive: true },
    config: { icon: Users, color: 'success' }
  },
  {
    id: '3',
    type: 'chart',
    title: 'Revenue Trend',
    width: 640,
    height: 300,
    x: 0,
    y: 140,
    data: [
      { month: 'Jan', revenue: 45000, users: 1200 },
      { month: 'Feb', revenue: 52000, users: 1350 },
      { month: 'Mar', revenue: 48000, users: 1280 },
      { month: 'Apr', revenue: 58000, users: 1580 },
      { month: 'May', revenue: 61000, users: 1750 },
      { month: 'Jun', revenue: 67000, users: 2458 }
    ],
    config: { chartType: 'line', dataKey: 'revenue' }
  },
  {
    id: '4',
    type: 'kpi',
    title: 'Conversion Rate',
    width: 200,
    height: 150,
    x: 660,
    y: 0,
    data: { value: 3.4, target: 4.0, unit: '%' },
    config: { target: 4.0 }
  }
];

const availableWidgets = [
  { type: 'metric', name: 'Metric Card', icon: BarChart3 },
  { type: 'chart', name: 'Line Chart', icon: TrendingUp },
  { type: 'table', name: 'Data Table', icon: Activity },
  { type: 'kpi', name: 'KPI Widget', icon: Target }
];

export const CustomizableDashboard: React.FC = () => {
  const [layouts, setLayouts] = useState<DashboardLayout[]>([
    {
      id: 'default',
      name: 'Default Dashboard',
      panels: defaultPanels,
      createdAt: new Date().toISOString(),
      isDefault: true
    }
  ]);
  
  const [currentLayout, setCurrentLayout] = useState<string>('default');
  const [editMode, setEditMode] = useState(false);
  const [draggedPanel, setDraggedPanel] = useState<string | null>(null);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentDashboard = layouts.find(l => l.id === currentLayout);
  const panels = currentDashboard?.panels || [];

  const handleDragStart = useCallback((e: React.DragEvent, panelId: string) => {
    if (!editMode) return;
    setDraggedPanel(panelId);
    e.dataTransfer.effectAllowed = 'move';
  }, [editMode]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPanel || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLayouts(prev => prev.map(layout => 
      layout.id === currentLayout 
        ? {
            ...layout,
            panels: layout.panels.map(panel =>
              panel.id === draggedPanel
                ? { ...panel, x: Math.max(0, x - 50), y: Math.max(0, y - 25) }
                : panel
            )
          }
        : layout
    ));

    setDraggedPanel(null);
  }, [draggedPanel, currentLayout]);

  const addWidget = (type: string) => {
    const newPanel: DashboardPanel = {
      id: Date.now().toString(),
      type: type as DashboardPanel['type'],
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      width: 300,
      height: type === 'chart' ? 300 : 120,
      x: 20,
      y: 20,
      data: type === 'metric' ? { value: 0, change: 0, positive: true } : {},
      config: {}
    };

    setLayouts(prev => prev.map(layout =>
      layout.id === currentLayout
        ? { ...layout, panels: [...layout.panels, newPanel] }
        : layout
    ));

    setShowAddWidget(false);
  };

  const removePanel = (panelId: string) => {
    setLayouts(prev => prev.map(layout =>
      layout.id === currentLayout
        ? { ...layout, panels: layout.panels.filter(p => p.id !== panelId) }
        : layout
    ));
  };

  const saveLayout = () => {
    // In a real implementation, this would save to the backend
    console.log('Saving layout...', currentDashboard);
    setEditMode(false);
  };

  const createNewLayout = () => {
    if (!newLayoutName.trim()) return;

    const newLayout: DashboardLayout = {
      id: Date.now().toString(),
      name: newLayoutName,
      panels: [],
      createdAt: new Date().toISOString(),
      isDefault: false
    };

    setLayouts(prev => [...prev, newLayout]);
    setCurrentLayout(newLayout.id);
    setNewLayoutName('');
  };

  const renderPanel = (panel: DashboardPanel) => {
    const style = {
      position: 'absolute' as const,
      left: panel.x,
      top: panel.y,
      width: panel.width,
      height: panel.height,
      cursor: editMode ? 'move' : 'default'
    };

    const commonProps = {
      draggable: editMode,
      onDragStart: (e: React.DragEvent) => handleDragStart(e, panel.id),
      style,
      className: `${editMode ? 'ring-2 ring-primary/20 hover:ring-primary/40' : ''} transition-all duration-200`
    };

    switch (panel.type) {
      case 'metric':
        return (
          <div key={panel.id} {...commonProps}>
            <MetricCard
              value={panel.data?.value || 0}
              label={panel.title}
              change={panel.data ? { value: panel.data.change, positive: panel.data.positive } : undefined}
              icon={panel.config?.icon || DollarSign}
              color={panel.config?.color || 'primary'}
            />
            {editMode && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 p-0"
                onClick={() => removePanel(panel.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        );

      case 'chart':
        return (
          <div key={panel.id} {...commonProps}>
            <GlassCard className="p-4 h-full">
              <h3 className="font-semibold mb-2">{panel.title}</h3>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={panel.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey={panel.config?.dataKey || 'revenue'} 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              {editMode && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                  onClick={() => removePanel(panel.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </GlassCard>
          </div>
        );

      case 'kpi':
        return (
          <div key={panel.id} {...commonProps}>
            <GlassCard className="p-4 h-full text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{panel.title}</h3>
              <div className="text-2xl font-bold mb-1">
                {panel.data?.value}{panel.data?.unit}
              </div>
              <div className="text-xs text-muted-foreground">
                Target: {panel.config?.target || panel.data?.target}{panel.data?.unit}
              </div>
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, (panel.data?.value / (panel.config?.target || panel.data?.target || 1)) * 100)}%` 
                    }}
                  />
                </div>
              </div>
              {editMode && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                  onClick={() => removePanel(panel.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </GlassCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Customize your analytics view with drag-and-drop widgets</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={currentLayout} onValueChange={setCurrentLayout}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layouts.map(layout => (
                <SelectItem key={layout.id} value={layout.id}>
                  <div className="flex items-center gap-2">
                    <span>{layout.name}</span>
                    {layout.isDefault && <Badge variant="outline">Default</Badge>}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Layout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Dashboard Layout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="layout-name">Layout Name</Label>
                  <Input
                    id="layout-name"
                    value={newLayoutName}
                    onChange={(e) => setNewLayoutName(e.target.value)}
                    placeholder="Enter layout name"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={createNewLayout}>Create Layout</Button>
                  <Button variant="outline" onClick={() => setNewLayoutName('')}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {editMode ? (
            <div className="flex gap-2">
              <Button onClick={saveLayout}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Edit Layout
            </Button>
          )}
        </div>
      </div>

      {/* Edit Mode Controls */}
      {editMode && (
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Move className="w-3 h-3 mr-1" />
                Edit Mode
              </Badge>
              <span className="text-sm text-muted-foreground">
                Drag widgets to reposition them or click the + button to add new widgets
              </span>
            </div>
            <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Widget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Widget</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {availableWidgets.map((widget) => (
                    <Button
                      key={widget.type}
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() => addWidget(widget.type)}
                    >
                      <widget.icon className="w-6 h-6 mb-2" />
                      <span className="text-xs">{widget.name}</span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </GlassCard>
      )}

      {/* Dashboard Canvas */}
      <div className="relative">
        <div
          ref={canvasRef}
          className="relative min-h-[600px] bg-gradient-to-br from-background to-muted/20 rounded-lg border-2 border-dashed border-muted"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {panels.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mb-4">No widgets in this layout</p>
                <Button onClick={() => setEditMode(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Widget
                </Button>
              </div>
            </div>
          ) : (
            panels.map(renderPanel)
          )}
        </div>
      </div>

      {/* Layout Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          <span>Layout: {currentDashboard?.name}</span>
          {currentDashboard?.isDefault && <Badge variant="outline" className="ml-2">Default</Badge>}
        </div>
        <div>
          {panels.length} widget{panels.length !== 1 ? 's' : ''} • 
          Created {currentDashboard ? new Date(currentDashboard.createdAt).toLocaleDateString() : ''}
        </div>
      </div>
    </div>
  );
};