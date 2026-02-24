import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFindOneCategory } from '../../hooks/category/useFindOneCategory'
import { useUpdateCategory } from '../../hooks/category/useUpdateCategory'

function EditCategory() {
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const {doc} = useFindOneCategory(id)
    const {isLoading: isUpdating, updateCategory} = useUpdateCategory()

    const handleSubmit = async (e) => {
          e.preventDefault()
          await updateCategory(id, {name, note})
          navigate('/category')
    }

    useEffect(() => {
      if (doc) {
          setName(doc.name || '');
          setNote(doc.note || ''); // Assuming doc might have a note field
      }
  }, [doc]);

  
    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">កែប្រែប្រភេទទំនិញថ្មី</h1>
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
              <button disabled={isUpdating} type="submit" className="btn btn-sm btn-success text-white">
                កែប្រែ
              </button>
            </div>
          </form>
        </div>
      </>
    );
}

export default EditCategory