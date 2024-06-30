import { BillType } from "../types/type";
import Bill from "./Bill";

type Props = {
    bills: BillType[] | undefined;
    onSelect: (bill : BillType) => void;
    selectedBill: BillType | undefined;
    onDeleteBill: (id: string) => void;
}
const BillList = ({bills, onSelect, selectedBill, onDeleteBill}: Props) => {
  
  return (
    <ul>{bills?.map((bill) => (
        <Bill  
          key={bill.id} 
          bill={bill} 
          onSelect={onSelect} 
          selectedBill={selectedBill}
          onDeleteBill={onDeleteBill}/>
    ))}</ul>
  )
}

export default BillList