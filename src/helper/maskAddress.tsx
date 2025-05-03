export const maskAddress = (address:string) => {
        const visibleAddress = Math.max(2, Math.floor(address.length * 0.1));
        return address.slice(0, visibleAddress) + '...' + address.slice(-visibleAddress);
      };