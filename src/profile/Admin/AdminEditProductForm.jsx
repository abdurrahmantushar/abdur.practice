import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { editProducts } from "../../app.store/slice/adminslice";

export const EditProducts=()=>{
    const {state}=useLocation();
    const dispatch=useDispatch();
    const navigate= useNavigate();

    const [product , setProduct]=useState({
        title:'',
        price:'',
        category:'',
        stock:'',
        img: null,
        description:''
    })

    useEffect(()=>{
        if(state){
            setProduct({
                title:         state.title || '',
                price:         state.price||'',
                category:      state.category||'',
                stock:         state.stock||'',
                description:   state.description||'',
                img:           state.images && state.images.length > 0 ? state.images[0] : null,

            })
        }
    },[]);

    const handleChange=(event)=>{
        const {name,value,type,files}=event.target;
            if (type === 'file') {
        setProduct(prev => ({ ...prev, img: files[0] }));
    } else {
        setProduct(prev => ({ ...prev, [name]: value }))};
    
    }

    const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("price", product.price);
  formData.append("category", product.category);
  formData.append("stock", product.stock);
  formData.append("description", product.description);

  if (product.img instanceof File) {
    formData.append("img", product.img);
  }

  dispatch(editProducts({ id: state.id, product: formData }));
  navigate("/adminproduct");
};

    return(
        <form onSubmit={handleSubmit} >
            <input
                value={product.title}
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
            />
            <input
                value={product.price}
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleChange}
            />
            <input
                value={product.category}
                type="text"
                placeholder="Category"
                name="category"
                onChange={handleChange}
            />
            <input
                value={product.stock}
                type="number"
                placeholder="stock"
                name="stock"
                onChange={handleChange}
            />
            <input
                value={product.description}
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
            />
            <input
                
                type="file"
                accept="image/*"
                name="img"
                onChange={handleChange} />

            <button type="submit">Update Product</button>

        </form>
    )
}