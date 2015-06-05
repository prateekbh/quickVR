var ShelfManager = {
    shelves: {
            categories:[],
    	totalCount:0
    },

    addShelf: function(cid, data) {
        if (!this.shelves[cid]) {
            this.shelves.categories.push(cid);
            this.shelves[cid] = this.shelves[cid] || {};
            this.shelves[cid].products = this.shelves[cid].products || [];
            this.shelves[cid].endZ=-100;
            this.shelves[cid].category=cid;
        }
        else{
            this.shelves[cid].endZ=this.shelves[cid].endZ-110;   
        }

        this.shelves[cid].x=this.shelves.totalCount*50;
        var cidShelfSet=this.shelves[cid].products.length/10;
        this.shelves[cid].y=(-1*((cidShelfSet)*100+(10*cidShelfSet)))-100;
        

        for (var prod in data) {
            this.shelves[cid].products.push(prod);
        }
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
    	rightShelfShape.lineTo( shelfWidth-20, 50 );
    	rightShelfShape.lineTo( 0, 50 );
    	rightShelfShape.lineTo( 0,0 );

    	var leftShelfShape=new THREE.Shape();
    	leftShelfShape.moveTo( 0,0 );
    	leftShelfShape.lineTo( -shelfWidth, 0 );
    	leftShelfShape.lineTo( -shelfWidth, shelfHeight );
    	leftShelfShape.lineTo( 0, shelfHeight );
    	leftShelfShape.lineTo( 0, shelfHeight-10 );
    	leftShelfShape.lineTo( -shelfWidth+20, shelfHeight-10 );
    	leftShelfShape.lineTo( -shelfWidth+20, 50 );
    	leftShelfShape.lineTo( 0, 50 );
    	leftShelfShape.lineTo( 0,0 );

    	var extrusionSettings = {
    	  size: 30, height: 4, curveSegments: 3,
    	  bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
    	  material: 0, extrudeMaterial: 1
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


    	shelves[cid]=shelves[cid]||{};
    	shelves[cid].products=shelves[cid].products||[];
    	data=JSON.parse(data);

    	for(var index=0;index<data.length;index++){
    	  shelves[cid].products.push(data[index]);
    	}
    }
}
