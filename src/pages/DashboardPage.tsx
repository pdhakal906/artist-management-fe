import AdminDashboard from '../components/AdminDashboard';
import useAuthStore from '../features/store';

const DashboardPage = () => {
  const { user } = useAuthStore();

  const userRole = user?.role;


  if (userRole === 'super_admin') {
    return <AdminDashboard />;
  }
  else if (userRole === 'artist_manager') {
    return <AdminDashboard />;
  }
  else if (userRole === 'artist') {
    return <AdminDashboard />;
  }

}
export default DashboardPage
