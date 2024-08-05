/* 
1.Inconsistent Data Types:
- WalletBalance interface doesn't have a blockchain field, which is used in getPriority.
- Mixing types for WalletBalance and FormattedWalletBalance in the same context.
2. Repeated Calculations in useMemo:
- The priority calculation and filtering are performed inside useMemo but could be separated for clarity and efficiency.
- The condition balance.amount <= 0 doesn't affect the result due to incorrect return logic in the filter function.
3. Unnecessary useMemo Dependency:
- The prices dependency in useMemo doesn't affect the sorting of balances and is therefore unnecessary.
4. Incorrect Filter Logic:
- The filter logic inside useMemo should be corrected to return balances with positive amounts.
5. Improper Usage of Hooks and Typing:
- Types should be strictly enforced, and the interfaces should be correctly defined to avoid runtime errors.
- The rows map function incorrectly types balance as FormattedWalletBalance.
6. Unnecessary Mapping of Sorted Balances:
- formattedBalances is calculated but never used directly in the rows mapping.
*/

interface WalletBalance {
  blockchain: string; // Added blockchain field to WalletBalance interface for consistency
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  // Extended WalletBalance to FormattedWalletBalance for clarity
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    // Enforced consistent data type for blockchain
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    // Separated filtering and sorting for clarity
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      ) // Corrected filter logic for valid priority and positive amounts
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      ); // Simplified sorting logic
  }, [balances]); // Removed unnecessary prices dependency

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => ({
      // Ensured correct typing by extending WalletBalance
      ...balance,
      formatted: balance.amount.toFixed(2), // Standardized formatting logic
    })
  );

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // Correctly typed balance as FormattedWalletBalance
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>; // Simplified JSX return statement
};
