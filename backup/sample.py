import time
import re
from selenium import webdriver
from selenium.webdriver.common.alert import Alert

driver = webdriver.Chrome("C:\DRIVERS\chromedriver.exe")
driver.get("C:\work2\index.html")

file_name = "{}.png".format("001")

time.sleep(2)
p_element = driver.find_element_by_id('101')
element = p_element.find_element_by_class_name('fee')

#element.send_keys(input_data['value'])


# txt_elements = driver.find_elements_by_class_name('txt')
# for element in txt_elements:
#     element.send_keys("test1")

# 単一の要素を取得
driver.find_element_by_id('btn01').click()

# アラートボタン押下
Alert(driver).accept()

# ウィンドウサイズとズームを設定
driver.set_window_size(1250, 1036)
driver.execute_script("document.body.style.zoom='90%'")

# 読み込み待機時間
# time.sleep(2)


element = driver.find_element_by_class_name('fee')
values = element.get_attribute("value")
print(values)

# imagesフォルダにスクリーンショットを保存
driver.save_screenshot("./images/" + file_name)

# 終了
driver.close()