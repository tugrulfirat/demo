#!/bin/bash
CSS_CONTENT=$(cat styles.css)
STYLE_BLOCK="<style>
$CSS_CONTENT
</style>"
for file in *.html; do
  sed "s|<link rel=\"stylesheet\" href=\"styles.css\">|$STYLE_BLOCK|g" "$file" > temp && mv temp "$file"
done
