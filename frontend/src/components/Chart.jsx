
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appbar from "./Appbar";


import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username") || ""

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://happay-backend.onrender.com/api/v1/account/transactions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenin")}`,
            },
          }
        );

        const processedData = processTransactionData(response.data);
        setTransactions(processedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transaction history");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const processTransactionData = (rawData) => {

    // const jwtToken = localStorage.getItem('tokenin')
    // const decoded = jwt.verify(jwtToken, JWT_SECRET);
    const userId = localStorage.getItem("userid");

    // Add console.log to debug
    // console.log("Raw transactions:", rawData);
    // console.log("Current userId:", userId);

    const dailyData = rawData.reduce((acc, transaction) => {
      // Ensure timestamp is properly formatted
      const date = new Date(transaction.timestamp).toLocaleDateString();

      // Debug logging
    //   console.log("Processing transaction:", {
    //     date,
    //     fromUserId: transaction.fromUserId,
    //     toUserId: transaction.toUserId,
    //     amount: transaction.amount,
    //     userId: userId,
    //   });

      // Check if fromUserId/toUserId are objects (due to populate)
      const fromId = transaction.fromUserId._id || transaction.fromUserId;
      const toId = transaction.toUserId._id || transaction.toUserId;

      const amount =
        fromId === userId ? -transaction.amount : transaction.amount;

      if (!acc[date]) {
        acc[date] = {
          date,
          total: 0,
          sent: 0,
          received: 0,
        };
      }

      acc[date].total += amount;
      if (fromId === userId) {
        acc[date].sent += transaction.amount;
      } else {
        acc[date].received += transaction.amount;
      }

      return acc;
    }, {});

    return Object.values(dailyData);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );

  return (
    <div>
        <Appbar username={username} />
      <div className="space-y-8 p-6">
        {/* Balance History Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Balance History
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Track how your balance changes over time. Upward trends show more
            incoming payments, downward trends show more outgoing payments.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={transactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  name="Balance Change"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Volume Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Daily Transaction Volume
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Compare your daily sent and received amounts. Orange bars show money
            sent, green bars show money received.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={transactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" fill="#ff8042" name="Sent" />
                <Bar dataKey="received" fill="#82ca9d" name="Received" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;