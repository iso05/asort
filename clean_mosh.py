from PIL import Image

def clean_bg():
    img = Image.open('public/images/product-mosh-900.png').convert('RGBA')
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # If dark black background frame around mosh package
        if r < 30 and g < 30 and b < 30:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save('public/images/product-mosh-900.png', 'PNG')
    img.save('public/images/product-mosh-900.webp', 'WEBP')
    print("Mosh image cleaned successfully!")

if __name__ == '__main__':
    clean_bg()
