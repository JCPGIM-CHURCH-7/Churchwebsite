from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/daily-grace")
    assert "Jesus Christ Power of Glory International Ministries" in page.title()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
