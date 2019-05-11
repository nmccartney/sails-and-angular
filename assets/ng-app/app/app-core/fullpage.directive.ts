import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../window-ref.service';

@Directive({
  selector: '[appFullpage]'
})
export class FullpageDirective implements OnInit {

  private _heightOffset: number = 113;
  private _widthOffset: number = 0;
  private _window: ICustomWindow;
  pageSize: { height: number | string, width: number | string } = {
    height: '100px',
    width: '100px'
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const WIN = event.target;
    this.pageSize.width = WIN.innerWidth - this._widthOffset;
    this.pageSize.height = WIN.innerHeight - this._heightOffset;
    this._setSizeStyle(this.pageSize.width,this.pageSize.height);
  }

  constructor(
    private _windowRef: WindowRefService,
    private _elementRef: ElementRef) {
    this._window = _windowRef.nativeWindow;
  }

  ngOnInit() {
    this.pageSize.width = this._window.innerWidth - this._widthOffset;
    this.pageSize.height = this._window.innerHeight - this._heightOffset;
    this._setSizeStyle(this.pageSize.width,this.pageSize.height);
    console.log('window.size',this.pageSize);
  }

  private _setSizeStyle(width,height,display = 'block'){
    this._elementRef.nativeElement.style.display = display +'px';
    this._elementRef.nativeElement.style.height = height +'px';
    this._elementRef.nativeElement.style.width = width +'px';
  }

}
