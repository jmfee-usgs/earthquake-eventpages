import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  // page title
  @Input() pageTitle: string;

  // type of product to be shown
  @Input() productType: string;

  // query params can override default product source/code to be shown
  private queryParamMapSubscription: Subscription;

  constructor(
    public contributorService: ContributorService,
    public eventService: EventService,
    public route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.onQueryParamMapChange(paramMap);
    });
  }

  ngOnDestroy () {
    this.queryParamMapSubscription.unsubscribe();
  }

  onQueryParamMapChange (paramMap: ParamMap) {
    const source = paramMap.get('source');
    const code = paramMap.get('code');
    this.eventService.getProduct(this.productType, source, code);
  }

}
