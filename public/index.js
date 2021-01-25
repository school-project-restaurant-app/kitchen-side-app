const ordersToDoList = document.querySelector(".orders-to-do-list");
//every 5 secs checks for new orders
window.setTimeout(() => {
  location.reload();
}, 5000);
fetch("http://localhost:3000/menu")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    menu = JSON.parse(json);
  });

const renderOrders = () => {
  const getOrdersApi = "http://localhost:3000/orders";
  fetch(getOrdersApi)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const orders = JSON.parse(json);

      for (let i = 0; i < orders.length; i++) {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "order-element-wrapper");
        ordersToDoList.appendChild(wrapper);
        const orderElement = document.createElement("article");
        orderElement.setAttribute("class", "order-element");
        wrapper.appendChild(orderElement);
        const date = document.createElement("h3");
        date.innerText = orders[i].orderTime;
        orderElement.appendChild(date);
        const listOfDishes = document.createElement("ul");
        for (let j = 0; j < orders[i].orderedDishesList.length; j++) {
          const liEle = document.createElement("li");
          liEle.innerText = `${orders[i].orderedDishesList[j].name} x${orders[i].orderedDishesList[j].amount}`;
          listOfDishes.appendChild(liEle);
        }
        orderElement.appendChild(listOfDishes);
        const buttonReady = document.createElement("button");
        buttonReady.setAttribute("class", "order-state-btns");
        buttonReady.name = "order-ready-btn";
        buttonReady.innerText = "✔";
        orderElement.appendChild(buttonReady);
        const buttonDiscard = document.createElement("button");
        buttonDiscard.setAttribute("class", "order-state-btns");

        buttonDiscard.name = "order-discard-btn";
        buttonDiscard.setAttribute("class", "order-discard-btn");
        buttonDiscard.innerText = "❌";
        buttonDiscard.addEventListener("click", () => {
          fetch(`http://localhost:3000/delete-order`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",

            body: JSON.stringify({ id: orders[i]._id }),
          });
          location.reload();
        });
        orderElement.appendChild(buttonDiscard);
      }
    });
};

renderOrders();