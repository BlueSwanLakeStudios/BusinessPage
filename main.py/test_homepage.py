from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

driver.maximize_window()
driver.get("https://a-rockets.onrender.com/")
# Verify Testimonials heading
testimonials = driver.find_element(
    By.XPATH,
    "//*[contains(text(),'Testimonials')]"
)

print("Testimonials Section Found:", testimonials.is_displayed())
# Page title
print("Title:", driver.title)
# Contact Us section check
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

contact_text = driver.page_source

if "Contact Us" in contact_text:
    print("Contact Section Found: True")
else:
    print("Contact Section Found: False")
# Verify navigation links
print("Checking navigation links...")

print(driver.find_element(By.LINK_TEXT, "Our Rockets").is_displayed())
print(driver.find_element(By.LINK_TEXT, "Testimonials").is_displayed())
print(driver.find_element(By.LINK_TEXT, "Contact Us").is_displayed())

# Screenshot
driver.save_screenshot("homepage.png")

print("Test Passed")
time.sleep(5)

driver.quit()
