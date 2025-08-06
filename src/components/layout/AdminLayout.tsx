import { Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div>
      <h1>This is AdminLayout component</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
