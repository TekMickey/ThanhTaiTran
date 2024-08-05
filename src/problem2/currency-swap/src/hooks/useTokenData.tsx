import { useState, useEffect } from "react";
import axios from "axios";

interface TokenData {
  currency: string;
  price: number;
}

const useTokenData = () => {
  const [tokens, setTokens] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        const tokenData: TokenData[] = response.data;

        const uniqueTokens: { [key: string]: number } = {};
        tokenData.forEach(({ currency, price }) => {
          uniqueTokens[currency] = price;
        });

        setTokens(uniqueTokens);
      } catch (err) {
        setError("Failed to fetch token data");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  return { tokens, loading, error };
};

export default useTokenData;
