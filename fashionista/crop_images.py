from PIL import Image
import os

img_path = "/Users/tugrulfirat/designs/fashionista/assets/images/luxury_silk_blouse_1770030139179.png"
output_dir = "/Users/tugrulfirat/designs/fashionista/assets/images/"

img = Image.open(img_path)
width, height = img.size

# Based on the visual, the images are in a horizontal row in the middle.
# Let's crop the 3 main frames tightly.
# Each frame is roughly 1/3 of the width and centered vertically.

# Frame coordinates (approximate based on standard AI composite layout)
# We will crop them to be 1024 x 1365 (standard portrait) or similar if possible, 
# but here we'll just extract the square-ish blocks and make them portrait by vertical extension or cropping.

# Better: Just extract the 3 squares and save them.
frames = [
    (35, 315, 335, 715),   # Left
    (345, 315, 645, 715),  # Center
    (655, 315, 955, 715)   # Right
]

for i, coords in enumerate(frames):
    cropped = img.crop(coords)
    # Resize to portrait 4:5 ratio for luxury feel
    portrait = Image.new('RGB', (300, 400), (248, 246, 240)) # Cream background
    portrait.paste(cropped, (0, 50))
    portrait.save(os.path.join(output_dir, f"silk_blouse_view_{i+1}.png"))

print("Cropped 3 images successfully.")
