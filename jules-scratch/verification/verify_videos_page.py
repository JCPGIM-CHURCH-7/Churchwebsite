from playwright.sync_api import Page, expect

def test_videos_page(page: Page):
    """
    This test verifies that the /videos page loads correctly and that both
    the YouTube and Daily Message carousels are visible.
    """
    # 1. Arrange: Go to the /videos page.
    page.goto("http://localhost:3000/videos")

    # 2. Assert: Check that the main heading is visible.
    expect(page.get_by_role("heading", name="Videos")).to_be_visible()

    # 3. Assert: Check that the YouTube carousel is visible.
    expect(page.get_by_role("heading", name="YouTube Videos")).to_be_visible()

    # 4. Assert: Check that the Daily Messages carousel is visible.
    expect(page.get_by_role("heading", name="Daily Messages")).to_be_visible()

    # 5. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/videos-page.png")
