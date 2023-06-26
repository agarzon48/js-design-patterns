// ❌ — This is a violation of the Single Responsibility Principle:
export function filterProducts(apiConnection, filters) {
  try {
    filters = removeDuplicateFilters(filters);
    apiConnection
      .get(`/products`)
      .then((products) => {
        // 1. The function is responsible for filtering products
        let result = applyFilters(products, filters);
        let list = document.getElementById("product-list");

        // 2. The function is responsible for rendering the products
        result.forEach((product) => {
          let item = document.createElement("li");
          item.innerHTML = product.name;
          list.appendChild(item);
        });

        // 3. The function is responsible for sending the products to the server
        result.forEach((product) => {
          apiConnection.post("/products/record", product);
        });
      })

      // 4. The function is responsible for handling errors
      .catch((err) => {
        console.log(err);
        // 5. The function is responsible for showing a message box
        let messageBox = new MessageBox();
        messageBox.show("Error", err.message);
      });
  } catch (err) {
    console.log(err);
    let messageBox = new MessageBox();
    messageBox.show("Error", err.message);
  }
}

function removeDuplicateFilters(filters) {
  // Just an example
  return filters;
}

function applyFilters(products, filters) {
  // Just an example
  return products;
}

export class MessageBox {
  show(title, message) {
    // Just an example
  }
}
