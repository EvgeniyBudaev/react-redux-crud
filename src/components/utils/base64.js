export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => resolve(event.target.result)
    reader.onerror = (event) => reject(event)

    reader.readAsDataURL(file)
  })
}