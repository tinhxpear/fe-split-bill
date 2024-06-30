import {BillType } from "../types/type"

type Props = {
    bill: BillType;
    onSelect: (bill : BillType) => void;
    selectedBill: BillType | undefined;
    onDeleteBill: (id: string) => void;
}
const Bill = ({bill, onSelect, selectedBill, onDeleteBill} : Props) => {
    const isSelected = selectedBill?.id === bill.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
        <img src={bill.image} alt={bill.name} />
        <h3>{bill.name}</h3>

        {bill.balance < 0 
            && <p className="red">You owe {bill.name} {Math.abs(bill.balance)}</p>}
        {bill.balance > 0 
            && <p className="green">{bill.name} owe  you {bill.balance}</p>}
        {bill.balance === 0 
            && <p>You and {bill.name} are even</p>}
        
        <button 
            className="bg-red-500 text-white rounded-lg py-3 px-5 mb-3 font-bold"
            onClick={() => onDeleteBill(bill.id)}
        >
            
                Delete
        </button>
        <button 
            onClick={() => onSelect(bill)} 
            className="bg-orange-400 text-white rounded-lg py-3 px-5 font-bold"> 
            {isSelected ? 'Close' : 'Select'}
        </button>
    </li>
  )
}

export default Bill