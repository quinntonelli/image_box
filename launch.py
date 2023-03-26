import webbrowser
import time

#pip install pynput
from pynput.keyboard import Key, Controller as KC
from pynput.mouse import Button,Controller as MC

keyboard = KC()
mouse = MC()

webbrowser.open("https://quinntonelli.github.io")
# webbrowser.open("www.quinntonelli.com/realworld")

keyboard.press(Key.f11)

time.sleep(4)

mouse.click(Button, left, 1)

# REFRESH EVERY X MINUTES
# x = 1
# while True:
#   time.sleep(x*60)
#   keyboard.press(Key.f5)
#   time.sleep(6)
#   mouse.click(Button, left, 1)

print("done")
