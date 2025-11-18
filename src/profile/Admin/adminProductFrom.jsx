import { useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import { addProducts } from "../../app.store/slice/adminslice";


export const AddProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        img: null,
    })
    const handleChange = (event) => {
        const { name, value,type,files } = event.target;
        
    if (type === 'file') {
        setProduct(prev => ({ ...prev, img: files[0] }));
    } else {
        setProduct(prev => ({ ...prev, [name]: value }));
    };
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addProducts({ ...product, id: nanoid() }));
        setProduct({ title: '', price: '', category: '', description: '', img: null });
        navigate("/adminproduct");
    }
    return (
        <form onSubmit={handleSubmit} >
            <input
                required
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
            />
            <input
                required
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleChange}
            />
            <input
                required
                type="text"
                placeholder="Category"
                name="category"
                onChange={handleChange}
            />
            <input
                required
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
            />
            <input
                required
                type="text"
                placeholder="Stock"
                name="stock"
                onChange={handleChange}
            />
            <input
                
                type="text"
                accept="image/*"
                name="img"
                placeholder="img link"
                onChange={handleChange} />

            <button type="submit">Add New Product</button>

        </form>
    )
}