import { useState, useEffect } from "react";
import axios from "axios";

const Image = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get("https://api.thedogapi.com/v1/images/search?limit=20");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getResponse();
  }, []);

  if (loading) return null;

  return (
    <div className="grid-container">
      {data.map(data => {
        return (
          <div>
            <img key={data.id} className="grid-item" src={data.url} alt="a" />
          </div>
        )
      })
      }
    </div>
  );
}

export default Image;
