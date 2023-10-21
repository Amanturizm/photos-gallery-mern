import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './features/users/Signup';
import Login from './features/users/Login';
import Photos from './features/photos/Photos';
import PhotosUser from './features/photos/components/PhotosUser';
import PhotosForm from './features/photos/components/PhotosForm';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    <Route path="/" element={<Photos />} />
    <Route path="/photos" element={<Photos />} />
    <Route path="/photos/user/:id" element={<PhotosUser />} />
    {!isAuthenticated ? (
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </>
    ) : (
      <Route path="/new-photo" element={<PhotosForm />} />
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;
