import { SyntheticEvent, useState } from "react";
import { BillType } from "../types/type"

type Props = {
    selectedBill: BillType;
    onSplitBill: (value : number) => void
}
const FormSplitBill = ({selectedBill, onSplitBill} : Props) => {
    const [bill, setBill] = useState<number>(0);
    const [paidByUser, setPaidByUser] = useState<number>(0);
    const [whoIsPaying, setWhoIsPaying] = useState('user');

    const paidByFriend = bill ? bill - paidByUser : ''

    const handleSubmit = (e : SyntheticEvent) => {
        e.preventDefault()
        if(!bill || !paidByFriend) return ;
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    }
    return (
      <form className="form-split-bill" onSubmit={handleSubmit}>
          <h2>Split a bill with {selectedBill.name}</h2>
  
          <label htmlFor="inputBill">💵Bill Value</label>
          <input id="inputBill" 
            type="number" 
            onChange={e => setBill(Number(e.target.value))}/>
  
          <label htmlFor="inputYou">🤵Your expense</label>
          <input id="inputYou" 
            type="number" 
            value={paidByUser}
            onChange={e => setPaidByUser(Number(e.target.value) > bill ? paidByUser
            : Number(e.target.value))}/>
  
          <label htmlFor="inputFriend">👲{selectedBill.name}'s expense</label>
          <input id="inputYou" type="number" value={paidByFriend}  disabled/>
  
          <label htmlFor="">🍔Who is payingthe bill</label>
          <select name="" id="" value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
              <option value="user">You</option>
              <option value="friend">{selectedBill.name}</option>
          </select>
  
          <button 
            className="bg-orange-500 text-white rounded-lg py-3 px-5 mb-3 font-bold"
            onClick={() => {}}>
                Split bill
          </button>
      </form>
    )
  }
  
  export default FormSplitBill