import { Component, OnInit, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { WindowRef } from '@shared/window-ref-wrapper';
import { FeltReportResponse } from './../felt-report-response';

declare let window: any;
declare let FB: any;

@Component({
  selector: 'success-response',
  styleUrls: ['./success-response.component.scss'],
  templateUrl: './success-response.component.html'
})
export class SuccessResponseComponent implements OnInit {
  static FB_SDK_URL = '//connect.facebook.net/en_US/sdk.js';

  // global window.location.href reference
  _windowHref: string;
  // The response data model
  @Input()
  response: FeltReportResponse;
  // whether or not we have the facebook sdk
  sdkStatus = false;

  constructor(public meta: Meta, public windowReference: WindowRef) {}

  /**
   * Load Facebook SDK and set facebook app settings
   */
  loadFacebookSdk(): void {
    // Initialize the facebook app
    window.fbAsyncInit = () => {
      FB.init({
        appId: '333236657410303',
        autoLogAppEvents: true,
        version: 'v2.10',
        xfbml: true
      });
      this.sdkStatus = true;
    };
    // Load the Facebook SDK
    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = SuccessResponseComponent.FB_SDK_URL;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  ngOnInit() {
    this._windowHref = this.windowReference.nativeWindow.location.href;

    this.meta.addTags([
      {
        content: this._windowHref,
        property: 'og:url'
      },
      {
        content: 'website',
        property: 'og:type'
      },
      {
        content: '',
        property: 'og:title'
      }
    ]);

    this.loadFacebookSdk();
  }

  /**
   * Click listener on the facebook share button
   * @param e
   *      The click event
   */
  onSocialClick(e): void {
    e.preventDefault();
    this.showFacebookSharePopup();
  }
  /**
   * Show facebook share popup
   */
  showFacebookSharePopup(): void {
    const message = `
      Did You Feel It? My estimated intensity was: ${this.response.your_cdi}
    `;
    if (this.sdkStatus) {
      FB.ui({
        action_properties: JSON.stringify({
          object: {
            'og:description': this.meta.getTag('property="og:title"').content,
            'og:title': message,
            'og:url': this._windowHref
          }
        }),
        action_type: 'og.shares',
        href: this._windowHref,
        method: 'share_open_graph'
      });
    }
  }
}
