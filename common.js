function getURLVar(key) {
  var value = [];

  var query = String(document.location).split("?");

  if (query[1]) {
    var part = query[1].split("&");

    for (i = 0; i < part.length; i++) {
      var data = part[i].split("=");

      if (data[0] && data[1]) {
        value[data[0]] = data[1];
      }
    }

    if (value[key]) {
      return value[key];
    } else {
      return "";
    }
  }
}

$(document).ready(function () {
  // Highlight any found errors
  $(".text-danger").each(function () {
    var element = $(this).parent().parent();

    if (element.hasClass("form-group")) {
      element.addClass("has-error");
    }
  });

  // Currency
  $("#form-currency .currency-select").on("click", function (e) {
    e.preventDefault();

    $("#form-currency input[name='code']").val($(this).attr("name"));

    $("#form-currency").submit();
  });

  // Language
  $("#form-language .language-select").on("click", function (e) {
    e.preventDefault();

    $("#form-language input[name='code']").val($(this).attr("name"));

    $("#form-language").submit();
  });

  /* Search */
  $("#search input")
    .parent()
    .find("button")
    .on("click", function () {
      var url = $("base").attr("href") + "index.php?route=product/search";
      var value = $("#search input").val();
      if (value) {
        url += "&search=" + encodeURIComponent(value);

        var category_id = $("#search select[name='category_id']").prop("value");

        if (category_id > 0) {
          url += "&category_id=" + encodeURIComponent(category_id);
        }

        location = url;
      } else {
        if (document.dir == "rtl") {
          var btnOk = "Ù…ÙˆØ§ÙÙ‚";
          var content = "ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ ÙƒÙ„Ù…Ø© Ø§Ù„Ø¨Ø­Ø«";
          var title = "Ø¹ÙÙˆØ§Ù‹";
        } else {
          var btnOk = "OK";
          var content = "Please insert the keyword";
          var title = "Sorry";
        }
        swal({
          title: title,
          html: content,
          type: "error",
          showCancelButton: false,
          confirmButtonClass: "btn-danger",
          confirmButtonText: btnOk,
          allowEnterKey: false,
        });
      }
    });

  $("#search input[name='search']").on("keydown", function (e) {
    if (e.keyCode == 13) {
      $(this).parent().find("button").trigger("click");
    }
  });

  // Menu
  $("#menu .dropdown-menu").each(function () {
    var menu = $("#menu").offset();
    var dropdown = $(this).parent().offset();

    var i =
      dropdown.left +
      $(this).outerWidth() -
      (menu.left + $("#menu").outerWidth());

    if (i > 0) {
      $(this).css("margin-left", "-" + (i + 10) + "px");
    }
  });

  // Product List
  $("#list-view").click(function () {
    $("#content .product-grid > .clearfix").remove();

    $("#content .row > .product-grid").attr(
      "class",
      "product-layout product-list col-xs-12"
    );
    $("#grid-view").removeClass("active");
    $("#list-view").addClass("active");

    localStorage.setItem("display", "list");
  });

  // Product Grid
  $("#grid-view").click(function () {
    // What a shame bootstrap does not take into account dynamically loaded columns
    var cols = $("#column-right, #column-left").length;

    if (cols == 2) {
      $("#content .product-list").attr(
        "class",
        "product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12"
      );
    } else if (cols == 1) {
      $("#content .product-list").attr(
        "class",
        "product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12"
      );
    } else {
      $("#content .product-list").attr(
        "class",
        "product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12"
      );
    }

    $("#list-view").removeClass("active");
    $("#grid-view").addClass("active");

    localStorage.setItem("display", "grid");
  });

  if (localStorage.getItem("display") == "list") {
    $("#list-view").trigger("click");
    $("#list-view").addClass("active");
  } else {
    $("#grid-view").trigger("click");
    $("#grid-view").addClass("active");
  }

  // Checkout
  $(document).on(
    "keydown",
    "#collapse-checkout-option input[name='email'], #collapse-checkout-option input[name='password']",
    function (e) {
      if (e.keyCode == 13) {
        $("#collapse-checkout-option #button-login").trigger("click");
      }
    }
  );

  // tooltips on hover
  $("[data-toggle='tooltip']").tooltip({ container: "body" });

  // Makes tooltips work on ajax generated content
  $(document).ajaxStop(function () {
    $("[data-toggle='tooltip']").tooltip({ container: "body" });
  });
});

// Cart add remove functions
// var cart = {
//   add: function (product_id, quantity) {
//     $.ajax({
//       url: "index.php?route=checkout/cart/add",
//       type: "post",
//       data:
//         "product_id=" +
//         product_id +
//         "&quantity=" +
//         (typeof quantity != "undefined" ? quantity : 1),
//       dataType: "json",
//       beforeSend: function () {},
//       complete: function () {},
//       success: function (json) {
//         $(".alert, .text-danger").remove();

//         if (json["redirect"]) {
//           location = json["redirect"];
//         }

//         if (json["success"]) {
//           if (document.dir == "rtl") {
//             var success = "Ù…ÙˆØ§ÙÙ‚";
//           } else {
//             var success = "OK";
//           }
//           swal({
//             title: " ",
//             html: json["success"],
//             type: "success",
//             showCancelButton: false,
//             confirmButtonClass: "btn-success",
//             confirmButtonText: success,
//           });

//           // Need to set timeout otherwise it wont update the total
//           setTimeout(function () {
//             $("#cart-total").html(json["total"]);
//             $("#items-count").html(json["items_count"]);
//             $("#items-price").html(json["items_price"]);
//           }, 100);

//           $("#cart > ul").load("index.php?route=common/cart/info ul li");
//         }
//       },
//       error: function (xhr, ajaxOptions, thrownError) {
//         alert(
//           thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
//         );
//       },
//     });
//   },
//   update: function (key, quantity) {
//     $.ajax({
//       url: "index.php?route=checkout/cart/edit",
//       type: "post",
//       data:
//         "key=" +
//         key +
//         "&quantity=" +
//         (typeof quantity != "undefined" ? quantity : 1),
//       dataType: "json",
//       beforeSend: function () {},
//       complete: function () {},
//       success: function (json) {
//         // Need to set timeout otherwise it wont update the total
//         setTimeout(function () {
//           $("#cart-total").html(json["total"]);
//           $("#items-count").html(json["items_count"]);
//           $("#items-price").html(json["items_price"]);
//         }, 100);

//         if (
//           getURLVar("route") == "checkout/cart" ||
//           getURLVar("route") == "checkout/checkout"
//         ) {
//           location = "index.php?route=checkout/cart";
//         } else {
//           $("#cart > ul").load("index.php?route=common/cart/info ul li");
//         }
//       },
//       error: function (xhr, ajaxOptions, thrownError) {
//         alert(
//           thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
//         );
//       },
//     });
//   },
//   remove: function (key) {
//     $.ajax({
//       url: "index.php?route=checkout/cart/remove",
//       type: "post",
//       data: "key=" + key,
//       dataType: "json",
//       beforeSend: function () {},
//       complete: function () {},
//       success: function (json) {
//         // Need to set timeout otherwise it wont update the total
//         setTimeout(function () {
//           $("#cart-total").html(json["total"]);
//           $("#items-count").html(json["items_count"]);
//           $("#items-price").html(json["items_price"]);
//         }, 100);

//         if (
//           getURLVar("route") == "checkout/cart" ||
//           getURLVar("route") == "checkout/checkout"
//         ) {
//           location = "index.php?route=checkout/cart";
//         } else {
//           $("#cart > ul").load("index.php?route=common/cart/info ul li");
//         }
//       },
//       error: function (xhr, ajaxOptions, thrownError) {
//         alert(
//           thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
//         );
//       },
//     });
//   },
// };

var voucher = {
  add: function () {},
  remove: function (key) {
    $.ajax({
      url: "index.php?route=checkout/cart/remove",
      type: "post",
      data: "key=" + key,
      dataType: "json",
      beforeSend: function () {
        $("#cart > button").button("loading");
      },
      complete: function () {
        $("#cart > button").button("reset");
      },
      success: function (json) {
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $("#cart-total").html(json["total"]);
          $("#items-count").html(json["items_count"]);
          $("#items-price").html(json["items_price"]);
        }, 100);

        if (
          getURLVar("route") == "checkout/cart" ||
          getURLVar("route") == "checkout/checkout"
        ) {
          location = "index.php?route=checkout/cart";
        } else {
          $("#cart > ul").load("index.php?route=common/cart/info ul li");
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
        );
      },
    });
  },
};

// var wishlist = {
//   add: function (product_id) {
//     $.ajax({
//       url: "index.php?route=account/wishlist/add",
//       type: "post",
//       data: "product_id=" + product_id,
//       dataType: "json",
//       success: function (json) {
//         $(".alert").remove();

//         if (json["redirect"]) {
//           location = json["redirect"];
//         }

//         if (json["success"]) {
//           if (document.dir == "rtl") {
//             var success = "Ù…ÙˆØ§ÙÙ‚";
//           } else {
//             var success = "OK";
//           }
//           swal({
//             title: " ",
//             html: json["success"],
//             type: "success",
//             showCancelButton: false,
//             confirmButtonClass: "btn-success",
//             confirmButtonText: success,
//           });
//         }

//         $("#wishlist-total span").html(json["total"]);
//         $("#wishlist-total").attr("title", json["total"]);
//       },
//       error: function (xhr, ajaxOptions, thrownError) {
//         alert(
//           thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
//         );
//       },
//     });
//   },
//   remove: function () {},
// };
var i = 1;
function wishlist(result) {
  if (localStorage.getItem("status") != null) {
    let item = $(result).parents(".side-item")[0];
    item = item.outerHTML;
    console.log($(result).parents(".side-item")[0]);
    // Store
    sessionStorage.setItem(`wishlist-${i}`, item);
    Swal.fire({
      icon: "success",
      title: "Item added",
      text: "",
    });
    i++;
  } else {
    Swal.fire({
      icon: "info",
      title: "Not a member",
      text: "please login first",
    });
  }
}
let itemsCounter = 0;
function cart(result) {
  itemsCounter++;
  if (localStorage.getItem("status") != null) {
    let item = $(result).parents(".side-item")[0];
    item = item.outerHTML;
    console.log($(result).parents(".side-item")[0]);
    // Store
    $(".default").remove();
    $("#items-count")[0].innerHTML = itemsCounter;

    if ($("#cartCar").children().length == 0) {
      $("#cartCar").append(`<li>${item}</li><li>
      <div>
        <table class="table table-bordered">
                    <tbody><tr>
            <td class="text-right"><strong>الاجمالي</strong></td>
            <td class="text-right">EGP470</td>
          </tr>
                    <tr>
            <td class="text-right"><strong>الاجمالي النهائي</strong></td>
            <td class="text-right">EGP470</td>
          </tr>
                  </tbody></table>
        <p class="text-right cartbtns">
            <a href="#"><i class="fa fa-shopping-cart"></i> معاينة السلة</a>           
            <a href="#"><i class="fa fa-reply"></i> إنهاء الطلب</a>
        </p>
      </div>
    </li>`);
    } else {
      $("#cartCar").prepend(` <li>${item} </li>`);
    }

    Swal.fire({
      icon: "success",
      title: "Item added",
      text: "",
    });
    i++;
  } else {
    Swal.fire({
      icon: "info",
      title: "Not a member",
      text: "please login first",
    });
  }
}
