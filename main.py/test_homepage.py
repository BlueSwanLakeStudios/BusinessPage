from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from datetime import datetime
import time

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
driver.maximize_window()
start_time = time.time()
driver.get("https://a-rockets.onrender.com/")
end_time = time.time()

load_time = end_time - start_time

print(f"Page Load Time: {load_time:.2f} seconds")

assert load_time < 10
print("✅ Page Load Time Test Passed")
# Test 1 - Testimonials Section
testimonials = driver.find_element(
    By.XPATH,
    "//*[contains(text(),'Testimonials')]"
)
assert testimonials.is_displayed()
print("✅ Testimonials Test Passed")

# Test 2 - Contact Section
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
scroll_position = driver.execute_script(
    "return window.pageYOffset;"
)

assert scroll_position >= 0
print("✅ Scroll Test Passed")
contact_text = driver.page_source

assert "Contact Us" in contact_text
print("✅ Contact Section Test Passed")

# Test 3 - URL Verification
expected_url = "https://a-rockets.onrender.com/"
actual_url = driver.current_url

assert actual_url == expected_url
print("✅ URL Verification Passed")

# Test 4 - Title Verification
assert len(driver.title) > 0
print("✅ Title Verification Passed")

# Test 5 - Navigation Links
assert driver.find_element(By.LINK_TEXT, "Our Rockets").is_displayed()
assert driver.find_element(By.LINK_TEXT, "Testimonials").is_displayed()
assert driver.find_element(By.LINK_TEXT, "Contact Us").is_displayed()

print("✅ Navigation Links Test Passed")

# Screenshot
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
driver.save_screenshot(f"homepage_{timestamp}.png")
print("✅ Screenshot Saved")
buttons = driver.find_elements(By.TAG_NAME, "button")
print(f"Total Buttons Found: {len(buttons)}")

assert len(buttons) > 0, "No buttons found on page"
print("✅ Button Verification Passed")

time.sleep(3)

driver.quit()
print("✅ Browser Closed Successfully")
time.sleep(3)

driver.quit()
print("✅ Browser Closed Successfully")
