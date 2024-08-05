import React, { useState } from "react";
import useTokenData from "../hooks/useTokenData";
import FormField from "./FormField";

const SwapForm = () => {
  const { tokens, loading, error } = useTokenData();
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleSwap = () => {
    const numericAmount = parseFloat(amount);
    if (
      fromCurrency &&
      toCurrency &&
      !isNaN(numericAmount) &&
      numericAmount > 0
    ) {
      const fromPrice = tokens[fromCurrency];
      const toPrice = tokens[toCurrency];
      if (fromPrice && toPrice) {
        setResult((numericAmount * fromPrice) / toPrice);
      } else {
        alert("Invalid currency selected");
      }
    } else {
      setResult(null);
      alert("Please fill in all fields with valid data");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <FormField
        label="From"
        value={fromCurrency}
        onChange={setFromCurrency}
        options={tokens}
      />
      <FormField
        label="To"
        value={toCurrency}
        onChange={setToCurrency}
        options={tokens}
      />
      <FormField
        label="Amount"
        value={amount}
        onChange={setAmount}
        type="number"
      />
      <button
        onClick={handleSwap}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Swap
      </button>
      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {parseFloat(amount)} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default SwapForm;
