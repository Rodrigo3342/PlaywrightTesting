import { test, expect } from '@playwright/test';

test('buy item', async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.bo/");
  await page.locator("input[id='cb1-edit']").fill("iphone")
  await page.locator("button[class='nav-search-btn']").click();

  await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible();
  //await page.locator("//ol[contains(@class, 'ui-search-layout')]").waitFor();
  await page.locator("//ol[contains(@class, 'ui-search-layout')]").getByRole('listitem').first().click();
  await page.getByRole("button", {name: "Comprar ahora"}).click();
  await page.pause();
});

test('web scrapping', async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.bo/");
  await page.locator("input[id='cb1-edit']").fill("iphone")
  await page.locator("button[class='nav-search-btn']").click();

  await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible();
  //await page.locator("//ol[contains(@class, 'ui-search-layout')]").waitFor();
  const titles = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//h3").allInnerTexts();
  for(let title of titles){
    console.log(title);
  }
});
