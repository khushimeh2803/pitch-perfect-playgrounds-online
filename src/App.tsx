
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/Home";
import Sports from "./pages/Sports";
import Grounds from "./pages/Grounds";
import GroundDetail from "./pages/GroundDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
import Membership from "./pages/Membership";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminGrounds from "./pages/admin/Grounds";
import AdminBookings from "./pages/admin/Bookings";
import AdminReports from "./pages/admin/Reports";

// Not Found Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="sports" element={<Sports />} />
              <Route path="grounds" element={<Grounds />} />
              <Route path="grounds/:id" element={<GroundDetail />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="membership" element={<Membership />} />
              <Route path="payment" element={<Payment />} />
              <Route path="bookings" element={<MyBookings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="grounds" element={<AdminGrounds />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
