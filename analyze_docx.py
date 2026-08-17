import zipfile
import xml.etree.ElementTree as ET
import re
import json

def get_paragraphs(filename):
    with zipfile.ZipFile(filename) as z:
        xml_content = z.read("word/document.xml")
        tree = ET.fromstring(xml_content)
        paragraphs = []
        for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
            texts = [node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text]
            if texts:
                paragraphs.append("".join(texts).strip())
        return [p for p in paragraphs if p]

# Analyze File 1: Fractions
fractions_p = get_paragraphs("Primary_School_Fractions_Question_Bank_205.docx")
print("=== FILE 1: Primary_School_Fractions_Question_Bank_205.docx ===")
print(f"Total Paragraphs: {len(fractions_p)}")
for p in fractions_p[:15]:
    print("  ", p)

# Analyze File 2: Factors 1
factors1_p = get_paragraphs("Primary_Maths_Factors_Multiples_LCM_HCF_200Q (1).docx")
print("\n=== FILE 2: Primary_Maths_Factors_Multiples_LCM_HCF_200Q (1).docx ===")
print(f"Total Paragraphs: {len(factors1_p)}")
for p in factors1_p[:15]:
    print("  ", p)

# Analyze File 3: Factors 2
factors2_p = get_paragraphs("Primary_Maths_Factors_Multiples_LCM_HCF_200Q.docx")
print("\n=== FILE 3: Primary_Maths_Factors_Multiples_LCM_HCF_200Q.docx ===")
print(f"Total Paragraphs: {len(factors2_p)}")
for p in factors2_p[:15]:
    print("  ", p)
