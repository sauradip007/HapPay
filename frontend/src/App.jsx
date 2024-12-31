// import {Dashboard, SendMoney, Signin, Signup, UpdateMoney, Landing, Chart } from "./components";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// function App() {
//   const isLoggedIn = !!localStorage.getItem("tokenin") || ; // Check if the user is logged in

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={<Navigate to={isLoggedIn ? "/landing" : "/signin"} />}
//           />
//           <Route path="/landing" element={<Landing />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signin" element={<Signin />} />
//           {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />}
//           />
//           <Route path="/send" element={<SendMoney />} />
//            <Route path="/update" element={isLoggedIn ? <UpdateMoney /> : <Navigate to="/signin" />} />
//           <Route path="/charts" element={isLoggedIn ? <Chart /> : <Navigate to="/signin" />} />
//           {/* <Route path="/update" element={<UpdateMoney />} />
//           <Route path="/charts" element={<Chart />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("tokenin")
  );

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/signin"} />}
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/signin"
          element={<Signin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <UpdateMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoute>
              <Chart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// In Signin.js, update state after login:
setIsLoggedIn(true);
localStorage.setItem("tokenin", token);
