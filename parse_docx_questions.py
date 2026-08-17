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

# 1. PARSE FRACTIONS (205 Questions)
fractions_p = get_paragraphs("Primary_School_Fractions_Question_Bank_205.docx")
fractions_qs = []
current_level = "primary"

i = 0
while i < len(fractions_p):
    p = fractions_p[i]
    if "Part 1: Simple Level" in p:
        current_level = "primary"
    elif "Part 2: Average Level" in p:
        current_level = "jss"
    elif "Part 3: Hard Level" in p:
        current_level = "sss"
        
    q_match = re.match(r"^(\d+)[\.\)]\s*(.+)", p)
    if q_match:
        q_num = q_match.group(1)
        q_text = q_match.group(2)
        opts = []
        ans_letter = None
        
        j = i + 1
        while j < len(fractions_p):
            line = fractions_p[j]
            ans_match = re.match(r"^Answer:\s*([A-D])", line, re.IGNORECASE)
            if ans_match:
                ans_letter = ans_match.group(1).upper()
                j += 1
                break
            if re.match(r"^\d+[\.\)]", line) or "Part " in line:
                break
            
            parts = re.split(r"\s*([A-D][\)\.])\s*", line)
            if len(parts) >= 9:
                opts = [parts[k].strip() for k in range(2, len(parts), 2)][:4]
            elif re.match(r"^[A-D][\)\.]\s*(.+)", line):
                opts.append(re.match(r"^[A-D][\)\.]\s*(.+)", line).group(1).strip())
            j += 1
            
        if opts and ans_letter:
            c_idx = ord(ans_letter) - ord("A")
            fractions_qs.append({
                "id": f"frac_{q_num}",
                "level": current_level,
                "topic": "Fractions",
                "question": q_text,
                "options": opts[:4],
                "correctIndex": c_idx if c_idx < len(opts) else 0,
                "explanation": f"Topic: Fractions. Correct answer is Option {ans_letter}."
            })
        i = j - 1
    i += 1

print(f"Total Fractions Qs Parsed: {len(fractions_qs)}")

# 2. PARSE FACTORS / MULTIPLES / LCM / HCF (200 Questions)
factors_p = get_paragraphs("Primary_Maths_Factors_Multiples_LCM_HCF_200Q (1).docx")

# Build Answer Key
ak_map = {1: "B"}
in_ak = False
for idx, line in enumerate(factors_p):
    if idx > 50 and "ANSWER KEY" in line.upper():
        in_ak = True
        continue
    if in_ak:
        matches = re.findall(r"(\d+)[\.\)]\s*([A-D])", line)
        for num_str, letter in matches:
            ak_map[int(num_str)] = letter

factors_qs = []
current_level = "primary"

for idx, p in enumerate(factors_p):
    if idx > 50 and "ANSWER KEY" in p.upper():
        break
        
    if "SECTION A: SIMPLE LEVEL" in p.upper() or "GRADES 1–2" in p.upper():
        current_level = "primary"
    elif "SECTION B: AVERAGE LEVEL" in p.upper() or "GRADES 3–4" in p.upper():
        current_level = "jss"
    elif "SECTION C: HARD LEVEL" in p.upper() or "GRADES 5–6" in p.upper():
        current_level = "sss"
        
    q_match = re.match(r"^(?:\*\s*)?Q?(\d+)[\.\)]\s*(.+)", p, re.IGNORECASE)
    if q_match:
        q_num = int(q_match.group(1))
        q_text = q_match.group(2)
        
        # Check next line for options
        if idx + 1 < len(factors_p):
            line = factors_p[idx + 1]
            parts = re.split(r"\s*([A-D][\)\.])\s*", line)
            if len(parts) >= 9:
                opts = [parts[k].strip() for k in range(2, len(parts), 2)][:4]
                ans_letter = ak_map.get(q_num, "B")
                c_idx = ord(ans_letter) - ord("A")
                factors_qs.append({
                    "id": f"fact_{q_num}",
                    "level": current_level,
                    "topic": "Factors, Multiples, LCM & HCF",
                    "question": q_text,
                    "options": opts[:4],
                    "correctIndex": c_idx if c_idx < len(opts) else 0,
                    "explanation": f"Topic: Factors, Multiples, LCM & HCF. Correct answer is Option {ans_letter}."
                })

print(f"Total Factors/LCM/HCF Qs Parsed: {len(factors_qs)}")

all_questions = fractions_qs + factors_qs
print(f"TOTAL COMBINED QUESTIONS FROM DOCX FILES: {len(all_questions)}")

# Write to questions-data.js
js_content = f"export const SAMPLE_200_QUIZZES = {json.dumps(all_questions, indent=2)};"
with open("questions-data.js", "w") as f:
    f.write(js_content)

print("Successfully written all parsed DOCX questions to questions-data.js!")
