$(function() {
	var H = parseInt($(".model-show").css("height"));
	var W = parseInt($(".model-show").css("width"));
	$('body').prepend('<div style="display:none" class="layui-progress layui-progress-big" lay-filter="demo" lay-showPercent="true"> <div class="layui-progress-bar layui-bg-orange" lay-percent="0%"></div> </div>');

	console.info(W, H);

	var container;
	var camera,
		scene,
		renderer;
	var mouseX = 0,
		mouseY = 0;
	var windowHalfX = W / 2;
	var windowHalfY = H / 2;

	var selectedObjects = [];
	var composer,
		effectFXAA,
		outlinePass;
	
function loading(parss) {
	
		if(parss>=100){
			$(".layui-progress").hide(300);
		}else{
			$(".layui-progress").show();
			layui.use('element', function(){
				  var element = layui.element;
				  element.progress('demo', parss+'%');
		     });
		}
	}

	function mode_init() {
		container = document.createElement('div');
		$(".model-show").append(container);
		mouse = new THREE.Vector2();
		raycaster = new THREE.Raycaster();

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
		camera.position.x = 0;
		camera.position.y = 250;
		camera.position.z = 700;
		camera.lookAt(scene.position);

		//添加摄像头控制
		control = new THREE.OrbitControls(camera);
		control.minDistance = 50;
		control.maxDistance = 1050;
		/*control.addEventListener('change', function(e) {
			renderer.render(scene, camera);
		});
*/
		var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
		scene.add(ambientLight);
		var pointLight = new THREE.PointLight(0xffffff, 0.8);
		camera.add(pointLight);
		scene.add(camera);
		// texture
		var manager = new THREE.LoadingManager();
		manager.onProgress = function(item, loaded, total) {
			console.log(item, loaded, total);
		};

		// model
		var onProgress = function(xhr) {
			if (xhr.lengthComputable) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log(Math.round(percentComplete, 2) + '% downloaded');
				loading(Math.round(percentComplete, 2));
			}
		};

		var onError = function(xhr) {};
		addSky();
		loadJZW();
		function loadJZW() {
			var _name=$("#modeContainer",window.parent.document).attr("_name"); 
			var _type=$("#modeContainer",window.parent.document).attr("_type"); 
			//$("#ifm").contents().find("#btnOk")
			$.ajax({
				type : "POST",
				url : "getModePath",
				data : {
					_name : _name,
					_type : _type,
				},
				async : false,
				cache : false,
				contentType : "application/x-www-form-urlencoded",
				success : function(data) {
					loadOBj(data);
				},
				error : function(data) {
					console.log("error:" + data.responseText);
				}
			});
			
			function loadOBj(d){
				var path=d.split("@");
				var mtlLoader = new THREE.MTLLoader();
				mtlLoader.setPath('/seckill/uploadFiles/');
				mtlLoader.load(path[1], function(materials) {
					materials.preload();
					var loader = new THREE.OBJLoader();
					loader.setMaterials(materials);
					loader.setPath('/seckill/uploadFiles/');
					loader.load(path[0], function(object) {
						object.scale.set(0.1, 0.1, 0.1);
						object.position.y = 0;
						$(".main",window.parent.document).attr("mode_id",path[2]);
						window.parent.getParts(object, scene,path[2],outlinePass);
						scene.add(object);
					}, onProgress, onError);
				});
			}
		}

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(W, H);
		container.appendChild(renderer.domElement);
		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//window.addEventListener('resize', onWindowResize, false);

		composer = new THREE.EffectComposer(renderer);
		var renderPass = new THREE.RenderPass(scene, camera);
		composer.addPass(renderPass);

		outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
		composer.addPass(outlinePass);
		effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
		effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
		effectFXAA.renderToScreen = true;
		composer.addPass(effectFXAA);

		var model = document.getElementById("model-show");
		//model.addEventListener('mousemove', onTouchMove);
		//model.addEventListener('touchmove', onTouchMove);

		function onTouchMove(event) {
			var x,
				y;
			if (event.changedTouches) {

				x = event.changedTouches[0].pageX;
				y = event.changedTouches[0].pageY;
			} else {
				x = event.layerX;
				y = event.layerY;
			}
			mouse.x = (x / W) * 2 - 1;
			mouse.y = -(y / H) * 2 + 1;
			checkIntersection();
		}

		function addSelectedObject(object) {
			selectedObjects = [];
			selectedObjects.push(object);
		}

		function checkIntersection() {
			raycaster.setFromCamera(mouse, camera);
			var intersects = raycaster.intersectObjects([ scene ], true);
			if (intersects.length > 0) {
				var selectedObject = intersects[0].object;
				addSelectedObject(selectedObject);
				outlinePass.selectedObjects = selectedObjects;
			} else {
				outlinePass.selectedObjects = [];
			}
		}
		animate();
	}
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function animate() {
		render();
	}
	function render() {
		control.update();
		composer.render();
		requestAnimationFrame(animate);
	}



	//添加天空盒
	function addSky() {
		var path = "/seckill/static/assets/img/"; //设置路径
		var directions = [ "bj2", "bj2", "bj2", "bj2", "bj2", "bj2" ]; //获取对象
		var format = ".jpg"; //格式
		//创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
		var skyGeometry = new THREE.BoxGeometry(2000, 2000, 2000);
		//设置盒子材质
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push(new THREE.MeshBasicMaterial({
				map : THREE.ImageUtils.loadTexture(path + directions[i] + format), //将图片纹理贴上
				side : THREE.BackSide /*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
			}));
		var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
		var skyBox = new THREE.Mesh(skyGeometry, skyMaterial); //创建一个完整的天空盒，填入几何模型和材质的参数
		scene.add(skyBox); //在场景中加入天空盒
	}
	
	mode_init();
})