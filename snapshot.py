import requests
from bs4 import BeautifulSoup

# Step 1: Replace this with any website URL you want to test
url = "https://www.notion.so/pricing"

# Step 2: Fetch the page
res = requests.get(url)

# Step 3: Parse it
soup = BeautifulSoup(res.text, "html.parser")

# Step 4: Grab all paragraph text
text = " ".join([p.get_text() for p in soup.find_all("p")])

# Step 5: Save it as a snapshot
with open("snapshot_day2.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("✅ Snapshot saved to snapshot_day2.txt")
