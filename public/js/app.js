$(function() {
  let cartTotal = 0;
  let cartItems = [];
  let timerInterval;

  const render = function(items) {
    $("modal").modal("hide");
    $("#sale-items").empty();

    items.forEach(function(item) {
      $("#sale-items").append(buildItemRow(item));
    });
  };

  const getItems = function() {
    $.get("/api/products").then(function(items) {
      console.log(items);
      render(items);
    });
  };

  const buildItemRow = function(item) {
    const tr = $("<tr>");

    const input = $("<input>").attr({
      type: "number",
      min: 0,
      id: item.id
    });

    const button = $("<button>")
      .addClass("btn btn-warning add-to-cart")
      .text("Add to Cart")
      .attr("data-id", item.id);

    tr.append(
      $("<td>").append(input),
      $("<td>").text(item.product_name),
      $("<td>").text(item.stock_quantity),
      $("<td>").text(`$${item.price}`),
      $("<td>").append(button)
    );

    return tr;
  };

  const addCartRow = function(qty, item) {
    const itemTotal = item.price * qty;

    cartTotal += itemTotal;

    item.stock_quantity -= qty;

    cartItems.push(item);
    console.log(cartItems);

    const tr = $("<tr>").addClass(`cart-${item.id}`);

    tr.append(
      $("<td>").text(qty),
      $("<td>").text(item.product_name),
      $("<td>").text(`$${item.price}`),
      $("<td>").text(`$${itemTotal.toFixed(2)}`)
    );

    $("#modal-cart").append(tr);
    $(".cart-total").text(`$${cartTotal.toFixed(2)}`);
  };

  const message = function(type, text) {
    $("#messages")
      .addClass(`alert alert-${type}`)
      .text(text);

    timerInterval = setTimeout(clearMessages, 3000);
  };

  const clearMessages = function() {
    $("#messages")
      .empty()
      .removeClass();
  };

  const addItemToCart = function() {
    clearMessages();
    const id = $(this).attr("data-id");
    console.log("do I work?");
    $.get(`/api/products/${id}`).then(updateCart);
  };

  const updateCart = function(data) {
    const numRequested = $(`#${data.id}`).val();

    if (numRequested > data.stock_quantity) {
      message(
        "danger",
        `We're sorry. We only have ${data.stock_quantity} in stock`
      );
    } else {
      addCartRow(numRequested, data);
      message("success, Item(s) successfully added to cart!");
      $(`#${data.id}`).val("");
    }
  };

  const checkout = function() {
    cartItems.forEach(function(item) {
      $.ajax({
        method: "PUT",
        url: `/api/products/${item.id}`,
        data: item
      }).done(function() {
        getItems();
      });
    });
    getItems();
    $("#modal-cart").empty();
  };

  getItems();

  $("#sale-items").on("click", ".add-to-cart", addItemToCart);
  $("#checkout").on("click", checkout);
  $("#close").on("click", getItems);
});
