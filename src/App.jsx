import { useState, useEffect } from "react";
import { publicAxios } from "./utils/publicAxios";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getAllProducts = async (url) => {
    try {
      const res = await publicAxios.get(url);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      setFilteredProducts([]);
      setProducts([]);
    }
  };
  useEffect(() => {
    getAllProducts("/products");
  }, []);

  const [options, setOptions] = useState({
    min: null,
    max: null,
    rating: null,
    brand: null,
    sortBy: null,
  });

  useEffect(() => {
    let newData = products.filter(
      (item) =>
        (options.min ? item.price >= options.min : true) &&
        (options.max ? item.price <= options.max : true) &&
        (options.rating ? item.rating >= options.rating : true) &&
        (options.brand
          ? item.brand.toLowerCase().startsWith(options.brand.toLowerCase())
          : true)
    );

    if (options.sortBy) {
      if (options.sortBy == "title") {
        newData = newData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (options.sortBy == "title-1") {
        newData = newData.sort((a, b) => b.title.localeCompare(a.title));
      } else if (options.sortBy == "price") {
        newData = newData.sort((a, b) => a.price - b.price);
      } else if (options.sortBy == "price-1") {
        newData = newData.sort((a, b) => b.price - a.price);
      } else if (options.sortBy == "rating") {
        newData = newData.sort((a, b) => a.rating - b.rating);
      } else if (options.sortBy == "rating-1") {
        newData = newData.sort((a, b) => b.rating - a.rating);
      }
    }
    setFilteredProducts(newData);
  }, [options]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (value) {
      setOptions({ ...options, [name]: value });
    } else {
      setOptions({ ...options, [name]: null });
    }
  };

  return (
    <div className="container mt-5">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Brand</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className="d-flex price">
              <input
                type="text"
                placeholder="Min"
                className="form-control "
                onChange={(e) => handleChangeInput(e)}
                name="min"
              />
              <input
                type="text"
                placeholder="Max"
                className="form-control"
                onChange={(e) => handleChangeInput(e)}
                name="max"
              />
            </th>
            <th>
              <select
                id=""
                className="form-control "
                defaultValue={""}
                onChange={(e) => handleChangeInput(e)}
                name="rating"
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="1">Above 1</option>
                <option value="2">Above 2</option>
                <option value="3">Above 3</option>
                <option value="4">Above 4</option>
                <option value="5">5</option>
              </select>
            </th>
            <th>
              <input
                type="text"
                placeholder="Type brands"
                className="form-control"
                onChange={(e) => handleChangeInput(e)}
                name="brand"
              />
            </th>
            <th>
              <select
                id=""
                className="form-control "
                defaultValue={""}
                onChange={(e) => handleChangeInput(e)}
                name="sortBy"
              >
                <option value="">Sort By All</option>
                <option value="title">Title A to Z</option>
                <option value="title-1">Title Z to A</option>
                <option value="price">Price min to max</option>
                <option value="price-1">Price max to min</option>
                <option value="rating">Rating min to max</option>
                <option value="rating-1">Rating max to min</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <img src={item.thumbnail} alt="" style={{ width: "50px" }} />
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>{item.brand}</td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <h2 className="text-center">No data</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
