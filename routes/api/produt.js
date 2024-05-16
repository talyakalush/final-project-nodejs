import axios from "axios";

const API_KEY = "25540812-faf2b76d586c1787d2dd02736";
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;

async function getAllProductsController(req, res) {
  const { page = 1, category = "" } = req.query;
  const perPage = 5;

  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(category)}`,
      {
        params: {
          page,
          per_page: perPage,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Pixabay:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
}
export default getAllProductsController;
