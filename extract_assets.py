import os
from PIL import Image

def extract_bikes():
    assets_dir = "assets"
    os.makedirs(assets_dir, exist_ok=True)
    
    # 1. Hunter 350 from bikebuddypredict .png (6336 x 4160)
    predict_img_path = "bikebuddypredict .png"
    if os.path.exists(predict_img_path):
        img = Image.open(predict_img_path)
        w, h = img.size
        # Crop Hunter 350 on right banner
        crop_hunter = img.crop((int(w * 0.58), int(h * 0.11), int(w * 0.85), int(h * 0.42)))
        crop_hunter.save(os.path.join(assets_dir, "bike_hero_hunter.png"))
        crop_hunter.save(os.path.join(assets_dir, "bike_prediction_graphic.png"))
        crop_hunter.save(os.path.join(assets_dir, "royal_enfield_hunter.png"))
        print("Saved Hunter 350 images")

    # 2. Yamaha MT-15 from Group 17 (1).png (6336 x 4148)
    find_img_path = "Group 17 (1).png"
    if os.path.exists(find_img_path):
        img = Image.open(find_img_path)
        w, h = img.size
        
        # Yamaha MT-15 top banner cutout
        crop_mt15_banner = img.crop((int(w * 0.58), int(h * 0.09), int(w * 0.82), int(h * 0.37)))
        crop_mt15_banner.save(os.path.join(assets_dir, "bike_find_graphic.png"))

        # Bike card cutouts:
        # Card 1: Yamaha MT-15 V2
        c1 = img.crop((int(w * 0.045), int(h * 0.64), int(w * 0.245), int(h * 0.78)))
        c1.save(os.path.join(assets_dir, "yamaha_mt15.png"))

        # Card 2: TVS Apache RTR 160
        c2 = img.crop((int(w * 0.285), int(h * 0.64), int(w * 0.485), int(h * 0.78)))
        c2.save(os.path.join(assets_dir, "tvs_apache.png"))

        # Card 3: Honda Hornet 2.0
        c3 = img.crop((int(w * 0.515), int(h * 0.64), int(w * 0.715), int(h * 0.78)))
        c3.save(os.path.join(assets_dir, "honda_hornet.png"))

        # Card 4: Royal Enfield Classic 350
        c4 = img.crop((int(w * 0.745), int(h * 0.64), int(w * 0.945), int(h * 0.78)))
        c4.save(os.path.join(assets_dir, "royal_enfield_classic.png"))

        print("Saved all 4 bike card images successfully!")

if __name__ == "__main__":
    extract_bikes()
