import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./admin.css";

export default function AddProduct() {
  const { setProduct, product } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    rating: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function createId() {
    let newId;
    const length = product.length;
    let currentId = product[length - 1].id;
    newId = currentId + 1;
    return newId;
  }

  function addDataToWebsite() {
    const { title, price, category } = formData;

    if (!title || !price || !category) {
      alert("Required fields are missing!");
      return;
    }

    const newProduct = {
      id: createId(),
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    setProduct((prev) => [...prev, newProduct]);

    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      rating: "",
      image: "",
    });
    setPreview("");
  }

  return (
    <div className="admin">
      <h1>Add Product</h1>

      <div className="admin-form">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1–5)"
        />

        <input type="file" name="image" onChange={handleChange} />

        {preview && <img src={preview} alt="preview" className="preview" />}

        <button onClick={addDataToWebsite}>Add Product</button>
      </div>
    </div>
  );
}
