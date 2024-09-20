export default function generateAccountId(currency) {
  return currency + Math.floor(Math.random() * (999999 - 100000 + 1));
}