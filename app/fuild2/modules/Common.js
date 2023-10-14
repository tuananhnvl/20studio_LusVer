"use client"
class Common{
    constructor(){
        this.width = null;
        this.height = null;
        this.aspect = this.width / this.height;
        this.isMobile = false;
        this.breakpoint = 768;

        this.fboWidth = null;
        this.fboHeight = null;

        this.resizeFunc = this.resize.bind(this);

        this.time = 0;
        this.delta = 0;

    }

    init(gl){
      //  this.pixelRatio = window.devicePixelRatio;

        this.resize();

        this.renderer =  gl

        this.renderer.autoClear = false;

        this.renderer.setSize( this.width, this.height );

       // this.renderer.setClearColor( 0x000000 );

       // this.renderer.setPixelRatio(this.pixelRatio);

       // this.clock = new Clock();
       // this.clock.start();
     }

    resize(){
        this.width = window.innerWidth; // document.body.clientWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        if(this.renderer) this.renderer.setSize(this.width, this.height);
    }

   /*  update(){
        this.delta = this.clock.getDelta(); // Math.min(0.01, this.clock.getDelta());
        this.time += this.delta;
    } */
}

export default new Common();