import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getUserName() {
    return element(by.id('loggeduser-name')).getText() as Promise<string>;
  }
}
