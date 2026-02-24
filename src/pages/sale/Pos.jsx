import { useState, useEffect } from "react";
import { useFindProductByCategory } from "../../hooks/product/useFindProductByCategory";
import { useFindAllCategory } from "../../hooks/category/useFindAllCategory";
import toast from "react-hot-toast";
import { useCreateSale } from "../../hooks/sale/useCreateSale";
// import { CiTrash } from "react-icons/ci";

function Pos() {
  const [categoryID, setCategoryID] = useState("");
  const { docs: products } = useFindProductByCategory(categoryID);
  const { docs: categories } = useFindAllCategory(1, 500);
  const [totalAmount, setTotalAmount] = useState(0);
  const [carts, setCarts] = useState([]);
  const {isLoading: isSaleCreating, createSale} = useCreateSale()
  // Calculate totalAmount when carts update
  useEffect(() => {
    const total = carts.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);
    setTotalAmount(total);
  }, [carts]);

  const handleAddToCart = (item) => {
    const findIfExist = carts?.find(it => it.productId === item?._id);

    if (findIfExist) {
      toast.error("អ្នកមិនអាចបន្ថែមទំនិញដូចគ្នាបានទេ!🫡");
      return;
    }

    const doc = {
      productId: item._id,
      productName: item.name,
      unitPrice: item.salePrice,
      quantity: 1,
      totalPrice: 1 * item.salePrice,
    };

    setCarts(carts.concat([doc])); // Adds to cart without using the spread operator
  };

  const handleIncrementQty = (id) => {
    const updatedItems = carts.map(item => {
      if (item.productId === id) {
        item.quantity += 1;
        item.totalPrice = (item.quantity * item.unitPrice * 1);
      }
      return item;
    });
    setCarts(updatedItems);
  };

  const handleDecrementQty = (id) => {
    const updatedItems = carts.map(item => {
      if (item.productId === id && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = (item.quantity * item.unitPrice * 1);
      }
      return item;
    });
    setCarts(updatedItems);
  };

  const clearCart = () => {
      setCarts([])
  }

  const handlePayment = async () => {
      // carts.forEach(product => {
      //   delete product.productName;
      // });

      let doc = {
          items: carts,
          totalAmount
      }
      const res = await createSale(doc)
      
      if(res){
        window.open(`${window.location.origin}/invoice/${res.data._id}`, '_blank')
        clearCart()
        window.location.reload()
      }
      // console.log({items: carts, totalAmount: totalAmount})
  }
  
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">ផ្ទាំងការលក់</h1>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-4">
        <div className="col-span-12 md:col-span-8">
          <div className="mb-3 bg-white p-3 shadow-sm rounded-lg">
            <h1 className="font-semibold mb-3 text-lg">ប្រភេទទំនិញ</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCategoryID("")}
                className={`${categoryID === "" && "btn-success text-white"} btn btn-sm rounded-full`}
              >
                ទាំងអស់
              </button>
              {categories?.map((item) => (
                <button
                  onClick={() => setCategoryID(item._id)}
                  key={item._id}
                  className={`${categoryID === item._id && "btn-success text-white"} btn btn-sm rounded-full border border-gray-200`}
                >
                  {item?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((item) => (
              <div
                onClick={() => handleAddToCart(item)}
                key={item._id}
                className="bg-white overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-gray-200 p-3 rounded-lg"
              >
                <div className="h-[200px]">
                  <img
                    src={`http://localhost:8001/${item.imageURL}`}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-1">
                  <h1 className="text-center line-clamp-1">{item.name} <span className="text-red-500 text-xs">x{item.stockQty}</span> </h1>
                  <h1 className="text-center font-medium text-red-500">
                    ${(item.salePrice).toFixed(2)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="h-auto p-3 bg-white shadow-sm rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h1 className="font-semibold mb-3 text-lg">ទំនិញកម្មង់</h1>
              <button onClick={clearCart} className="text-red-500">ជម្រះ</button>
            </div>

            <div className="space-y-4">
              {carts?.length > 0 &&
                carts.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 p-1 border-b border-gray-100">
                    <h1 className="text-left line-clamp-1">{item.productName}</h1>
                    <div className="flex items-center justify-center p-0.5 space-x-2">
                      <button disabled={item.qty === 1} onClick={() => handleDecrementQty(item.productId)} className="btn btn-xs">-</button>
                      <button className="px-1">{item.quantity}</button>
                      <button onClick={() => handleIncrementQty(item.productId)} className="btn btn-xs">+</button>
                    </div>
                    <div className="font-medium text-red-500 text-right">${item?.totalPrice.toFixed(2)}</div>
                  </div>
                ))}

                {carts.length <= 0 && (
                    <div className="text-center py-4 text-gray-400">មិនមានទំនិញ</div>
                )}

              <div className="flex justify-between items-center mt-4">
                <p>ចំនួនសរុប</p>
                <p className="font-medium text-red-500">${totalAmount.toFixed(2)}</p>
              </div>

              <div>
                <button onClick={handlePayment} disabled={isSaleCreating} className="btn btn-sm btn-success text-white w-full">
                  ធ្វើការទិញ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pos;
