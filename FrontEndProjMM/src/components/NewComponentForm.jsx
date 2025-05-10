import { useState } from "react"
import { Alert, Button } from "react-bootstrap"

const NewComponentForm = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  })

  const validateForm = () => {
    let isValid = true
    const errors = { title: "", price: "", description: "", image: "", category: "" }
    console.log(price)
    if (parseFloat(price) < 0) {
      isValid = false
      errors.price = "Please enter a valid price greater (or equal) than 0"
    }

    if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/i.test(image)) {
      isValid = false
      errors.image = "Please enter a valid URL"
    }

    setValidationErrors(errors)

    return isValid
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) return

    const productData = {
      title,
      price,
      description,
      category,
      image,
    }
    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData), // converte l'oggetto in una stringa in formato JSON
      })

      const responseData = await res.json()
      setResponse(responseData)
      // Una volta fatto il submit resetto il form
      setTitle("")
      setCategory("")
      setDescription("")
      setImage("")
      setPrice("")
      console.log(responseData)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="range" />
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required value={title} onChange={event => setTitle(event.target.value)} />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" required value={price} onChange={event => setPrice(event.target.value)} />
        {validationErrors.price && <Alert variant="danger">{validationErrors.price}</Alert>}
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={event => setDescription(event.target.value)} />
        <label htmlFor="category-select">Category</label>
        <select id="category-select" value={category} onChange={event => setCategory(event.target.value)}>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="electronics">Electronics</option>
        </select>
        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" required value={image} onChange={event => setImage(event.target.value)} />
        {validationErrors.image && <Alert variant="danger">{validationErrors.image}</Alert>}
        <Button type="submit">Add Product</Button>
      </form>
      {response && <Alert variant="success">Product addedd successfully! ID: {response._id}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  )
}

export default NewComponentForm
