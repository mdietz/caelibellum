function Moon(name, parent){
    this.name = name;
    this.parent = null;
    this.mesh = null;
    this.spin_rate = 0;
    this.rotation_rate = 0;
    this.rotation = 0;

    this.init(distance, radius, material){
	moon_geometry = new THREE.SphereGeometry(radius, 16, 8);
	sphere = new THREE.Mesh(moon_geometry, material);
	
	this.rotation = Math.random()*2*Math.PI;

	sphere.rotation.z = Math.random()*Math.PI/3 - Math.PI/6;
	
	// TOA
	// TAN(O/A) = sphere.rotation.z
	// O/A = arctan(sphere.rotation.z
	// O = distance * arctan(spehere.rotation.z)
	sphere.position.x = this.parent.mesh.position.x + distance*Math.cos(this.rotation);
	sphere.position.y = this.parent.mesh.position.y + distance*Math.atan(sphere.rotation.z)*Math.sin(this.rotation);
	sphere.position.z = this.parent.mesh.position.z + distance*Math.sin(this.rotation);

	this.spin_rate = .0175;
	this.rotation_rate = .0175;
	
	this.mesh = sphere;
    }

    this.update() = function(){
	this.rotation += this.rotation_rate;
	this.mesh.position.x = this.parent.mesh.position.x + distance*Math.cos(this.rotation);
	this.mesh.position.y = this.parent.mesh.position.y + distance*Math.atan(this.mesh.rotation.z)*Math.sin(this.rotation);
	this.mesh.position.z = this.parent.mesh.position.z + distance*Math.sin(this.rotation);
	
	this.mesh.rotation.y += this.spin_rate;
    }

    this.addToScene = function(scene){
	scene.addObject(mesh);
    }
}

function Planet(name, parent){
    this.name = name;
    this.parent = null;
    this.mesh = null;
    this.spin_rate = 0;
    this.rotation_rate = 0;
    this.rotation = 0;
    this.moons = new Array();
    
    this.init(distance, radius, material){
	moon_geometry = new THREE.SphereGeometry(radius, 16, 8);
	sphere = new THREE.Mesh(moon_geometry, material);
	
	this.rotation = Math.random()*2*Math.PI;

	sphere.rotation.z = Math.random()*Math.PI/3 - Math.PI/6;
	
	// TOA
	// TAN(O/A) = sphere.rotation.z
	// O/A = arctan(sphere.rotation.z
	// O = distance * arctan(spehere.rotation.z)
	sphere.position.x = this.parent.mesh.position.x + distance*Math.cos(this.rotation);
	sphere.position.y = this.parent.mesh.position.y + distance*Math.atan(sphere.rotation.z)*Math.sin(this.rotation);
	sphere.position.z = this.parent.mesh.position.z + distance*Math.sin(this.rotation);

	this.spin_rate = .0175;
	this.rotation_rate = .0175;
	
	this.mesh = sphere;
    }

    this.update() = function(){
	this.rotation += this.rotation_rate;
	this.mesh.position.x = this.parent.mesh.position.x + distance*Math.cos(this.rotation);
	this.mesh.position.y = this.parent.mesh.position.y + distance*Math.atan(this.mesh.rotation.z)*Math.sin(this.rotation);
	this.mesh.position.z = this.parent.mesh.position.z + distance*Math.sin(this.rotation);
	
	this.mesh.rotation.y += this.spin_rate;

	for(i = 0; i < moons.length; i++){
	    this.moons[i].update();
	}
    }

    this.addMoon = function(name, distance, radius, material){
	moon = new Moon(name, this);
	moon.init(distance,radius,material);
	this.moons.push(moon);
    }

    this.addToScene = function(scene){
	scene.addObject(this.mesh);
	for(i = 0; i < moons.length; i++){
	    this.moons[i].addToScene(scene);
	}
    }
}
	

function SolarSystem(name){
    this.name = name;
    this.mesh = null;
    this.planets = new Array();

    this.init = function(position, radius, the_color){
	star_material = new THREE.MeshLambertMaterial({
	    color: the_color,
	    shading: THREE.SmoothShading
	});
	
	star_geometry = new THREE.SphereGeometry(radius, 32, 16);

	sphere = new THREE.Mesh(star_geometry, star_material);

	sphere.position.x = position[0];
	sphere.position.y = position[1];
	sphere.position.z = position[2];

	this.mesh = sphere;
    }

    this.addPlanet = function(name, distance, radius, material){
	planet = new Planet(name, this);
	planet.init(distance,radius,material);
	this.planets.push(moon);
    }

    this.update() = function(){
	for(i = 0; i < planets.length; i++){
	    this.planets[i].update();
	}
    }

    this.addToScene = function(scene){
	scene.addObject(this.mesh);
	for(i = 0; i < planets.length; i++){
	    this.planets[i].addToScene(scene);
	}
    }
}