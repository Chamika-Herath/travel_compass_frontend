import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import "../styles/AdminDashboard.css";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    guides: 0,
    hotelOwners: 0,
    vehicleProviders: 0,
    regularUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all users
        const usersResponse = await fetch('http://localhost:8081/api/users/all');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        
        // Fetch all guides
        const guidesResponse = await fetch('http://localhost:8081/api/guides/all');
        if (!guidesResponse.ok) throw new Error('Failed to fetch guides');
        const guidesData = await guidesResponse.json();
        
        // Fetch all hotel owners
        const hotelOwnersResponse = await fetch('http://localhost:8081/api/hotel-owners/all');
        if (!hotelOwnersResponse.ok) throw new Error('Failed to fetch hotel owners');
        const hotelOwnersData = await hotelOwnersResponse.json();
        
        // Fetch all vehicle providers
        const vehicleProvidersResponse = await fetch('http://localhost:8081/api/vehicle-providers/all');
        if (!vehicleProvidersResponse.ok) throw new Error('Failed to fetch vehicle providers');
        const vehicleProvidersData = await vehicleProvidersResponse.json();

        // Calculate regular users (users without any special role)
        const regularUsers = usersData.filter(user => 
          user.role !== 'ROLE_GUIDE' && 
          user.role !== 'ROLE_HOTEL_OWNER' && 
          user.role !== 'ROLE_VEHICLE_PROVIDER'
        ).length;

        setStats({
          totalUsers: usersData.length,
          guides: guidesData.length,
          hotelOwners: hotelOwnersData.length,
          vehicleProviders: vehicleProvidersData.length,
          regularUsers: regularUsers
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Data for pie chart
  const pieChartData = [
    { name: 'Guides', value: stats.guides },
    { name: 'Hotel Owners', value: stats.hotelOwners },
    { name: 'Vehicle Providers', value: stats.vehicleProviders },
    { name: 'Regular Users', value: stats.regularUsers }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-dashboard__content">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
        
        {error && <div className="admin-dashboard__error">{error}</div>}
        {loading ? (
          <div className="admin-dashboard__loading">Loading statistics...</div>
        ) : (
          <>
            <div className="admin-dashboard__stats">
              <div className="admin-dashboard__stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="admin-dashboard__stat-card">
                <h3>Guides</h3>
                <p>{stats.guides}</p>
              </div>
              <div className="admin-dashboard__stat-card">
                <h3>Hotel Owners</h3>
                <p>{stats.hotelOwners}</p>
              </div>
              <div className="admin-dashboard__stat-card">
                <h3>Vehicle Providers</h3>
                <p>{stats.vehicleProviders}</p>
              </div>
              <div className="admin-dashboard__stat-card">
                <h3>Regular Users</h3>
                <p>{stats.regularUsers}</p>
              </div>
            </div>

            <div className="admin-dashboard__chart-container">
              <h2>User Distribution</h2>
              <div className="admin-dashboard__pie-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
