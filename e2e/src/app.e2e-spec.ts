import { AppPage } from './app.po';
import { browser, logging, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Mateus Durāes as logged user', () => {
    page.navigateTo();
    expect(page.getUserName()).toEqual('Mateus Durāes');
  });

  it('should register a bus', async () => {
    page.navigateTo();
    await element(by.id('input-bus-plate')).sendKeys('BUS-123-456');
    const select = element(by.id('select-station'));
    await select.$('[value="1"]').click();
    const selectBus = element(by.id('select-bus-type'));
    await selectBus.$('[value="Regular"]').click();
    await element(by.buttonText('Register bus')).click();
    const busRegistered = element(by.cssContainingText('td', 'BUS-123-456'));
    const isRegistered = await busRegistered.isPresent();
    expect(isRegistered).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });
});
