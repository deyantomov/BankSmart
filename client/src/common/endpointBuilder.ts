export default function endpointBuilder(path: string) {
  return `http://localhost:3000/api/${path}`
}