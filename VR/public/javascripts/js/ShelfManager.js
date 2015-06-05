var ShelfManager = {
    shelves: {
            categories:[],
    	totalCount:0
    },

    addShelf: function(cid, data) {
        var newCat=false;
        if (!this.shelves[cid]) {
            this.shelves.categories.push(cid);
            this.shelves[cid] = this.shelves[cid] || {};
            this.shelves[cid].x=this.shelves.totalCount*180;
            this.shelves[cid].products = this.shelves[cid].products || [];
            this.shelves[cid].endZ=-260;
            this.shelves[cid].category=cid;
            newCat=true;
        }
        else{
            this.shelves[cid].endZ=this.shelves[cid].endZ-270;
        }

        
        var cidShelfSet=this.shelves[cid].products.length/10;
        this.shelves[cid].y=(-1*((cidShelfSet)*260+(10*cidShelfSet)))-260;
        

        for (var prod in data) {
            this.shelves[cid].products.push(prod);
        }

        if(newCat==true){
            this.shelves.totalCount=this.shelves.totalCount+1;
        }

        this.renderProducts(this.shelves[cid],data);
    },

    makeShelf:function(cid,data){
    	this.addShelf(cid,JSON.parse(data));
    	var shelf=this.shelves[cid];

    	var shelfHeight=100, shelfWidth=50;

    	var rightShelfShape=new THREE.Shape();
    	rightShelfShape.moveTo( 0,0 );
    	rightShelfShape.lineTo( shelfWidth, 0 );
    	rightShelfShape.lineTo( shelfWidth, shelfHeight );
    	rightShelfShape.lineTo( 0, shelfHeight );
    	rightShelfShape.lineTo( 0, shelfHeight-10 );
    	rightShelfShape.lineTo( shelfWidth-20, shelfHeight-10 );
    	rightShelfShape.lineTo( shelfWidth-20, 20 );
    	rightShelfShape.lineTo( 0, 20 );
    	rightShelfShape.lineTo( 0,0 );

    	var leftShelfShape=new THREE.Shape();
    	leftShelfShape.moveTo( 0,0 );
    	leftShelfShape.lineTo( -shelfWidth, 0 );
    	leftShelfShape.lineTo( -shelfWidth, shelfHeight );
    	leftShelfShape.lineTo( 0, shelfHeight );
    	leftShelfShape.lineTo( 0, shelfHeight-10 );
    	leftShelfShape.lineTo( -shelfWidth+20, shelfHeight-10 );
    	leftShelfShape.lineTo( -shelfWidth+20, 20 );
    	leftShelfShape.lineTo( 0, 20 );
    	leftShelfShape.lineTo( 0,0 );

    	var extrusionSettings = {
    	  size: 30, height: 4, curveSegments: 3,
    	  bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
    	  material: 0, extrudeMaterial: 1,amount:260
    	};

    	var rightShelfGeom = new THREE.ExtrudeGeometry( rightShelfShape, extrusionSettings );
    	var leftShelfGeom = new THREE.ExtrudeGeometry( leftShelfShape, extrusionSettings );

    	var materialFront = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    	var materialSide = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
    	var materialArray = [ materialFront, materialSide ];
    	var shelfMaterial = new THREE.MeshFaceMaterial(materialArray);

    	var rightShelf = new THREE.Mesh( rightShelfGeom, shelfMaterial );
    	rightShelf.position.set(shelf.x+100,0,shelf.y);

    	var leftShelf = new THREE.Mesh( leftShelfGeom, shelfMaterial );
    	leftShelf.position.set(shelf.x,0,shelf.y);

    	scene.add( rightShelf );
    	scene.add( leftShelf );
    },

    renderProducts:function(shelf,data){
        moduleProduct.arrangeProduct(data, shelf);
    },

    createBanner:function(img,x){
        var material = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture(img)
        });

        // cube
        var cube = new THREE.Mesh(new THREE.CubeGeometry(60, 30, 30), material);
        cube.overdraw = true;
        cube.position.set(x, 110, 30);
        scene.add(cube);
    }
}
