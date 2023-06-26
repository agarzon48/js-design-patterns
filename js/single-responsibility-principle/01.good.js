// ✔️  — This function is compliant with the Single Responsibility Principle:
const apiConnection = new APIConnection();
filterProducts(apiConnection, ["filter1", "filter2"])
  .then((result) => {
    displayProducts(result);
    recordProducts(result, apiConnection);
  })
  .catch((err) => {
    handleError(err, "Error while processing the products!");
  });

export function filterProducts(apiConnection, filters) {
  try {
    filters = removeDuplicateFilters(filters);
    apiConnection
      .get(`/products`)
      .then((products) => {
        // The function is now only responsible for filtering products
        const result = applyFilters(products, filters);
        return result;
      })
      .catch((err) => {
        handleError(err, "Error while processing the products!");
      });
  } catch ({ message }) {
    handleError(message, "Application error!");
  }
}

// Recording has been extracted to a separate function
function recordProducts(result, apiConnection) {
  result.forEach((product) => {
    apiConnection.post("/products/record", product);
  });
}

// Rendering has been extracted to a separate function
function displayProducts(result) {
  const list = document.getElementById("product-list");
  result.forEach((product) => {
    const item = document.createElement("li");
    item.innerHTML = product.name;
    list.appendChild(item);
  });
}

// Error handling has been extracted to a separate function
function handleError(err, msg) {
  console.log(msg);
  const messageBox = new MessageBox();
  messageBox.show("Error", err);
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
