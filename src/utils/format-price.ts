export function formatPrice(valueInCents: number) {
    const formatedValue = valueInCents / 100;
    return formatedValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }