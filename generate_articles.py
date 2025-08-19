import os
import json

articles_dir = "articles"
articles = []

for file in os.listdir(articles_dir):
    if file.endswith(".html"):
        date_part = file[:10]  # Extract YYYY-MM-DD from filename
        title_part = file[11:].replace("-", " ").replace(".html", "").title()
        articles.append({"date": date_part, "title": title_part, "file": file})

# Save to JSON
with open("articles.json", "w") as f:
    json.dump(articles,f, indent=4)

print("Generated articles.json successfully!")
