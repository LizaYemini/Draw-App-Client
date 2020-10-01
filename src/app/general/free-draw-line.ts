import { point } from './point'

export class FreeDrawLine {
    public start: point
    public end: point
    public foreColor: string
    constructor(start: point, end: point, color: string) {
        this.start = start
        this.end = end
        this.foreColor = color
    }
    draw(ctx: any) {
        ctx.strokeStyle = this.foreColor
        ctx.beginPath();
        ctx.moveTo(this.start.X, this.start.Y)
        ctx.lineTo(this.end.X, this.end.Y)
        ctx.stroke();
    }
}