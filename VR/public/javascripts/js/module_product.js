var moduleProduct = function() {
    function makeProduct(imgPath) {
        var material = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture(imgPath)
        });

        var cube = new THREE.Mesh(new THREE.BoxGeometry(35, 35, 35), material);
        cube.overdraw = true;
        return cube;
    }

    function getImagePath() {

    }
    var y = 45;
    productGap = 45;

    this.arrangeProduct = function(prodObj, shelf) {
         var z = shelf.y + 240;
        for (var i = prodObj.length - 1; i >= 0; i--) {
            var prod = makeProduct("/imgs/" + prodObj[i].fsn + "_144.jpg"),
                x = shelf.x;
            x = i % 2 == 0 ? x - 20 : x + 120;
            prod.position.set(x, y, z);
            z = (i - 1) % 2 == 0 ? z : z - productGap;
            prod.userData.fsn=prodObj[i].fsn;
            prod.userData.prod_id=prodObj[i].id;
            prod.userData.title=prodObj[i].product_title;
            prod.userData.cost=prodObj[i].estimated_billing_price;
            scene.add(prod)
        };
    };
    return this;
}();
