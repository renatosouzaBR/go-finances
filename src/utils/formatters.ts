export function formatCurrencyToPtBR(currency: Number) {
  return currency.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
