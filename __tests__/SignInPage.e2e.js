const puppeteer = require("puppeteer");

describe("SignInPage", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:8080", { waitUntil: "domcontentloaded" }); // Ожидаем загрузки DOM контента
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Sign In Form Renders Correctly", async () => {
    const header = await page.waitForSelector("h1");
    const headerText = await page.evaluate(
      (header) => header.textContent,
      header,
    );
    expect(headerText).toBe("Sign In");

    const emailInput = await page.waitForSelector("input[name=email]");
    const passwordInput = await page.waitForSelector("input[name=password]");
    const rememberMeCheckbox = await page.waitForSelector(
      "input[name=rememberMe]",
    );
    const submitButton = await page.waitForSelector("button[type=submit]");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(rememberMeCheckbox).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test("Submitting Sign In Form", async () => {
    await page.type("input[name=email]", "malik.hubiev@mail.ru");
    await page.type("input[name=password]", "12345678");
    await page.click("input[name=rememberMe]");
  
    // Ожидаем завершения навигации после клика на кнопку отправки формы
    await page.click("button[type=submit]");
  
    // Ожидаем появления элемента с id "logo" на домашней странице
    await page.waitForSelector("#logo"); // Установка таймаута на 10 секунд
  
    // Проверяем, что элемент с id "logo" присутствует на странице
    const logoElement = await page.$("#logo");
    expect(logoElement).toBeTruthy();
  }); // Увеличиваем тайм-аут теста до 20 секунд
});
