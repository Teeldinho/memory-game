import { expect, test, type Page } from "@playwright/test";

import {
  HOME_VIEWPORTS,
  MOCK_CONTENTFUL_RESPONSE,
} from "./fixtures/contentfulCards";

const HOME_ROUTE = "/";
const GAME_ROUTE = "/game";
const PLAYER_ONE_NAME = "Alice";
const PLAYER_TWO_NAME = "Bob";
const MEMORY_PREVIEW_DURATION_MS = 5200;
const MAX_ALLOWED_OVERFLOW_PX = 1;

const mockContentfulCards = async (page: Page) => {
  await page.route("https://graphql.contentful.com/**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      status: 200,
      body: JSON.stringify(MOCK_CONTENTFUL_RESPONSE),
    });
  });
};

for (const viewport of HOME_VIEWPORTS) {
  test(`home layout has no horizontal overflow on ${viewport.label}`, async ({
    page,
  }) => {
    await mockContentfulCards(page);
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto(HOME_ROUTE);

    const overflowWidth = await page.evaluate(() => {
      const htmlOverflow =
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth;
      const bodyOverflow =
        document.body.scrollWidth - document.body.clientWidth;

      return Math.max(htmlOverflow, bodyOverflow);
    });

    expect(overflowWidth).toBeLessThanOrEqual(MAX_ALLOWED_OVERFLOW_PX);
  });
}

test("exit button is hidden on home and works in game flow", async ({
  page,
}) => {
  await mockContentfulCards(page);
  await page.setViewportSize({ width: 1080, height: 810 });
  await page.goto(HOME_ROUTE);

  await expect(page.getByRole("button", { name: "Exit Game" })).toHaveCount(0);

  await page.getByPlaceholder("Name of Player 1").fill(PLAYER_ONE_NAME);
  await page.getByPlaceholder("Name of Player 2").fill(PLAYER_TWO_NAME);
  await page.getByRole("button", { name: "Let's Play" }).click();

  await expect(page).toHaveURL(new RegExp(`${GAME_ROUTE}$`));
  await expect(page.getByRole("button", { name: "Exit Game" })).toBeVisible();

  await page.getByRole("button", { name: "Exit Game" }).click();
  await expect(page).toHaveURL(new RegExp(`${HOME_ROUTE}$`));
});

test("game can complete and show winner announcement", async ({ page }) => {
  await mockContentfulCards(page);
  await page.setViewportSize({ width: 1080, height: 810 });
  await page.goto(HOME_ROUTE);

  await page.getByPlaceholder("Name of Player 1").fill(PLAYER_ONE_NAME);
  await page.getByPlaceholder("Name of Player 2").fill(PLAYER_TWO_NAME);
  await page.getByRole("button", { name: "Let's Play" }).click();

  await expect(page).toHaveURL(new RegExp(`${GAME_ROUTE}$`));

  await page.waitForTimeout(MEMORY_PREVIEW_DURATION_MS);

  const cards = page.locator("div.group");
  await expect(cards).toHaveCount(2);

  await cards.nth(0).click();
  await cards.nth(1).click();

  await expect(page.getByText("Well Done!")).toBeVisible();
  await expect(page.locator("h1", { hasText: PLAYER_ONE_NAME })).toBeVisible();
});
