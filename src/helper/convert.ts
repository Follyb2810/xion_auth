export const toNeutron = (amount: number): number => amount / 1e6;
export const toUntrn = (amount: number): string => (amount * 1e6).toFixed(0);
export function xionToUxion(amount: number | string): string {
    return Math.floor(Number(amount) * 1e6).toString();
  }
  
  export function uxionToXion(amount: number | string): string {
    return (Number(amount) / 1e6).toString();
  }
  
        // const formattedAmount = xionToUxion(amount);
        // const formattedAmount = Math.floor(Number(amount) * 1e6).toString();