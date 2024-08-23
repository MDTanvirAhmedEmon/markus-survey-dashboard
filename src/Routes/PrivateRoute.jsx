import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token, isLoading } = useSelector((state) => state.auth);
  console.log(token)
  const location = useLocation();

  if (isLoading) {
    return (
    <div className=' h-screen flex items-center justify-center'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ECB206",
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>

    </div>
    );
  }

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
