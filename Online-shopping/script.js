startFunction();

function startFunction(){

    // checking if the button is clicked or not
    // it is a buton element
    var addToCartButtons=document.getElementsByClassName('shop-item-button');
    // if there are several buttons use for loop
    for(var i=0;i<addToCartButtons.length;i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked);
    }

    var removeCartItem=document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItem.length; i++) {
        var button =removeCartItem[i];
        button.addEventListener('click', removeCartItem());
    }

}

    // if  any of the button is clicked addToCartClicked fun is executed
    // passing the value via event
    function addToCartClicked(event)
    {   
        var button=event.target;
       // console.log(button.parentElement.parentElement);
        var shopItem=button.parentElement.parentElement;
        var title=shopItem.getElementsByClassName('shop-item-title')[0].innerHTML;
        var price=shopItem.getElementsByClassName('shop-item-price')[0].innerHTML;
        var image=shopItem.getElementsByClassName('shop-item-image')[0].src;

        // targeted and got all the values 

       // console.log(title,price,image);
        addItemToCart(title,price,image);
        updateCartTotal();
    }

    function addItemToCart(title,price,image){
        // create a div element with
        var cartRow=document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.classList.add('col-md-7');


        // checking  if  the same button is clicked twice
        // using title
        var cartItems=document.getElementsByClassName('cart-items')[0];
        var cartItemNames=cartItems.getElementsByClassName('cart-item-title');

        for(var i=0; i<cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert("you have already purchased this item");
                return;
            }
        }
        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" maxlength="5" value="1">
            <button class="btn btn-danger" type="button">Delete</button>
        </div>`

        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeCartQuantity);


    }   
    function changeCartQuantity(event){
        var change=event.target;
        if(isNaN(change.value) || change.value <= 0){
            change.value=1;
        }
        if(change.value>=5){
            alert("you cannot order more than 5 items of same product");
            change.value =5;
        }
        updateCartTotal();
    }
    function removeCartItem(event) {
        var buttonClicked   = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();

    }

    function updateCartTotal(){
        // we need cart rows 
        var cartItem=document.getElementsByClassName('cart-items')[0];
      //  console.log(cartItem);

        var cartRows=cartItem.getElementsByClassName('cart-row');
        total=0;
        for(var i=0;i<cartRows.length;i++){
            var cartRow=cartRows[i];
            var cartPrice= cartRow.getElementsByClassName('cart-price')[0].innerHTML;
            var cartQuantity= cartRow.getElementsByClassName('cart-quantity-input')[0];
            var price=parseFloat(cartPrice);
            var quantity=cartQuantity.value;
            total=total+(price * quantity);
          //  console.log(quantity);

        }
        total = Math.round(total * 100) / 100;
       // console.log(total);
        document.getElementsByClassName('cart-total-price')[0].innerHTML="Rs : "+total;

    }




    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  var cartRow=document.getElementsByClassName('cart-row');
  var create
  alert(cartRow.length);
    for(var i=0;i<cartRow.length;i++){
        var billImg=document.getElementsByClassName('cart-item-image')[i].src;
        var billTitle=document.getElementsByClassName('cart-item-title')[i].innerText;
        var billPrice=document.getElementsByClassName('cart-price')[i].innerText;
        var billInput=document.getElementsByClassName('cart-quantity-input')[i].innerText;

        document.getElementsByClassName('bill-title')[0].innerText=billTitle;
    }
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}