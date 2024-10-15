var app = angular.module("vendorApp", []);

app.controller("vendorController", function ($scope, cartService, $http) {
    $scope.items = [
        { name: "mango", price: 25, img: "https://media.istockphoto.com/id/1352881713/photo/mango-fruit-with-drops-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xNgofvhPOsksKtOMK9sbvQ2qZpMS6WQ3UC6Omv7g8-0=" },
        { name: "apple", price: 10, img: "https://media.istockphoto.com/id/1352881713/photo/mango-fruit-with-drops-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xNgofvhPOsksKtOMK9sbvQ2qZpMS6WQ3UC6Omv7g8-0=" },
        { name: "strawberry", price: 125, img: "https://media.istockphoto.com/id/1352881713/photo/mango-fruit-with-drops-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xNgofvhPOsksKtOMK9sbvQ2qZpMS6WQ3UC6Omv7g8-0=" },
        { name: "banana", price: 250, img: "https://media.istockphoto.com/id/1352881713/photo/mango-fruit-with-drops-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xNgofvhPOsksKtOMK9sbvQ2qZpMS6WQ3UC6Omv7g8-0=" }
    ];
    
    $scope.search = "";
    $scope.sort = "name";
    $scope.cart = cartService.getCart();
    $scope.showModal = false;
    $scope.address = '';

    $scope.addtocart = function(item) { cartService.addtocart(item); }
    
    $scope.totalbill = function() {
        return cartService.totalbill();
    };

    $scope.proceedToPay = function() {
        $scope.showModal = true; // Show the modal
    };

    $scope.closeModal = function() {
        $scope.showModal = false; // Hide the modal
        $scope.address = ''; // Reset address
    };

    $scope.submitPayment = function() {
        const totalPrice = $scope.totalbill();
        const paymentData = {
            address: $scope.address,
            total: totalPrice
        };
    
        console.log("Submitting payment data:", paymentData); // Debugging log
    
        // Send payment data to the server
        console.log("Address before submitting:", $scope.address);

        $http.post('http://127.0.0.1:3000/api/payment', paymentData).then(function(response) {
            alert('Payment successful!'); // Handle success response as needed
            $scope.closeModal(); // Close the modal
            $scope.cart = []; // Clear the cart after payment
        }, function(error) {
            console.error("Payment error:", error); // Log the error response
            alert('Payment failed: ' + (error.data && error.data.message ? error.data.message : 'Unknown error')); // Handle error
        });
    };
})    

app.directive("custom-header", function() {
    return {
        template: '<header>This is a custom directive</header>'
    };
});

app.service("cartService", function() {
    var cart = [];
    
    this.addtocart = function(item) {
        cart.push(item);
    };
    
    this.getCart = function() {
        return cart;
    };
    
    this.totalbill = function() {
        return cart.reduce(function(total, item) {
            return total + item.price;
        }, 0);
    };
});