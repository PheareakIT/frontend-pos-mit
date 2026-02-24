import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateCategory } from "../../hooks/category/useCreateCategory";

function CreateCategory() {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  const {isCreating, createCategory } = useCreateCategory()

  const handleSubmit = async (e) => {
        e.preventDefault()
        await createCategory({name, note}) 
        clearForm()
  }

  function clearForm(){
    setName('')
    setNote('')
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">បញ្ចូលប្រភេទទំនិញថ្មី</h1>
        {/* <button className="btn btn-sm">ថយក្រោយ</button> */}
      </div>

      <div className="max-w-lg bg-white p-3 rounded-lg mt-4 bg-slate">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="block">
              ឈ្មោះ
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input input-bordered w-full"
              placeholder="សូមបញ្ចូលឈ្មោះ"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="block">
              ពិណ៌នា
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="សរសេរពិណ៌នា"
            ></textarea>
          </div>

          <div className="flex justify-end items-center space-x-2">
            <Link to={`/category`} className="btn btn-sm">បោះបង់</Link>
            <button disabled={isCreating} type="submit" className="btn btn-sm btn-success text-white">
              រក្សាទុក
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCategory;
