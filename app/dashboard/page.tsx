"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  Home,
  Users,
  Briefcase,
  Phone,
  LayoutDashboard,
  History,
  Star,
  Droplets,
  Thermometer,
  Activity,
  Zap,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Microscope,
  Save,
  RefreshCw,
  Fish,
  Waves,
  Eye,
  RotateCcw,
  Heart,
  Check,
  ChevronsUpDown,
  User,
  LogOut,
} from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { set } from "date-fns"

// ============= DATABASE VARIABLES - REPLACE WITH YOUR API CALLS =============
// Navigation items - can be fetched from database
const navigationItems: any = [
  { id: 1, name: "الرئيسية", href: "/", icon: Home },
  { id: 2, name: "من نحن", href: "/about", icon: Users },
  { id: 3, name: "الخدمات", href: "/services", icon: Briefcase },
  { id: 4, name: "اتصل بنا", href: "/contact", icon: Phone },
]

// Sidebar items - can be fetched from database
const sidebarItems: any = [
  { id: 1, name: "لوحة القيادة", href: "/dashboard", icon: LayoutDashboard },
  { id: 2, name: "إدارة الأحواض", href: "/pools", icon: Droplets },
  { id: 3, name: "التاريخ", href: "/history", icon: History },
  { id: 4, name: "التوصيات", href: "/recommendations", icon: Star },
  { id: 5, name: "فحص البكتيريا", href: "/bacteria", icon: Microscope },
  { id: 6, name: "الإعدادات", href: "/settings", icon: Settings },
  { id: 7, name: "الملف الشخصي", href: "/profile", icon: User },
]

// User profile - fetch from your authentication system
const userProfile: any = {
  id: 1,
  name: "أحمد محمد",
  email: "ahmed.mohamed@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
}



// Card filters - can be stored in database or config
const cardFilters: any = [
  { id: "all", name: "الكل", icon: Activity },
  { id: "ph", name: "مستوى الحموضة", icon: Droplets },
  { id: "temperature", name: "درجة الحرارة", icon: Thermometer },
  { id: "chlorine", name: "الكلورين", icon: Zap },
  { id: "salinity", name: "الملوحة", icon: Waves },
  { id: "dissolved_oxygen", name: "الأكسجين المذاب", icon: Zap },
  { id: "turbidity", name: "العكارة", icon: Eye },
  { id: "fish_state", name: "حالة الأسماك", icon: Fish },
]

// Dashboard cards data - fetch from database: SELECT * FROM pool_measurements WHERE pool_id = ? ORDER BY created_at DESC LIMIT 1
const dashboardCardsData: any = [
  {
    id: 1,
    pool_id: 1,
    parameter: "ph",
    title: "مستوى الحموضة",
    value: "7.2",
    unit: "",
    status: "good",
    icon: Droplets,
    color: "#38bdf8",
    min_value: 7.0,
    max_value: 7.6,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    pool_id: 1,
    parameter: "temperature",
    title: "درجة الحرارة",
    value: "78",
    unit: "°ف",
    status: "good",
    icon: Thermometer,
    color: "#38bdf8",
    min_value: 78,
    max_value: 82,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 3,
    pool_id: 1,
    parameter: "chlorine",
    title: "الكلورين",
    value: "2.1",
    unit: "جزء في المليون",
    status: "warning",
    icon: Zap,
    color: "#38bdf8",
    min_value: 1.0,
    max_value: 3.0,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 4,
    pool_id: 1,
    parameter: "salinity",
    title: "الملوحة",
    value: "35",
    unit: "جزء في الألف",
    status: "good",
    icon: Waves,
    color: "#38bdf8",
    min_value: 30,
    max_value: 40,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 5,
    pool_id: 1,
    parameter: "dissolved_oxygen",
    title: "الأكسجين المذاب",
    value: "8.2",
    unit: "مجم/لتر",
    status: "good",
    icon: Zap,
    color: "#38bdf8",
    min_value: 6.0,
    max_value: 12.0,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 6,
    pool_id: 1,
    parameter: "turbidity",
    title: "العكارة",
    value: "2.1",
    unit: "وحدة العكارة",
    status: "warning",
    icon: Eye,
    color: "#38bdf8",
    min_value: 0,
    max_value: 5,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 7,
    pool_id: 1,
    parameter: "fish_state",
    title: "حالة الأسماك",
    value: "نشطة",
    unit: "",
    status: "good",
    icon: Fish,
    color: "#38bdf8",
    min_value: null,
    max_value: null,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 8,
    pool_id: 1,
    parameter: "overall_health",
    title: "الصحة العامة",
    value: "92",
    unit: "%",
    status: "good",
    icon: Heart,
    color: "#38bdf8",
    min_value: 70,
    max_value: 100,
    created_at: "2024-01-15T10:30:00Z",
  },
]

// Chart data - fetch from database: SELECT * FROM pool_measurements WHERE pool_id = ? AND created_at >= ? ORDER BY created_at
const chartDataFromDB: any = [
  { time: "1h", ph: 7.1, temperature: 76, chlorine: 2.0, overall: 85, created_at: "2024-01-15T09:30:00Z" },
  { time: "2h", ph: 7.2, temperature: 77, chlorine: 2.1, overall: 87, created_at: "2024-01-15T08:30:00Z" },
  { time: "3h", ph: 7.3, temperature: 78, chlorine: 2.2, overall: 89, created_at: "2024-01-15T07:30:00Z" },
  { time: "4h", ph: 7.2, temperature: 78, chlorine: 2.1, overall: 88, created_at: "2024-01-15T06:30:00Z" },
  { time: "5h", ph: 7.1, temperature: 79, chlorine: 2.0, overall: 86, created_at: "2024-01-15T05:30:00Z" },
  { time: "6h", ph: 7.2, temperature: 78, chlorine: 2.1, overall: 87, created_at: "2024-01-15T04:30:00Z" },
]

// General farm statistics
const farmStats: any = {
  totalPools: 5,
  activePools: 4,
  maintenancePools: 1,
  averageHealth: 89,
  totalFish: 2500,
  averageTemperature: 78.5,
  averagePH: 7.2,
  criticalAlerts: 2,
}

// Recommendations data - fetch from database: SELECT * FROM recommendations WHERE pool_id = ? ORDER BY priority DESC, created_at DESC
const recommendationsData: any = [
  {
    id: 1,
    pool_id: 1,
    title: "درجة الحرارة منخفضة",
    description: "درجة حرارة الحوض أقل من المعدل الأمثل. يُنصح بتسخين الحوض للحفاظ على الراحة.",
    priority: "high", // high, medium, low
    parameter: "temperature",
    current_value: 76,
    recommended_value: "78-82°ف",
    action: "زيادة إعداد درجة حرارة المدفأة",
    created_at: "2024-01-15T10:30:00Z",
    status: "active", // active, resolved, ignored
  },
  {
    id: 2,
    pool_id: 1,
    title: "تحذير مستوى الكلورين",
    description: "مستويات الكلورين مرتفعة قليلاً. راقب عن كثب لمنع الإفراط في الكلورة.",
    priority: "medium",
    parameter: "chlorine",
    current_value: 2.1,
    recommended_value: "1.0-2.0 جزء في المليون",
    action: "تقليل جرعة الكلورين أو زيادة الدوران",
    created_at: "2024-01-15T10:25:00Z",
    status: "active",
  },
  {
    id: 3,
    pool_id: 2,
    title: "صيانة دورية مطلوبة",
    description: "جدولة التنظيف المنتظم وصيانة المرشح للحصول على الأداء الأمثل.",
    priority: "low",
    parameter: "maintenance",
    current_value: null,
    recommended_value: "أسبوعياً",
    action: "جدولة موعد الصيانة",
    created_at: "2024-01-15T09:00:00Z",
    status: "active",
  },
]

// Historical data - fetch from database: SELECT * FROM pool_measurements WHERE pool_id = ? ORDER BY created_at DESC
const historicalData: any = [
  {
    id: 1,
    pool_id: 1,
    ph: 7.2,
    temperature: 78,
    chlorine: 2.1,
    salinity: 35,
    dissolved_oxygen: 8.2,
    turbidity: 2.1,
    fish_state: "نشطة",
    overall_status: "جيد",
    created_at: "2024-01-15T10:30:00Z",
  },
  // ... more historical records
]

// Bacteria test data - fetch from database: SELECT * FROM bacteria_tests WHERE pool_id = ? ORDER BY created_at DESC
const bacteriaTestData: any = [
  {
    id: 1,
    pool_id: 1,
    test_result: "negative", // positive, negative, pending
    bacteria_count: 0,
    test_type: "coliform",
    tested_at: "2024-01-15T10:00:00Z",
    status: "completed", // pending, completed, failed
  },
  {
    id: 2,
    pool_id: 1,
    test_result: "positive",
    bacteria_count: 15,
    test_type: "e_coli",
    tested_at: "2024-01-14T15:30:00Z",
    status: "completed",
  },
]

// Settings/Configuration data - fetch from database: SELECT * FROM pool_settings WHERE pool_id = ?
const poolSettingsData: any = [
  {
    id: 1,
    pool_id: 1,
    parameter: "ph",
    min_value: 7.0,
    max_value: 7.6,
    target_value: 7.2,
    unit: "",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    pool_id: 1,
    parameter: "temperature",
    min_value: 78,
    max_value: 82,
    target_value: 80,
    unit: "°F",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 3,
    pool_id: 1,
    parameter: "chlorine",
    min_value: 1.0,
    max_value: 3.0,
    target_value: 2.0,
    unit: "ppm",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 4,
    pool_id: 1,
    parameter: "salinity",
    min_value: 30,
    max_value: 40,
    target_value: 35,
    unit: "ppt",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 5,
    pool_id: 1,
    parameter: "dissolved_oxygen",
    min_value: 6.0,
    max_value: 12.0,
    target_value: 8.0,
    unit: "mg/L",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 6,
    pool_id: 1,
    parameter: "turbidity",
    min_value: 0,
    max_value: 5,
    target_value: 2.0,
    unit: "NTU",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 7,
    pool_id: 1,
    parameter: "overall_health",
    min_value: 70,
    max_value: 100,
    target_value: 90,
    unit: "%",
    updated_at: "2024-01-15T10:30:00Z",
  },
]

// ============= END DATABASE VARIABLES =============

// Searchable Select Component
function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder,
  className,
}: {
  value: any
  onValueChange: (value: any) => void
  options: any
  placeholder: any
  searchPlaceholder: any
  className?: any
}) {
  const [open, setOpen] = useState<any>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("justify-between", className)}>
          {value ? options.find((option:any) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>لا توجد خيارات متاحة.</CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  <div>
                    <div>{option.label}</div>
                    {option.subtitle && <div className="text-sm text-muted-foreground">{option.subtitle}</div>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function DashboardPage() {
  const router = useRouter()

  // State variables
  const [activeNavItem, setActiveNavItem] = useState<any>("الرئيسية")
  const [activeSidebarItem, setActiveSidebarItem] = useState<any>("لوحة القيادة")
  const [selectedPool, setSelectedPool] = useState<any>("1")
  const [selectedFilter, setSelectedFilter] = useState<any>("all")
  const [timeRange, setTimeRange] = useState<any>("6h")
  const [isLoading, setIsLoading] = useState<any>(false)
  const [settings, setSettings] = useState<any>(poolSettingsData)
  const [bacteriaTestInProgress, setBacteriaTestInProgress] = useState<any>(false)
  const [waterChangeInProgress, setWaterChangeInProgress] = useState<any>(false)
  const [feedingInProgress, setFeedingInProgress] = useState<any>(false)
  const [poolsData, setPools] = useState<any>()
  // Pools data - fetch from database: SELECT * FROM pools
useEffect(() => {
  const fetchPools = async (): Promise<any> => {
  try {
    console.log('Fetching pools from API...')
    const response: any = await fetch(`http://localhost:3000/api/pools`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const pools: any = await response.json()
    console.log('Pools fetched successfully:', pools)
    setPools(pools)
    return pools
  } catch (error: any) {
    console.error('Error fetching pools:', error)
    // Fallback to dummy data if API fails
    return [
      { pool_id: 1, number_of_fish: 150, age_of_fish: 45, capacity_liters: 2000, created_at: "2024-01-15T10:30:00Z" },
      { pool_id: 2, number_of_fish: 200, age_of_fish: 60, capacity_liters: 3000, created_at: "2024-01-10T08:00:00Z" },
      { pool_id: 3, number_of_fish: 75, age_of_fish: 30, capacity_liters: 1500, created_at: "2024-01-20T14:15:00Z" },
      { pool_id: 4, number_of_fish: 25, age_of_fish: 6, capacity_liters: 5000, created_at: "2025-07-19T04:52:35.301Z" },
    ]
  }
}
fetchPools()
},[]);
  

  // Prepare options for searchable selects
  const poolOptions: any = poolsData?.map((pool: any) => ({
    value: pool.pool_id.toString(),
    label: `حوض ${pool.pool_id}`,
    subtitle: `${pool.number_of_fish} سمكة - ${pool.capacity_liters}لتر`,
  }))

  const filterOptions: any = cardFilters.map((filter: any) => ({
    value: filter.id,
    label: filter.name,
  }))

  // API Functions - Replace these with your actual API calls
  const fetchPoolData = async (poolId: any): Promise<any> => {
    try {
      console.log(`Fetching data for pool ${poolId}`)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/measurements`)
      // const data = await response.json()
      return dashboardCardsData.filter((card: any) => card.pool_id.toString() === poolId)
    } catch (error: any) {
      console.error("Error fetching pool data:", error)
      return []
    }
  }

  const fetchHistoricalData = async (poolId: any, timeRange: any, parameter?: any): Promise<any> => {
    try {
      console.log(`Fetching historical data for pool ${poolId}, range: ${timeRange}, parameter: ${parameter}`)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/history?range=${timeRange}&parameter=${parameter}`)
      // const data = await response.json()
      return historicalData.filter((record: any) => record.pool_id.toString() === poolId)
    } catch (error: any) {
      console.error("Error fetching historical data:", error)
      return []
    }
  }

  const fetchRecommendations = async (poolId: any): Promise<any> => {
    try {
      console.log(`Fetching recommendations for pool ${poolId}`)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/recommendations`)
      // const data = await response.json()
      return recommendationsData
        .filter((rec: any) => rec.pool_id.toString() === poolId)
        .sort((a: any, b: any) => {
          const priorityOrder: any = { high: 3, medium: 2, low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )
        })
    } catch (error: any) {
      console.error("Error fetching recommendations:", error)
      return []
    }
  }

  const fetchPoolSettings = async (poolId: any): Promise<any> => {
    try {
      console.log(`Fetching settings for pool ${poolId}`)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/settings`)
      // const data = await response.json()
      return poolSettingsData.filter((setting: any) => setting.pool_id.toString() === poolId)
    } catch (error: any) {
      console.error("Error fetching pool settings:", error)
      return []
    }
  }

  const updatePoolSettings = async (poolId: any, settingsData: any): Promise<any> => {
    try {
      console.log(`Updating settings for pool ${poolId}:`, settingsData)
      setIsLoading(true)
      // Replace with actual API call:
      // const response = await fetch(`/api/pools/${poolId}/settings`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settingsData)
      // })
      // if (!response.ok) throw new Error('Failed to update settings')
      // const result = await response.json()

      // Simulate API call
      await new Promise((resolve: any) => setTimeout(resolve, 1000))
      setSettings(settingsData)
      setIsLoading(false)
      alert("تم تحديث الإعدادات بنجاح!")
      return { success: true }
    } catch (error: any) {
      console.error("Error updating pool settings:", error)
      setIsLoading(false)
      alert("فشل في تحديث الإعدادات. حاول مرة أخرى.")
      return { success: false, error }
    }
  }

  const startBacteriaTest = async (poolId: any): Promise<any> => {
    try {
      console.log(`Starting bacteria test for pool ${poolId}`)
      setBacteriaTestInProgress(true)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/bacteria-test`, { method: 'POST' })
      // const result = await response.json()

      // Simulate API call
      await new Promise((resolve: any) => setTimeout(resolve, 5000))
      setBacteriaTestInProgress(false)
      alert("تم إكمال فحص البكتيريا!")
      return { success: true }
    } catch (error: any) {
      console.error("Error starting bacteria test:", error)
      setBacteriaTestInProgress(false)
      alert("فشل في بدء فحص البكتيريا. حاول مرة أخرى.")
      return { success: false, error }
    }
  }

  const changeWater = async (poolId: any): Promise<any> => {
    try {
      console.log(`Starting water change for pool ${poolId}`)
      setWaterChangeInProgress(true)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/water-change`, { method: 'POST' })
      // const result = await response.json()

      // Simulate API call
      await new Promise((resolve: any) => setTimeout(resolve, 8000))
      setWaterChangeInProgress(false)
      alert("تم تغيير الماء بنجاح!")
      return { success: true }
    } catch (error: any) {
      console.error("Error changing water:", error)
      setWaterChangeInProgress(false)
      alert("فشل في تغيير الماء. حاول مرة أخرى.")
      return { success: false, error }
    }
  }

  const feedFish = async (poolId: any): Promise<any> => {
    try {
      console.log(`Feeding fish in pool ${poolId}`)
      setFeedingInProgress(true)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/feed-fish`, { method: 'POST' })
      // const result = await response.json()

      // Simulate API call
      await new Promise((resolve: any) => setTimeout(resolve, 3000))
      setFeedingInProgress(false)
      alert("تم إطعام الأسماك بنجاح!")
      return { success: true }
    } catch (error: any) {
      console.error("Error feeding fish:", error)
      setFeedingInProgress(false)
      alert("فشل في إطعام الأسماك. حاول مرة أخرى.")
      return { success: false, error }
    }
  }

  const fetchBacteriaTests = async (poolId: any): Promise<any> => {
    try {
      console.log(`Fetching bacteria tests for pool ${poolId}`)
      // Replace with: const response = await fetch(`/api/pools/${poolId}/bacteria-tests`)
      // const data = await response.json()
      return bacteriaTestData.filter((test: any) => test.pool_id.toString() === poolId)
    } catch (error: any) {
      console.error("Error fetching bacteria tests:", error)
      return []
    }
  }

  const fetchFarmStats = async (): Promise<any> => {
    try {
      console.log("Fetching farm statistics")
      // Replace with: const response = await fetch('/api/farm/stats')
      // const data = await response.json()
      return farmStats
    } catch (error: any) {
      console.error("Error fetching farm stats:", error)
      return farmStats // Return default stats on error
    }
  }

  // Add these useEffect hooks after the state declarations
  useEffect(() => {
    // Load initial data when component mounts
    const loadInitialData = async (): Promise<any> => {
      try {
        const [poolData, recommendations, settings, bacteriaTests]: any = await Promise.all([
          fetchPoolData(selectedPool),
          fetchRecommendations(selectedPool),
          fetchPoolSettings(selectedPool),
          fetchBacteriaTests(selectedPool),
        ])
        // Update state with fetched data
        setSettings(settings)
        // You can add more state updates here as needed
      } catch (error: any) {
        console.error("Error loading initial data:", error)
      }
    }

    loadInitialData()
  }, []) // Run once on mount

  useEffect(() => {
    // Reload data when selected pool changes
    const loadPoolData = async (): Promise<any> => {
      try {
        const [poolData, recommendations, settings, bacteriaTests]: any = await Promise.all([
          fetchPoolData(selectedPool),
          fetchRecommendations(selectedPool),
          fetchPoolSettings(selectedPool),
          fetchBacteriaTests(selectedPool),
        ])
        setSettings(settings)
        // Update other relevant state here
      } catch (error: any) {
        console.error("Error loading pool data:", error)
      }
    }

    loadPoolData()
  }, [selectedPool]) // Run when selectedPool changes

  // Add this useEffect after the existing useEffects to restore sidebar selection
  useEffect(() => {
    // Check if there's a stored sidebar selection from navigation
    const storedSidebarItem: any = sessionStorage.getItem("selectedSidebarItem")
    if (storedSidebarItem) {
      setActiveSidebarItem(storedSidebarItem)
      sessionStorage.removeItem("selectedSidebarItem") // Clean up
    }
  }, [])

  const handleNavClick = (itemName: any, href: any): void => {
    setActiveNavItem(itemName)
    console.log(`Navigating to: ${href}`)
  }

  const handleSidebarClick = (itemName: any, href: any): void => {
    setActiveSidebarItem(itemName)
    console.log(`Navigating to: ${href}`)
    // Handle Profile navigation
    if (itemName === "Profile") {
      router.push("/profile")
    }
    // Other items are handled within the same page by updating activeSidebarItem
  }

  const handleProfileClick = (): void => {
    // Navigate to profile page
    router.push("/profile")
  }

  const handleLogout = (): void => {
    // Clear any stored user data
    localStorage.removeItem("aquatech_user")
    localStorage.removeItem("aquatech_basins")
    sessionStorage.clear()

    // Redirect to landing page
    router.push("/")
  }

  const getStatusColor = (status: any): any => {
    switch (status) {
      case "good":
        return "#38bdf8"
      case "warning":
        return "#fbbf24"
      case "danger":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getPriorityColor = (priority: any): any => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#fbbf24"
      case "low":
        return "#38bdf8"
      default:
        return "#6b7280"
    }
  }

  const getChartDataKey = (): any => {
    switch (selectedFilter) {
      case "ph":
        return "ph"
      case "temperature":
        return "temperature"
      case "chlorine":
        return "chlorine"
      default:
        return "overall"
    }
  }

  const getChartTitle = (): any => {
    switch (selectedFilter) {
      case "ph":
        return "مستوى الحموضة عبر الوقت"
      case "temperature":
        return "درجة الحرارة عبر الوقت"
      case "chlorine":
        return "مستوى الكلورين عبر الوقت"
      default:
        return "الصحة العامة للحوض"
    }
  }

  const getCurrentPoolName = (): any => {
    const pool: any = poolsData?.find((p: any) => p.pool_id.toString() === selectedPool)
    return pool ? `حوض ${pool.pool_id}` : "حوض"
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a202c" }}>
      {/* Main Layout with Fixed Sidebar - Full Height */}
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="w-64 shadow-lg flex flex-col" style={{ backgroundColor: "#2d3748" }}>
          {/* Sidebar Header */}
          <div
            className="p-6 border-b"
            style={{
              backgroundColor: "#1a202c",
              borderBottomColor: "#4a5568",
            }}
          >
            <h1 className="text-xl font-bold text-white">آكوا تيك مونيتور</h1>
            <p className="text-sm text-gray-400 mt-1">نظام إدارة المزرعة</p>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 py-4">
            <nav className="space-y-2 px-4">
              {sidebarItems.map((item: any) => {
                const IconComponent: any = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name, item.href)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeSidebarItem === item.name ? "text-white shadow-md" : "text-gray-300 hover:text-white"
                    }`}
                    style={{
                      backgroundColor: activeSidebarItem === item.name ? "#38bdf8" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (activeSidebarItem !== item.name) {
                        e.currentTarget.style.backgroundColor = "#4a5568"
                        e.currentTarget.style.color = "white"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSidebarItem !== item.name) {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = "#d1d5db"
                      }
                    }}
                  >
                    <IconComponent className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Profile Section at Bottom */}
          <div
            className="p-4 border-t"
            style={{
              borderTopColor: "#4a5568",
            }}
          >
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start p-3 hover:bg-gray-600 rounded-lg transition-colors mb-2"
              onClick={handleProfileClick}
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                <AvatarFallback style={{ backgroundColor: "#38bdf8", color: "white" }}>
                  {userProfile.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-white">{userProfile.name}</p>
                <p className="text-xs text-gray-400">{userProfile.email}</p>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full flex items-center justify-start p-3 hover:bg-red-600 rounded-lg transition-colors text-red-400 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="text-sm font-medium">تسجيل الخروج</span>
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: "#1a202c" }}>
          {/* General Dashboard Page */}
          {activeSidebarItem === "لوحة القيادة" && (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4 text-white">لوحة قيادة مزرعة آكوا تيك</h1>
                <p className="text-gray-300 mb-6">نظرة عامة على عملية الاستزراع المائي بالكامل</p>
              </div>

              {/* Farm Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">إجمالي الأحواض</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-sky-400">{farmStats.totalPools}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                          style={{ backgroundColor: "#38bdf820", color: "#38bdf8" }}
                        >
                          Active: {farmStats.activePools}
                        </Badge>
                      </div>
                      <Droplets className="h-8 w-8 opacity-60 text-sky-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">متوسط الصحة</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-sky-400">{farmStats.averageHealth}</span>
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                          style={{ backgroundColor: "#38bdf820", color: "#38bdf8" }}
                        >
                          ممتاز
                        </Badge>
                      </div>
                      <Heart className="h-8 w-8 opacity-60 text-sky-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">إجمالي الأسماك</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-sky-400">
                            {farmStats.totalFish.toLocaleString()}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                          style={{ backgroundColor: "#38bdf820", color: "#38bdf8" }}
                        >
                          سليم
                        </Badge>
                      </div>
                      <Fish className="h-8 w-8 opacity-60 text-sky-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">التنبيهات الحرجة</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-sky-400">{farmStats.criticalAlerts}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                          style={{ backgroundColor: "#fbbf2420", color: "#fbbf24" }}
                        >
                          انتباه
                        </Badge>
                      </div>
                      <AlertTriangle className="h-8 w-8 opacity-60 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farm Overview Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">متوسط درجة الحرارة عبر الأحواض</CardTitle>
                    <CardDescription className="text-gray-400">
                      الحالي: {farmStats.averageTemperature}°ف
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: {
                          label: "درجة الحرارة",
                          color: "#38bdf8",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartDataFromDB}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                          <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                          <YAxis stroke="#9ca3af" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            dot={{ fill: "#38bdf8", strokeWidth: 2, r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">متوسط مستويات الحموضة</CardTitle>
                    <CardDescription className="text-gray-400">الحالي: {farmStats.averagePH}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: {
                          label: "مستوى الحموضة",
                          color: "#38bdf8",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartDataFromDB}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                          <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                          <YAxis stroke="#9ca3af" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="ph"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            dot={{ fill: "#38bdf8", strokeWidth: 2, r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Pool Status Overview */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">نظرة عامة على حالة الأحواض</CardTitle>
                  <CardDescription className="text-gray-400">الحالة الحالية لجميع الأحواض في مزرعتك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {poolsData?.map((pool: any) => (
                      <div
                        key={pool.pool_id}
                        className="p-4 border border-gray-600 rounded-lg hover:shadow-md transition-shadow bg-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">حوض {pool.pool_id}</h3>
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: "#38bdf820",
                              color: "#38bdf8",
                            }}
                          >
                            نشط
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">الأسماك: {pool.number_of_fish}</p>
                        <p className="text-sm text-gray-400">السعة: {pool.capacity_liters}لتر</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pools Dashboard Page */}
          {activeSidebarItem === "إدارة الأحواض" && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white">لوحة قيادة {getCurrentPoolName()}</h1>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => changeWater(selectedPool)}
                      disabled={waterChangeInProgress}
                      className="flex items-center space-x-2"
                      style={{ backgroundColor: "#38bdf8", color: "white" }}
                    >
                      {waterChangeInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>جاري التغيير...</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-4 w-4" />
                          <span>تغيير الماء</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => feedFish(selectedPool)}
                      disabled={feedingInProgress}
                      className="flex items-center space-x-2"
                      style={{ backgroundColor: "#38bdf8", color: "white" }}
                    >
                      {feedingInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>جاري الإطعام...</span>
                        </>
                      ) : (
                        <>
                          <Fish className="h-4 w-4" />
                          <span>إطعام الأسماك</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">اختر الحوض:</label>
                    <SearchableSelect
                      value={selectedPool}
                      onValueChange={setSelectedPool}
                      options={poolOptions}
                      placeholder="اختر حوض..."
                      searchPlaceholder="البحث عن الأحواض..."
                      className="w-64"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">إظهار المعيار:</label>
                    <SearchableSelect
                      value={selectedFilter}
                      onValueChange={setSelectedFilter}
                      options={filterOptions}
                      placeholder="اختر معيار..."
                      searchPlaceholder="البحث عن المعايير..."
                      className="w-48"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">المدى الزمني:</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1h</SelectItem>
                        <SelectItem value="6h">6h</SelectItem>
                        <SelectItem value="24h">24h</SelectItem>
                        <SelectItem value="7d">7d</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pool Dashboard Content */}
              {selectedFilter === "all" ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {dashboardCardsData
                      .filter((card: any) => card.pool_id.toString() === selectedPool)
                      .map((card: any) => {
                        const IconComponent: any = card.icon
                        return (
                          <Card
                            key={card.id}
                            className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium text-gray-400 mb-1">{card.title}</p>
                                  <div className="flex items-baseline space-x-1">
                                    <span className="text-lg font-bold text-sky-400">{card.value}</span>
                                    <span className="text-xs text-gray-500">{card.unit}</span>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="mt-1 text-xs"
                                    style={{
                                      backgroundColor: getStatusColor(card.status) + "20",
                                      color: getStatusColor(card.status),
                                    }}
                                  >
                                    {card.status}
                                  </Badge>
                                </div>
                                <IconComponent className="h-8 w-8 opacity-60 text-sky-400" />
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">الصحة العامة للحوض</CardTitle>
                      <CardDescription className="text-gray-400">
                        عرض بيانات الصحة العامة لآخر {timeRange} لـ {getCurrentPoolName()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: "نقاط الصحة",
                            color: "#38bdf8",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartDataFromDB}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="overall"
                              stroke="#38bdf8"
                              strokeWidth={2}
                              dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: "#38bdf8", strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    {(() => {
                      const selectedCard: any = dashboardCardsData
                        .filter((card: any) => card.pool_id.toString() === selectedPool)
                        .find((card: any) => card.parameter === selectedFilter)
                      if (!selectedCard) return null
                      const IconComponent: any = selectedCard.icon
                      return (
                        <Card className="max-w-md mx-auto hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-400 mb-2">{selectedCard.title}</p>
                                <div className="flex items-baseline space-x-2">
                                  <span className="text-3xl font-bold text-sky-400">{selectedCard.value}</span>
                                  <span className="text-lg text-gray-500">{selectedCard.unit}</span>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="mt-2"
                                  style={{
                                    backgroundColor: getStatusColor(selectedCard.status) + "20",
                                    color: getStatusColor(selectedCard.status),
                                  }}
                                >
                                  {selectedCard.status}
                                </Badge>
                              </div>
                              <IconComponent className="h-12 w-12 opacity-60 text-sky-400" />
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })()}
                  </div>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">{getChartTitle()}</CardTitle>
                      <CardDescription className="text-gray-400">
                        عرض بيانات {selectedFilter} لآخر {timeRange} لـ {getCurrentPoolName()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: selectedFilter === "ph" ? "pH Level" : selectedFilter,
                            color: "#38bdf8",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartDataFromDB}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey={getChartDataKey()}
                              stroke="#38bdf8"
                              strokeWidth={2}
                              dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: "#38bdf8", strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          {/* History Page */}
          {activeSidebarItem === "التاريخ" && (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 text-white">تاريخ الحوض</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">اختر الحوض:</label>
                    <SearchableSelect
                      value={selectedPool}
                      onValueChange={setSelectedPool}
                      options={poolOptions}
                      placeholder="اختر حوض..."
                      searchPlaceholder="البحث عن الأحواض..."
                      className="w-64"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">إظهار البيانات:</label>
                    <SearchableSelect
                      value={selectedFilter}
                      onValueChange={setSelectedFilter}
                      options={filterOptions}
                      placeholder="اختر معيار..."
                      searchPlaceholder="البحث عن المعايير..."
                      className="w-48"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">تجميع حسب:</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">ساعات</SelectItem>
                        <SelectItem value="days">أيام</SelectItem>
                        <SelectItem value="weeks">أسابيع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Card className="mb-8 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">البيانات التاريخية - {getCurrentPoolName()}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {selectedFilter === "all" ? "جميع القياسات" : `قياسات ${selectedFilter}`} مجمعة حسب{" "}
                    {timeRange}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr style={{ backgroundColor: "#2d3748" }}>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">التاريخ/الوقت</th>
                          {selectedFilter === "all" ? (
                            <>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">مستوى الحموضة</th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">
                                درجة الحرارة (°ف)
                              </th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">الكلورين (جزء في المليون)</th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">الملوحة (جزء في الألف)</th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">حالة الأسماك</th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">الحالة</th>
                            </>
                          ) : (
                            <>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">
                                {cardFilters.find((f: any) => f.id === selectedFilter)?.name || "القيمة"}
                              </th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-white">الحالة</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {historicalData
                          .filter((record: any) => record.pool_id.toString() === selectedPool)
                          .slice(0, 20)
                          .map((record: any, i: any) => (
                            <tr key={record.id} className={i % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}>
                              <td className="border border-gray-600 px-4 py-2 text-gray-300">
                                {new Date(record.created_at).toLocaleString()}
                              </td>
                              {selectedFilter === "all" ? (
                                <>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">{record.ph}</td>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">
                                    {record.temperature}
                                  </td>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">{record.chlorine}</td>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">{record.salinity}</td>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">
                                    {record.fish_state}
                                  </td>
                                  <td className="border border-gray-600 px-4 py-2">
                                    <Badge
                                      variant="secondary"
                                      style={{
                                        backgroundColor: "#38bdf820",
                                        color: "#38bdf8",
                                      }}
                                    >
                                      {record.overall_status}
                                    </Badge>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="border border-gray-600 px-4 py-2 text-gray-300">
                                    {(record as any)[selectedFilter as keyof typeof record] || "N/A"}
                                  </td>
                                  <td className="border border-gray-600 px-4 py-2">
                                    <Badge
                                      variant="secondary"
                                      style={{
                                        backgroundColor: "#38bdf820",
                                        color: "#38bdf8",
                                      }}
                                    >
                                      {record.overall_status}
                                    </Badge>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedFilter === "all" ? "الاتجاهات العامة" : `اتجاه ${selectedFilter}`}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    تحليل الاتجاه التاريخي مجمع حسب {timeRange}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: selectedFilter === "all" ? "الصحة العامة" : selectedFilter,
                        color: "#38bdf8",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartDataFromDB}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey={getChartDataKey()}
                          stroke="#38bdf8"
                          strokeWidth={2}
                          dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#38bdf8", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recommendations Page */}
          {activeSidebarItem === "التوصيات" && (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 text-white">توصيات الحوض</h1>
                <div className="flex items-center space-x-2 mb-6">
                  <label className="text-sm font-medium text-gray-300">اختر الحوض:</label>
                  <SearchableSelect
                    value={selectedPool}
                    onValueChange={setSelectedPool}
                    options={poolOptions}
                    placeholder="اختر حوض..."
                    searchPlaceholder="البحث عن الأحواض..."
                    className="w-64"
                  />
                </div>
              </div>

              {/* Important Recommendations First */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-red-400">🚨 مسائل مهمة</h2>
                <div className="space-y-4">
                  {recommendationsData
                    .filter((rec: any) => rec.pool_id.toString() === selectedPool && rec.priority === "high")
                    .map((recommendation: any) => (
                      <Card
                        key={recommendation.id}
                        className="border-l-4 bg-gray-800 border-gray-700"
                        style={{ borderLeftColor: getPriorityColor(recommendation.priority) }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle
                                  className="h-5 w-5"
                                  style={{ color: getPriorityColor(recommendation.priority) }}
                                />
                                <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
                                <Badge
                                  variant="secondary"
                                  style={{
                                    backgroundColor: getPriorityColor(recommendation.priority) + "20",
                                    color: getPriorityColor(recommendation.priority),
                                  }}
                                >
                                  {recommendation.priority.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-gray-400 mb-3">{recommendation.description}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-300">Current Value:</span>
                                  <p style={{ color: getPriorityColor(recommendation.priority) }}>
                                    {recommendation.current_value || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-300">Recommended:</span>
                                  <p className="text-sky-400">{recommendation.recommended_value}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-300">Action:</span>
                                  <p className="text-gray-400">{recommendation.action}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Other Recommendations */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-300">📋 التوصيات العامة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendationsData
                    .filter((rec: any) => rec.pool_id.toString() === selectedPool && rec.priority !== "high")
                    .slice(0, 5)
                    .map((recommendation: any) => (
                      <Card
                        key={recommendation.id}
                        className="hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {recommendation.priority === "medium" ? (
                                <AlertTriangle
                                  className="h-5 w-5"
                                  style={{ color: getPriorityColor(recommendation.priority) }}
                                />
                              ) : (
                                <CheckCircle
                                  className="h-5 w-5"
                                  style={{ color: getPriorityColor(recommendation.priority) }}
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-white">{recommendation.title}</h3>
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                  style={{
                                    backgroundColor: getPriorityColor(recommendation.priority) + "20",
                                    color: getPriorityColor(recommendation.priority),
                                  }}
                                >
                                  {recommendation.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{recommendation.description}</p>
                              <p className="text-xs text-gray-500">{recommendation.action}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Bacteria Testing Page */}
          {activeSidebarItem === "فحص البكتيريا" && (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 text-white">فحص البكتيريا</h1>
                <div className="flex items-center space-x-2 mb-6">
                  <label className="text-sm font-medium text-gray-300">اختر الحوض:</label>
                  <SearchableSelect
                    value={selectedPool}
                    onValueChange={setSelectedPool}
                    options={poolOptions}
                    placeholder="اختر حوض..."
                    searchPlaceholder="البحث عن الأحواض..."
                    className="w-64"
                  />
                </div>
              </div>

              {/* Test Control */}
              <Card className="mb-8 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">بدء فحص جديد</CardTitle>
                  <CardDescription className="text-gray-400">
                    تشغيل فحص الكشف عن البكتيريا لـ {getCurrentPoolName()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => startBacteriaTest(selectedPool)}
                      disabled={bacteriaTestInProgress}
                      className="flex items-center space-x-2"
                      style={{ backgroundColor: "#38bdf8", color: "white" }}
                    >
                      {bacteriaTestInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>فحص قيد التقدم...</span>
                        </>
                      ) : (
                        <>
                          <Microscope className="h-4 w-4" />
                          <span>بدء فحص البكتيريا</span>
                        </>
                      )}
                    </Button>
                    {bacteriaTestInProgress && (
                      <div className="text-sm text-gray-400">
                        الأجهزة تحلل عينة الماء. قد يستغرق هذا بضع دقائق...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">نتائج الفحص الأخيرة</CardTitle>
                  <CardDescription className="text-gray-400">
                    أحدث نتائج فحص البكتيريا لـ {getCurrentPoolName()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bacteriaTestData
                      .filter((test: any) => test.pool_id.toString() === selectedPool)
                      .map((test: any) => (
                        <div
                          key={test.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-600"
                          style={{
                            backgroundColor: test.test_result === "negative" ? "#38bdf810" : "#ef444410",
                            borderColor: test.test_result === "negative" ? "#38bdf8" : "#ef4444",
                          }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {test.test_result === "negative" ? (
                                <CheckCircle className="h-8 w-8 text-green-500" />
                              ) : test.test_result === "positive" ? (
                                <XCircle className="h-8 w-8 text-red-500" />
                              ) : (
                                <RefreshCw className="h-8 w-8 text-yellow-500 animate-spin" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">
                                {test.test_type.replace("_", " ").toUpperCase()} Test
                              </h3>
                              <p className="text-sm text-gray-400">
                                Tested on {new Date(test.tested_at).toLocaleString()}
                              </p>
                              {test.test_result === "positive" && (
                                <p className="text-sm text-red-400">Bacteria count: {test.bacteria_count} CFU/ml</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="secondary"
                              className="text-sm"
                              style={{
                                backgroundColor: test.test_result === "negative" ? "#38bdf820" : "#ef444420",
                                color: test.test_result === "negative" ? "#38bdf8" : "#ef4444",
                              }}
                            >
                              {test.test_result.toUpperCase()}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">Status: {test.status}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Page */}
          {activeSidebarItem === "Settings" && (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 text-white">Pool Settings</h1>
                <div className="flex items-center space-x-2 mb-6">
                  <label className="text-sm font-medium text-gray-300">Select Pool:</label>
                  <SearchableSelect
                    value={selectedPool}
                    onValueChange={setSelectedPool}
                    options={poolOptions}
                    placeholder="Select a pool..."
                    searchPlaceholder="Search pools..."
                    className="w-64"
                  />
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Parameter Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure optimal ranges for {getCurrentPoolName()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {settings
                      .filter((setting: any) => setting.pool_id.toString() === selectedPool)
                      .map((setting: any) => (
                        <div
                          key={setting.id}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-600 rounded-lg bg-gray-700"
                        >
                          <div>
                            <Label className="text-sm font-medium text-gray-300">Parameter</Label>
                            <p className="text-lg font-semibold text-white">
                              {setting.parameter.replace("_", " ").toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <Label htmlFor={`min-${setting.id}`} className="text-sm font-medium text-gray-300">
                              Min Value {setting.unit}
                            </Label>
                            <Input
                              id={`min-${setting.id}`}
                              type="number"
                              value={setting.min_value}
                              onChange={(e: any) => {
                                const updatedSettings: any = settings.map((s: any) =>
                                  s.id === setting.id ? { ...s, min_value: Number.parseFloat(e.target.value) } : s,
                                )
                                setSettings(updatedSettings)
                              }}
                              className="mt-1 bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`max-${setting.id}`} className="text-sm font-medium text-gray-300">
                              Max Value {setting.unit}
                            </Label>
                            <Input
                              id={`max-${setting.id}`}
                              type="number"
                              value={setting.max_value}
                              onChange={(e: any) => {
                                const updatedSettings: any = settings.map((s: any) =>
                                  s.id === setting.id ? { ...s, max_value: Number.parseFloat(e.target.value) } : s,
                                )
                                setSettings(updatedSettings)
                              }}
                              className="mt-1 bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`target-${setting.id}`} className="text-sm font-medium text-gray-300">
                              Target Value {setting.unit}
                            </Label>
                            <Input
                              id={`target-${setting.id}`}
                              type="number"
                              value={setting.target_value}
                              onChange={(e: any) => {
                                const updatedSettings: any = settings.map((s: any) =>
                                  s.id === setting.id ? { ...s, target_value: Number.parseFloat(e.target.value) } : s,
                                )
                                setSettings(updatedSettings)
                              }}
                              className="mt-1 bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                        </div>
                      ))}
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setSettings(poolSettingsData)}
                        className="border-gray-500 text-gray-300 hover:bg-gray-700"
                      >
                        Reset to Default
                      </Button>
                      <Button
                        onClick={() => updatePoolSettings(selectedPool, settings)}
                        disabled={isLoading}
                        className="flex items-center space-x-2"
                        style={{ backgroundColor: "#38bdf8", color: "white" }}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>جاري الحفظ...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            <span>حفظ الإعدادات</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
