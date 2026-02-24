import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFindAllCategory } from "../../hooks/category/useFindAllCategory";
import toast from "react-hot-toast";
import { useFindOneProduct } from "../../hooks/product/useFindOneProduct";
import { useUpdateProduct } from "../../hooks/product/useUpdateProduct";

function EditProduct() {
  const {id} = useParams()
  const {isLoading: isUpdating, updateProduct} = useUpdateProduct()
  const {docs : categories, isLoading} = useFindAllCategory()
  const {doc: product} = useFindOneProduct(id)

  const [name, setName] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [costPrice, setCostPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
  const [stockQty, setStockQty] = useState(0)
  const [imageURL, setImageURL] = useState('')
  const [description, setDescription] = useState('')
  const MAX_FILE_SIZE = 5 * 1024 * 2024

  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0]
    if(selectedFile.size > MAX_FILE_SIZE){
        toast.error('ទំហំរូបភាពធំបំផុត 5MB')
    }else{
        setImageURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          name,
          categoryID, 
          costPrice,
          salePrice, 
          stockQty,
          imageURL,
          description
      }
        // if(!imageURL){
        //   delete data.imageURL
        // }

        const res = await updateProduct(id,data)
        if(res){
            clearForm()
        }
  }

  function clearForm(){
    setName('');
    setCostPrice(0); // Reset to 0, not ''
    setSalePrice(0); // Reset to 0, not ''
    setCategoryID('');
    setStockQty(0); // Reset to 0
    setImageURL('');
    setDescription('');
  }


  useEffect(() => {
    if(product){
        setName(product?.name)
        setCostPrice(product?.costPrice)
        setSalePrice(product?.salePrice)
        setStockQty(product?.stockQty)
        setCategoryID(product?.categoryID?._id)
        setImageURL('')
        setDescription(product?.description)
    }
  },[product])


  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">កែប្រែទំនិញ</h1>
        {/* <button className="btn btn-sm">ថយក្រោយ</button> */}
      </div>

      <div className="bg-white p-3 rounded-lg mt-4 max-w-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                    <div>
                            <label htmlFor="" className="block">ឈ្មោះទំនិញ*</label>
                            <input 
                                type="text" 
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input input-bordered w-full" 
                                placeholder="សូមបញ្ចូល" 
                            />
                    </div>

                    <div>
                            <label htmlFor="" className="block">ប្រភេទទំនិញ*</label>
                            <select 
                             onChange={(e) => setCategoryID(e.target.value)}
                             className="select select-bordered w-full" 
                             value={ categoryID || ''}
                            >
                                <option value="" disabled>សូមជ្រើសរើស</option>
                                {
                                    categories?.map(item => {
                                        return(
                                            <option key={item._id} value={item._id}>{item?.name}</option>
                                        )
                                    })

                                }
                            </select>
                    </div>

                    <div>
                            <label htmlFor="" className="block">តំលៃដើម*</label>
                            <input 
                                type="text"
                                value={costPrice || 0} 
                                onChange={(e) => setCostPrice(e.target.value)}
                                className="input input-bordered w-full" 
                                placeholder="0.00" />
                    </div>
                    <div>
                            <label htmlFor="" className="block">តំលៃលក់*</label>
                            <input 
                                onChange={(e) => setSalePrice(e.target.value)}
                                value={salePrice || 0}
                                type="number" 
                                className="input input-bordered w-full" placeholder="0.00" />
                    </div>
                    <div>
                            <label htmlFor="" className="block">ចំនួនស្តុក*</label>
                            <input 
                                onChange={(e) => setStockQty(e.target.value)}
                                value={stockQty || 0}
                                type="text" 
                                className="input input-bordered w-full" placeholder="សូមបញ្ចូល" />
                    </div>
                    <div>
                            <label htmlFor="" className="block">រូបភាព <span className="text-xs">(ទំហំរូបភាពធំបំផុត 5MB)</span> *</label>
                            <input onChange={handleFileChange} type="file" className="file-input file-input-bordered w-full" accept="image/*" />
                            
                    </div>

                    <div className="col-span-2">
                            <label htmlFor="" className="block">កត់សម្គាល់*</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="textarea textarea-bordered w-full" rows={3} placeholder="សូមបញ្ចូល"></textarea>
                    </div>

                    <div className="col-span-2 flex justify-end items-center space-x-2">
                            <Link to='/product' className="btn btn-sm">បោះបង់</Link>
                            <button type="submit" disabled={isUpdating} className="btn btn-sm btn-success text-white">រក្សាទុក</button>
                    </div>
            </form>
      </div>
    </>
  );
}

export default EditProduct;
