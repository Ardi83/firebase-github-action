import React, { useState, useEffect } from 'react';
import PivotTableUI from 'react-pivottable-ardi/PivotTableUI';
import 'react-pivottable-ardi/pivottable.css';
import {findByDisplayValue} from "@testing-library/react";


function App() {
  const data = [
    { name: "Cristian", city: "Uppsala", salary: 2000 },
    { name: "Arseshir", city: "Uppsala", salary: 2500 },
    { name: "Neils", city: "Arrhus", salary: 2500 },
    { name: "Arshia", city: "MAshhad", salary: 1000 },
    { name: "Erik", city: "Uppsala", salary: 3000 }
  ];
  const [state, setState] = useState(data)
  const [users, setUsers] = useState([])

  useEffect(() => {
      fetch('https://githubaction-cicd-default-rtdb.europe-west1.firebasedatabase.app/users.json')
          .then(res => res.json())
          .then(data => setUsers(Object.values(data)))
  }, [])


  return (
    <>
      <div className="App">
          <PivotTableUI
            initialSelectedKey={""}
            data={data}
            onChange={(s) => {
              setState(s);
            }}
            {...state}
          />
      </div>
    <div>
        {users.length && (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        )}
    </div>
    </>

  );
}

export default App;
