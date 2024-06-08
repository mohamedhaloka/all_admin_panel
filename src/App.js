import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Companies from './components/Companies';
import Associations from './components/Associations';
import ContactUsMessages from './components/ContactUsMessages';
import ProtectedRoute from './components/ProtectedRoute';
import Coupons from './components/Coupons';
import AssociationProducts from './components/AssociationProducts';
import Settings from './components/Settings';
import Categories from './components/Categories';
import HomeProducts from './components/HomeProducts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/associations"
          element={
            <ProtectedRoute>
              <Associations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-products"
          element={
            <ProtectedRoute>
              <HomeProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/association-products"
          element={
            <ProtectedRoute>
              <AssociationProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coupons"
          element={
            <ProtectedRoute>
              <Coupons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-us-messages"
          element={
            <ProtectedRoute>
              <ContactUsMessages />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
