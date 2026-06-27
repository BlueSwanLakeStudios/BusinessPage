from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

driver.get("https://a-rockets.onrender.com/")

print("Website opened successfully")

input("Press Enter to close browser...")

driver.quit()

