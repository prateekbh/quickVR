var moduleProduct = function () {
	function makeProduct(imgPath){
        var material = new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture(imgPath)
        });
                
        var cube = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15), material);
        cube.overdraw = true;
        return cube;
    }
    function getImagePath(){

    }
    var y = 55; productGap = 20;
    //var x = 50, y = 60, z= 80, productGap = 10;
	this.arrangeProduct = function(prodObj, shelf){
		var z = shelf.y + 90;
		for (var i = prodObj.length - 1; i >= 0; i--) {
			var prod = makeProduct("/imgs/"+ prodObj[i].fsn+"_144.jpg"),x = shelf.x;
			x = i%2 == 0 ? x - 20 : x + 120;
			prod.position.set(x,y,z);
			z = (i-1)%2 == 0 ? z : z - productGap; 
			scene.add(prod)
		};
	};
	return this;
}();
