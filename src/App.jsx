import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/category/Category";
import CreateCategory from "./pages/category/CreateCategory";
import EditCategory from "./pages/category/EditCategory";

import Product from "./pages/product/Product";
import CreateProduct from "./pages/product/CreateProduct";
import EditProduct from "./pages/product/EditProduct";
import Pos from "./pages/sale/Pos";
import ProtectedRoute from "./ui/ProtectedRoute";
import PublicRoute from "./ui/PublicRoute";
import Invoice from "./pages/Invoice";
import Sale from "./pages/sale/Sale";
import User from "./pages/user/User";
import { useUser } from "./hooks/auth/useUser";
import ChasierLayout from "./layouts/ChasierLayout";
import SaleReport from "./pages/report/SaleReport";
import StockReport from "./pages/report/StockReport";
import Unauthorize from "./pages/notfound/Unauthorize";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser"

function App() {
  const { user, isLoading } = useUser();
  if(!user && isLoading){
      return <>
            <div className="grid h-screen place-items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
      </>
  }

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          ></Route>

          <Route
            path="/invoice/:id"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          ></Route>

          { (user?.role === "admin" || user?.role === "super") && (
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RootLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />}></Route>

              <Route path="/category" element={<Category />}></Route>
              <Route
                path="/category/create"
                element={<CreateCategory />}
              ></Route>
              <Route
                path="/category/edit/:id"
                element={<EditCategory />}
              ></Route>

              <Route path="/product" element={<Product />}></Route>
              <Route path="/product/create" element={<CreateProduct />}></Route>
              <Route path="/product/edit/:id" element={<EditProduct />}></Route>

              <Route path="/sale/pos" element={<Pos />}></Route>
              <Route path="/sale" element={<Sale />}></Route>

              <Route path="/user" element={<User />}></Route>
              <Route path="/user/create" element={<CreateUser />}></Route>
              <Route path="/user/edit/:id" element={<EditUser />}></Route>


              <Route path="/report/sale" element={<SaleReport/>}></Route>
              <Route path="/report/stock" element={<StockReport/>}></Route>
              
            </Route>
          )}

          {user?.role === "cashier" && ( 
            <Route
              path="/cashier/sale/pos"
              element={
                <ProtectedRoute>
                  <ChasierLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Pos />}></Route>
            </Route>
          )}
         
          <Route path="*" element={ <Unauthorize/> }></Route>

        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 1000 },
          error: { duration: 5000 },
        }}
      />
    </>
  );
}

export default App;
