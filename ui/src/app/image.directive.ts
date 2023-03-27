import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { Player, Square } from './app.component';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective implements AfterViewInit {

  @Input() square: Square;
  private svgImage: Svg;

  constructor(el: ElementRef) {
    this.svgImage = SVG(el.nativeElement) as Svg;
  }

  ngAfterViewInit(): void {
    if (this.square.player === Player.x) {
      this.svgImage.attr("href", "/assets/x.svg");
    } else {
      this.svgImage.attr("href", "/assets/o.svg");
    }
  }

}
