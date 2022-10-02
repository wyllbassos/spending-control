const formatValue = (value: number): string => {
  let [integer, decimal] = String(value).split('.');

  if (!decimal) {
    decimal = '00';
  } else if (decimal.length === 1) {
    decimal += '0';
  }

  return `R$ ${integer},${decimal}`;
}; // TODO

export default formatValue;
