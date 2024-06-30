import { SyntheticEvent, useState } from "react"
import { BillType } from "../types/type"

type Props = {
    onAddBill: (newBill: BillType) => void;
}
const FormAddBill = ({onAddBill} : Props) => {
    const [name, setName] = useState("")
    const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476")

    const handleSubmit = (e : SyntheticEvent ) => {
        e.preventDefault();
        if(!name || !image) return;
        const id = crypto.randomUUID()
        const newBill = {
            id: id,
            name, 
            image: `${image}?=${id}`, 
            balance: 0, 
        }
        onAddBill(newBill)
        setName('')
        setImage('https://i.pravatar.cc/48?u=499476')
    }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
        <label htmlFor="inputName">📛Friend name</label>
        <input id="inputName" type="text" value={name} onChange={e => setName(e.target.value)}/>

        <label htmlFor="inputImageUrl">📷Image URL</label>
        <input id="inputImageUrl" type="text" value={image} onChange={e => setImage(e.target.value)}/>

        <button 
          className="bg-orange-400 text-white rounded-lg py-3 px-5 mb-3 font-bold uppercase 
          text-center">
          Add
        </button>
    </form>
  )
}

export default FormAddBill