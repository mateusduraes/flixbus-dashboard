import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  public currentPage: number = 1;
  @Output() pagerChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalPages: number;
  constructor() {}

  public goPreviousPage(): void {
    if (this.currentPage - 1 < 1) {
      return;
    }
    this.goPage(this.currentPage - 1);
  }

  public goNextPage(): void {
    if (this.currentPage + 1 > this.totalPages) {
      return;
    }
    this.goPage(this.currentPage + 1);
  }

  public goPage(page: number): void {
    this.currentPage = page;
    this.pagerChange.next(this.currentPage);
  }

  ngOnInit() {}
}
