import {
  Component,
  OnChanges,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [ './progress-bar.component.scss' ]
})
export class ProgressBarComponent implements OnChanges, AfterViewInit {
  @Input() progress: number = 0;
  @Input() color: string = '';
  // @ts-ignore
  @ViewChild('rect') rect: ElementRef;
  length: number = 0;
  percent: number = 0;
  strokeDasharray: number = 0;
  strokeDashoffset: number = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.length = this.rect.nativeElement.getTotalLength();
      this.strokeDasharray = this.length;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if ( changes.color && this.rect ) {
      // @ts-ignore
      this.rect.nativeElement.style.stroke = changes.color.currentValue;
    }
    // @ts-ignore
    if ( changes.progress ) {
      // @ts-ignore
      this.percent = changes.progress.currentValue / 100;
      this.strokeDashoffset = this.length - this.length * this.percent;
    }
  }

}
