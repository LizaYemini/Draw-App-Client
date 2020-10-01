import { DrawPoly } from './draw-poly';

export class DrawPolyEllipse extends DrawPoly {
    constructor(public locationX: number, public locationY: number, public width: number, public height: number,
        public foreColor: string, public backColor: string) {
        super(locationX, locationY, width, height, foreColor, backColor)
    }

    draw(ctx: any) {
        super.draw(ctx)
        var centerX = this.locationX + 0.5 * (this.width)
        var centerY = this.locationY + 0.5 * (this.height)
        var radiusX = this.width / 2
        var radiusY = this.height / 2
        //ctx.strokeEllipse(centerX, centerY, radiusX, radiusY)
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill()
    }

    stickOut(ctx: any) {
        /*
        super.stickOut(ctx)
        var centerX = this.locationX + 0.5 * (this.width)
        var centerY = this.locationY + 0.5 * (this.height)
        var radiusX = this.width / 2
        var radiusY = this.height / 2
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke(); */
        super.stickOut(ctx)
        //ctx.strokeRect(this.locationX, this.locationY, this.width, this.height)
    }
}
