import React from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";

const Landing = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("tokenin") !== null;
  const username = localStorage.getItem("username") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn && <Appbar username={username} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-20 pb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Welcome to HapPay
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The simplest way to manage and transfer money between friends and
            family
          </p>

          {!isLoggedIn && (
            <div className="space-x-4">
              <button
                onClick={() => navigate("/signin")}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-blue-500 px-8 py-3 rounded-lg font-medium border-2 border-blue-500 hover:bg-blue-50 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-500 text-2xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Transfers</h3>
            <p className="text-gray-600">
              Your transactions are protected with industry-standard security
              protocols
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-500 text-2xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Payments</h3>
            <p className="text-gray-600">
              Send and receive money instantly with just a few clicks
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-500 text-2xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
            <p className="text-gray-600">
              Keep track of your transactions with detailed history and
              analytics
            </p>
          </div>
        </div>

        <div className="text-center pb-20">

          {isLoggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Go to Dashboard
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Join our community today and experience hassle-free payments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
