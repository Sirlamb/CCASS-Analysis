import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const columns = [
  {
    name:'ParticipantID',
    selector: row => row.ParticipantID,
    sortable: true
  },
  {
    name:'Name',
    selector: row => row.Name,
    sortable: true
  },
  {
    name:'Start',
    selector: row => row.Start,
    sortable: true
  },
  {
    name:'StartDisplay',
    selector: row => row.StartDisplay,
    sortable: true
  },
  {
    name:'End',
    selector: row => row.End,
    sortable: true
  },
  {
    name:'EndDisplay',
    selector: row => row.EndDisplay,
    sortable: true
  },  
  {
    name:'Change',
    selector: row => row.Change,
    sortable: true
  },
  {
    name:'ChangePercent',
    selector: row => row.ChangePercent,
    sortable: true
  },
  {
    name:'ChangeDisplay',
    selector: row => row.ChangeDisplay,
    sortable: true
  }
];

// const data = [
//   { 
//     id: 1,
//     ParticipantID: 'C00019', 
//     Name: '香港上海匯豐銀行有限公司', 
//     Start: 3229324018, 
//     StartDisplay: '3,229,324,018 (35.23%)', 
//     End: 3232652020, 
//     EndDisplay: '3,232,652,020 (35.24%)', 
//     Change: 3328002, 
//     ChangePercent: 0.10305568538337984, 
//     ChangeDisplay: '3,328,002 (0.10%)'
//   },
//   { 
//     id:2,
//     ParticipantID: 'A00003', 
//     Name: '中國証券登記結算有限責任公司', 
//     Start: 532089780,
//     StartDisplay: '532,089,780 (5.80%)', 
//     End: 536142070, 
//     EndDisplay: '536,142,070 (5.84%)', 
//     Change: 4052290, 
//     ChangePercent: 0.7615801228131087, 
//     ChangeDisplay: '4,052,290 (0.76%)'
//   }
// ];




function App() {

  const [value, setValue] = useState('')

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/http://localhost:5000/search'
    ) 
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>
        <input name="search" value={value} onChange={(e)=>setValue(e.target.value)} />
        <DataTable
          columns={columns}
          data={data}
          // customStyles={customStyles}
        />
    </div>
  )
}


export default App;
