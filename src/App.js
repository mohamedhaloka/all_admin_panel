import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Companies from './components/Companies';
import CompaniesTable from './components/CompaniesTable';
import Associations from './components/Associations';
import ContactUsMessages from './components/ContactUsMessages';
import ProtectedRoute from './components/ProtectedRoute';
import Coupons from './components/Coupons';
import CouponsTable from './components/CouponsTable';
import AssociationProducts from './components/AssociationProducts';
import Settings from './components/Settings';
import Categories from './components/Categories';
import CategoriesTable from './components/CategoriesTable';
import HomeProducts from './components/HomeProducts';
import AssociationsTable from './components/AssociationsTable';

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
          path="/categories-table"
          element={
            <ProtectedRoute>
              <CategoriesTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies-table"
          element={
            <ProtectedRoute>
              <CompaniesTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-company"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-company/:id"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/associations-table"
          element={
            <ProtectedRoute>
              <AssociationsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-association"
          element={
            <ProtectedRoute>
              <Associations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-association/:id"
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
          path="/add-category"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-category/:id"
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
          path="/coupons-table"
          element={
            <ProtectedRoute>
              <CouponsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-coupon"
          element={
            <ProtectedRoute>
              <Coupons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-coupon/:id"
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
