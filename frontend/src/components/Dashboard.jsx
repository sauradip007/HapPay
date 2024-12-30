import {React, useState, useEffect} from 'react'
import Appbar from './Appbar';
import Balance from './Balance';
import Users from './Users';
import axios from 'axios';
function Dashboard() {
    const [balance, setBalance] = useState(0)
    useEffect(()=> {

        axios
          .get("http://localhost:3000/api/v1/account/balance", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tokenin"),
            },
          })
          .then((response) => {
            setBalance(response.data.balance);
          });

    }, [])

const username = localStorage.getItem("username");
  return (
    <div>
      <Appbar username={username} />
      <Balance balance={balance} />
      <Users/>
    </div>
  );
}

export default Dashboard