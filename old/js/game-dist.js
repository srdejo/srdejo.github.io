;(function(){

	class Ramdon{

		static get(inicio, final){
			return Math.floor(Math.random() * final) + inicio
		}

	}

	class Food{
		constructor(x,y){
			this.x = x
			this.y = y

			this.width = 10
			this.height = 10
		}

		draw(){
			ctx.fillRect(this.x,this.y,this.width,this.height)
		}

		static generate(){
			return new Food(Ramdon.get(0,500),Ramdon.get(0,300))
		}

	}

	class Square{
		constructor(x,y){
			this.x = x;
			this.y = y;
			this.width = 10
			this.height = 10
			this.back  = null // Cuadrado de atras
		}

		draw(){
			ctx.fillRect(this.x,this.y,this.width,this.height)
			if(this.hasBack()){
				this.back.draw()
			}
		}

		add(){
			if(this.hasBack()) return this.back.add()
			this.back = new Square(this.x,this.y)
		}

		hasBack(){
			return this.back !== null
		}

		copy(){
			if (this.hasBack()) {
				this.back.copy()
				this.back.x = this.x;
				this.back.y = this.y;
			}
		}

		right(){
			this.copy()
			this.x += 10
		}

		left(){
			this.copy()
			this.x -= 10
		}

		up(){
			this.copy()
			this.y -= 10
		}

		down(){
			this.copy()
			this.y += 10
		}

		hit(head,segundo = false){
			if(this === head && !this.hasBack()) return false
			if(this === head) return this.back.hit(head, true)

			if(segundo && !this.hasBack()) return false
			if(segundo) return this.back.hit(head)

			//No es ni la cabeza ni el segundo
			if(this.hasBack()){
				return squareHit(this,head) || this.back.hit(head)
			}

			
			return squareHit(this,head)
		}

		hitBorder(){
			return this.x > 490  || this.x < 0 || this.y > 290 || this.y < 0
		}
	}

	class Snake{
		constructor(){
			this.head = new Square(100,0)
			this.draw()
			this.direction = "right"
			this.head.add();
			this.head.add();
			this.head.add();
			this.head.add();
			this.head.add();
		}

		draw(){
			this.head.draw();
		}

		right(){
			if(this.direction === "left") return;
			this.direction = "right"
		}

		left(){
			if(this.direction === "right") return;
			this.direction = "left"
		}

		up(){
			if(this.direction === "down") return;
			this.direction = "up"
		}

		down(){
			if(this.direction === "up") return;
			this.direction = "down"
		}

		move(){
			if(this.direction === "up") return this.head.up() 
			if(this.direction === "down") return this.head.down()
			if(this.direction === "left") return this.head.left()
			if(this.direction === "right") return this.head.right()
		}

		eat(){
			puntos++;
			this.head.add();
			document.getElementById("puntaje").innerHTML = puntos
		}

		dead(){
			return this.head.hit(this.head) || this.head.hitBorder()
			
		}

	}
	const  canvas=document.getElementById('canvas')
	const ctx=canvas.getContext('2d')
	let puntos = 0;
	const snake = new Snake();
	let foods = [];

	window.addEventListener("keydown",function(e){
		if(e.keyCode > 36 && e.keyCode < 41) e.preventDefault()

		if(e.keyCode === 40) return snake.down() 
		if(e.keyCode === 39) return snake.right()
		if(e.keyCode === 38) return snake.up()
		if(e.keyCode === 37) return snake.left()
		return false;
	})

	const animacion = setInterval(function(){
		snake.move()
		ctx.clearRect(0,0,canvas.width,canvas.height)
		snake.draw()
		drawFood()

		if(snake.dead()){
			document.getElementById("resultado").innerHTML = "Perdiste, <small> Tu puntaje fue: "+puntos+"</small>"
			window.clearInterval(animacion)

		}
	},1000 / 20)

	setInterval(function(){
		const food = Food.generate()
		foods.push(food)
		setTimeout(function(){
			removeFood(food)
		},10000)
	},1000)

	function drawFood() {
		for(const index in foods){
			const food = foods[index]

			if (typeof food !== "undefined") {
				food.draw()
			}

			if(hit(food,snake.head)){
				snake.eat()
				removeFood(food)
			}
		}
	}

	function removeFood(food){
		foods = foods.filter(function(f){
			return food !== f
		})
	}

	function squareHit(cuadrado_uno, cuadrado_dos){

	return cuadrado_uno.x == cuadrado_dos.x && cuadrado_uno.y == cuadrado_dos.y
	}

	function hit(a,b){
    var hit = false;
    //Colsiones horizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width)
    {
      //Colisiones verticales
      if(b.y + b.height >= a.y && b.y < a.y + a.height)
        hit = true;
    }
    //Colisión de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width)
    {
      if(b.y <= a.y && b.y + b.height >= a.y + a.height)
        hit = true;
    }
    //Colisión b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width)
    {
      if(a.y <= b.y && a.y + a.height >= b.y + b.height)
        hit = true;
    }
    return hit;
  }

})()
