import os
import re

with open('styles.css', 'r') as f:
    css = f.read()

style = f'<style>\n{css}\n</style>'

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r') as f:
            content = f.read()
        content = re.sub(r'<link rel="stylesheet" href="styles.css">', style, content)
        with open(file, 'w') as f:
            f.write(content)
