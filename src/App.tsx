import { useEffect, useState } from "react";
import { BillType } from "./types/type";
import FormSplitBill from "./components/FormSplitBill";
import axios from 'axios';
import BillList from "./components/BillList";
import FormAddBill from "./components/FormAddBill";
function App() {

  const [bills, setBills] = useState<BillType[]>([])
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [selectedBill, setSelectedBill] = useState<BillType | undefined>();

  useEffect(() => {
    axios.get('http://localhost:8080/api/bill')
      .then(response => {
        setBills(response.data);
      })
      .catch(error => {
        throw new Error(error)
      });
  }, []);
  const handleShowFormAdd = ()  => {
    setIsShowFormAdd(!isShowFormAdd);
  }
  const handleDeleteBill = (id: string) => {
    axios.delete(`http://localhost:8080/api/bill/${id}`)
      .then(response => {
        setBills(bills.filter(bill => bill.id !== id));
        console.log(response);
      })
      .catch(error => {
        throw new Error(error)
      });
  }
  const handleSelectBill = (bill : BillType) => {
    setSelectedBill(selectedBill?.id === bill.id ? undefined :  bill)
  }
  const handleAddBill = (newBill : BillType) => {
    axios.post('http://localhost:8080/api/bill', newBill)
    .then(response => {
      setBills([...bills, newBill])
      console.log(response);
    })
    .catch(error => {
      throw new Error(error)
    });
    setIsShowFormAdd(false)
  }
  const handleSplitBill = (value : number) => {

    bills.map((bill) => bill.id === selectedBill?.id
    ? axios.put(`http://localhost:8080/api/bill/${bill.id}`, 
      {...bill, balance: bill.balance + value})
    : bill)
    setBills((bills) => 
      bills?.map(bill => bill.id === selectedBill?.id 
          ? {...bill, balance: bill.balance + value}
          : bill)) 
    setSelectedBill(undefined)
    alert('Split success')

  }
  return (
    <div className="app">
      <div className="sidebar">
        <BillList 
          bills={bills} 
          onSelect={handleSelectBill} 
          selectedBill={selectedBill}
          onDeleteBill={handleDeleteBill}/>
        {isShowFormAdd && <FormAddBill onAddBill={handleAddBill}/>}
        <button 
          className="text-xl uppercase bg-orange-400 text-white rounded-lg py-4 px-6 font-bold"
          onClick={handleShowFormAdd}>
            {isShowFormAdd ? 'Close' : 'Add Friend'}
        </button>
      </div>
      {selectedBill && <FormSplitBill selectedBill={selectedBill} onSplitBill={handleSplitBill}/>}
      
    </div>
  )
}

export default App
