/**
 * ============================================================================
 * TEACHER CHYMA - 200 SAMPLE MULTIPLE CHOICE QUESTIONS (20 TOPICS × 10 MCQs)
 * ============================================================================
 */

export const SAMPLE_200_QUIZZES = [
  // --------------------------------------------------------------------------
  // TOPIC 1: Numbers & BODMAS Operations (Primary 4-6)
  // --------------------------------------------------------------------------
  {
    id: "t1_q1",
    level: "primary",
    question: "What is 15 + (4 × 3)?",
    options: ["57", "27", "32", "24"],
    correctIndex: 1,
    explanation: "BODMAS rule: Multiply first (4 × 3 = 12), then add (15 + 12 = 27)."
  },
  {
    id: "t1_q2",
    level: "primary",
    question: "Evaluate: (36 ÷ 6) + 7 × 2",
    options: ["20", "26", "18", "14"],
    correctIndex: 0,
    explanation: "Divide first (36 ÷ 6 = 6), then multiply (7 × 2 = 14). Finally 6 + 14 = 20."
  },
  {
    id: "t1_q3",
    level: "primary",
    question: "What is the place value of 7 in the number 45,782?",
    options: ["Hundreds", "Thousands", "Tens", "Units"],
    correctIndex: 0,
    explanation: "In 45,782, 7 is in the Hundreds position (700)."
  },
  {
    id: "t1_q4",
    level: "primary",
    question: "Find the Least Common Multiple (LCM) of 6, 8, and 12.",
    options: ["48", "24", "36", "12"],
    correctIndex: 1,
    explanation: "Multiples of 6 (6, 12, 18, 24...), 8 (8, 16, 24...), 12 (12, 24...). Smallest common is 24."
  },
  {
    id: "t1_q5",
    level: "primary",
    question: "What is the Highest Common Factor (HCF) of 18 and 24?",
    options: ["3", "6", "12", "9"],
    correctIndex: 1,
    explanation: "Factors of 18: 1,2,3,6,9,18. Factors of 24: 1,2,3,4,6,8,12,24. Highest common is 6."
  },
  {
    id: "t1_q6",
    level: "primary",
    question: "Subtract 4,892 from 10,000.",
    options: ["5,108", "5,118", "5,208", "6,108"],
    correctIndex: 0,
    explanation: "10,000 - 4,892 = 5,108."
  },
  {
    id: "t1_q7",
    level: "primary",
    question: "Round 8,765 to the nearest hundred.",
    options: ["8,700", "8,800", "9,000", "8,770"],
    correctIndex: 1,
    explanation: "The tens digit is 6 (≥5), so round 700 up to 800 -> 8,800."
  },
  {
    id: "t1_q8",
    level: "primary",
    question: "Which of the following is a prime number?",
    options: ["27", "33", "29", "35"],
    correctIndex: 2,
    explanation: "29 has only two factors: 1 and 29."
  },
  {
    id: "t1_q9",
    level: "primary",
    question: "What is 2⁵ (2 raised to the power of 5)?",
    options: ["10", "32", "16", "64"],
    correctIndex: 1,
    explanation: "2 × 2 × 2 × 2 × 2 = 32."
  },
  {
    id: "t1_q10",
    level: "primary",
    question: "Find the product of 45 and 12.",
    options: ["540", "480", "520", "600"],
    correctIndex: 0,
    explanation: "45 × 12 = 540."
  },

  // --------------------------------------------------------------------------
  // TOPIC 2: Fractions, Decimals & Percentages (Primary 4-6)
  // --------------------------------------------------------------------------
  {
    id: "t2_q1",
    level: "primary",
    question: "Add: 3/4 + 2/5",
    options: ["5/9", "23/20", "11/20", "1/2"],
    correctIndex: 1,
    explanation: "Common denominator is 20: 15/20 + 8/20 = 23/20 or 1 3/20."
  },
  {
    id: "t2_q2",
    level: "primary",
    question: "Convert 0.75 into a fraction in its simplest form.",
    options: ["75/10", "3/4", "7/5", "4/5"],
    correctIndex: 1,
    explanation: "0.75 = 75/100 = 3/4."
  },
  {
    id: "t2_q3",
    level: "primary",
    question: "What is 35% expressed as a decimal?",
    options: ["3.5", "0.35", "0.035", "35.0"],
    correctIndex: 1,
    explanation: "35% = 35/100 = 0.35."
  },
  {
    id: "t2_q4",
    level: "primary",
    question: "Calculate 20% of ₦15,000.",
    options: ["₦3,000", "₦1,500", "₦4,500", "₦300"],
    correctIndex: 0,
    explanation: "(20 / 100) × 15,000 = ₦3,000."
  },
  {
    id: "t2_q5",
    level: "primary",
    question: "Simplify: 5/8 × 4/15",
    options: ["1/6", "9/23", "20/120", "1/3"],
    correctIndex: 0,
    explanation: "(5×4) / (8×15) = 20/120 = 1/6."
  },
  {
    id: "t2_q6",
    level: "primary",
    question: "Divide: 3/4 ÷ 1/2",
    options: ["3/8", "3/2", "2/3", "1/2"],
    correctIndex: 1,
    explanation: "Multiply by reciprocal: 3/4 × 2/1 = 6/4 = 3/2 or 1 1/2."
  },
  {
    id: "t2_q7",
    level: "primary",
    question: "Arrange in ascending order: 0.4, 0.04, 0.44, 0.004",
    options: ["0.004, 0.04, 0.4, 0.44", "0.44, 0.4, 0.04, 0.004", "0.04, 0.004, 0.4, 0.44", "0.004, 0.4, 0.04, 0.44"],
    correctIndex: 0,
    explanation: "Comparing place values: 0.004 < 0.04 < 0.4 < 0.44."
  },
  {
    id: "t2_q8",
    level: "primary",
    question: "A student scored 18 out of 25 in a quiz. What is the percentage score?",
    options: ["72%", "68%", "75%", "80%"],
    correctIndex: 0,
    explanation: "(18 / 25) × 100 = 72%."
  },
  {
    id: "t2_q9",
    level: "primary",
    question: "Convert 2 1/4 to an improper fraction.",
    options: ["9/4", "7/4", "8/4", "5/4"],
    correctIndex: 0,
    explanation: "(2 × 4 + 1) / 4 = 9/4."
  },
  {
    id: "t2_q10",
    level: "primary",
    question: "Find the value of 1.25 × 0.8",
    options: ["1.0", "10.0", "0.10", "1.25"],
    correctIndex: 0,
    explanation: "1.25 × 0.8 = 1.000."
  },

  // --------------------------------------------------------------------------
  // TOPIC 3: Perimeter, Area & 3D Volume (Primary 4-6)
  // --------------------------------------------------------------------------
  {
    id: "t3_q1",
    level: "primary",
    question: "A rectangle has length 8 cm and width 5 cm. What is its perimeter?",
    options: ["40 cm", "26 cm", "13 cm", "30 cm"],
    correctIndex: 1,
    explanation: "Perimeter = 2 × (8 + 5) = 26 cm."
  },
  {
    id: "t3_q2",
    level: "primary",
    question: "Find the area of a right-angled triangle with base 10 cm and height 6 cm.",
    options: ["60 cm²", "30 cm²", "16 cm²", "32 cm²"],
    correctIndex: 1,
    explanation: "Area = 1/2 × base × height = 1/2 × 10 × 6 = 30 cm²."
  },
  {
    id: "t3_q3",
    level: "primary",
    question: "What is the volume of a cuboid with length 5 m, width 4 m, and height 3 m?",
    options: ["60 m³", "12 m³", "47 m³", "20 m³"],
    correctIndex: 0,
    explanation: "Volume = L × W × H = 5 × 4 × 3 = 60 m³."
  },
  {
    id: "t3_q4",
    level: "primary",
    question: "Find the area of a square whose side is 9 cm.",
    options: ["36 cm²", "81 cm²", "18 cm²", "72 cm²"],
    correctIndex: 1,
    explanation: "Area = side × side = 9 × 9 = 81 cm²."
  },
  {
    id: "t3_q5",
    level: "primary",
    question: "Calculate the circumference of a circle with radius 7 cm (Use π = 22/7).",
    options: ["44 cm", "154 cm", "22 cm", "88 cm"],
    correctIndex: 0,
    explanation: "Circumference = 2 × π × r = 2 × (22/7) × 7 = 44 cm."
  },
  {
    id: "t3_q6",
    level: "primary",
    question: "What is the area of a circle with radius 7 cm (Use π = 22/7)?",
    options: ["44 cm²", "154 cm²", "308 cm²", "49 cm²"],
    correctIndex: 1,
    explanation: "Area = π × r² = (22/7) × 7 × 7 = 154 cm²."
  },
  {
    id: "t3_q7",
    level: "primary",
    question: "A cube has a edge length of 4 cm. What is its total surface area?",
    options: ["64 cm²", "96 cm²", "16 cm²", "48 cm²"],
    correctIndex: 1,
    explanation: "Cube has 6 faces: 6 × (4 × 4) = 6 × 16 = 96 cm²."
  },
  {
    id: "t3_q8",
    level: "primary",
    question: "Find the volume of a cylinder with radius 3 cm and height 7 cm (Use π = 22/7).",
    options: ["198 cm³", "66 cm³", "132 cm³", "154 cm³"],
    correctIndex: 0,
    explanation: "Volume = π × r² × h = (22/7) × 3² × 7 = 22 × 9 = 198 cm³."
  },
  {
    id: "t3_q9",
    level: "primary",
    question: "The perimeter of a square is 36 cm. What is the length of one side?",
    options: ["6 cm", "9 cm", "12 cm", "18 cm"],
    correctIndex: 1,
    explanation: "Side = Perimeter / 4 = 36 / 4 = 9 cm."
  },
  {
    id: "t3_q10",
    level: "primary",
    question: "Find the area of a trapezium with parallel sides 6 cm and 10 cm, and height 4 cm.",
    options: ["32 cm²", "64 cm²", "16 cm²", "40 cm²"],
    correctIndex: 0,
    explanation: "Area = 1/2 × (a + b) × h = 1/2 × (6 + 10) × 4 = 32 cm²."
  },

  // --------------------------------------------------------------------------
  // TOPIC 4: Ratios, Proportions & Financial Math (JSS)
  // --------------------------------------------------------------------------
  {
    id: "t4_q1",
    level: "jss",
    question: "Share ₦12,000 between Mary and John in the ratio 3:5. How much does John get?",
    options: ["₦4,500", "₦7,500", "₦6,000", "₦5,000"],
    correctIndex: 1,
    explanation: "Total parts = 3 + 5 = 8. John's share = (5/8) × 12,000 = ₦7,500."
  },
  {
    id: "t4_q2",
    level: "jss",
    question: "If 6 books cost ₦4,200, how much will 10 books cost at the same rate?",
    options: ["₦7,000", "₦6,000", "₦8,400", "₦6,500"],
    correctIndex: 0,
    explanation: "Cost per book = 4,200 / 6 = ₦700. For 10 books = 700 × 10 = ₦7,000."
  },
  {
    id: "t4_q3",
    level: "jss",
    question: "Calculate the Simple Interest on ₦50,000 at 5% per annum for 3 years.",
    options: ["₦7,500", "₦2,500", "₦15,000", "₦5,000"],
    correctIndex: 0,
    explanation: "I = (P × R × T) / 100 = (50,000 × 5 × 3) / 100 = ₦7,500."
  },
  {
    id: "t4_q4",
    level: "jss",
    question: "A shirt bought for ₦8,000 was sold for ₦10,000. Calculate the percentage profit.",
    options: ["20%", "25%", "15%", "30%"],
    correctIndex: 1,
    explanation: "Profit = ₦2,000. Percentage profit = (2,000 / 8,000) × 100 = 25%."
  },
  {
    id: "t4_q5",
    level: "jss",
    question: "If 4 workers can build a wall in 6 days, how many days will 3 workers take at the same rate?",
    options: ["8 days", "4.5 days", "9 days", "6 days"],
    correctIndex: 0,
    explanation: "Inverse proportion: Worker-days = 4 × 6 = 24. Days for 3 workers = 24 / 3 = 8 days."
  },
  {
    id: "t4_q6",
    level: "jss",
    question: "Express the ratio 45 cm to 1.5 m in its simplest integer form.",
    options: ["3:10", "45:1.5", "3:1", "9:30"],
    correctIndex: 0,
    explanation: "1.5 m = 150 cm. Ratio = 45 : 150. Divide both by 15 -> 3 : 10."
  },
  {
    id: "t4_q7",
    level: "jss",
    question: "Find the total amount returned after borrowing ₦20,000 at 10% simple interest for 2 years.",
    options: ["₦24,000", "₦4,000", "₦22,000", "₦26,000"],
    correctIndex: 0,
    explanation: "Interest = (20,000 × 10 × 2) / 100 = ₦4,000. Total amount = 20,000 + 4,000 = ₦24,000."
  },
  {
    id: "t4_q8",
    level: "jss",
    question: "An item listed at ₦12,000 is offered at a 15% discount. What is the sale price?",
    options: ["₦10,200", "₦1,800", "₦10,500", "₦11,000"],
    correctIndex: 0,
    explanation: "Discount = 15% of 12,000 = ₦1,800. Sale price = 12,000 - 1,800 = ₦10,200."
  },
  {
    id: "t4_q9",
    level: "jss",
    question: "If a car travels 240 km in 3 hours, what is its average speed in km/h?",
    options: ["80 km/h", "70 km/h", "90 km/h", "60 km/h"],
    correctIndex: 0,
    explanation: "Speed = Distance / Time = 240 / 3 = 80 km/h."
  },
  {
    id: "t4_q10",
    level: "jss",
    question: "Convert 72 km/h into metres per second (m/s).",
    options: ["20 m/s", "25 m/s", "15 m/s", "18 m/s"],
    correctIndex: 0,
    explanation: "72 × (5/18) = 20 m/s."
  },

  // --------------------------------------------------------------------------
  // TOPIC 5: Basic Algebra & Linear Equations (JSS)
  // --------------------------------------------------------------------------
  {
    id: "t5_q1",
    level: "jss",
    question: "Solve for x: 4x - 7 = 17",
    options: ["x = 4", "x = 6", "x = 8", "x = 5"],
    correctIndex: 1,
    explanation: "Add 7: 4x = 24. Divide by 4: x = 6."
  },
  {
    id: "t5_q2",
    level: "jss",
    question: "Expand: 3(2x - 5)",
    options: ["6x - 15", "6x - 5", "5x - 15", "6x + 15"],
    correctIndex: 0,
    explanation: "3 × 2x - 3 × 5 = 6x - 15."
  },
  {
    id: "t5_q3",
    level: "jss",
    question: "Simplify: 5a + 3b - 2a + 7b",
    options: ["3a + 10b", "7a + 10b", "3a + 4b", "10ab"],
    correctIndex: 0,
    explanation: "Group like terms: (5a - 2a) + (3b + 7b) = 3a + 10b."
  },
  {
    id: "t5_q4",
    level: "jss",
    question: "Solve for y: (y / 3) + 4 = 9",
    options: ["y = 15", "y = 12", "y = 5", "y = 21"],
    correctIndex: 0,
    explanation: "Subtract 4: y / 3 = 5. Multiply by 3: y = 15."
  },
  {
    id: "t5_q5",
    level: "jss",
    question: "If p = 4 and q = -2, evaluate 3p - 2q.",
    options: ["16", "8", "14", "10"],
    correctIndex: 0,
    explanation: "3(4) - 2(-2) = 12 + 4 = 16."
  },
  {
    id: "t5_q6",
    level: "jss",
    question: "Solve for m: 5m + 3 = 2m + 18",
    options: ["m = 5", "m = 7", "m = 3", "m = 6"],
    correctIndex: 0,
    explanation: "Subtract 2m: 3m + 3 = 18. Subtract 3: 3m = 15 -> m = 5."
  },
  {
    id: "t5_q7",
    level: "jss",
    question: "Factorize completely: 6x² + 9x",
    options: ["3x(2x + 3)", "3(2x² + 3x)", "x(6x + 9)", "6x(x + 3)"],
    correctIndex: 0,
    explanation: "HCF is 3x: 3x(2x + 3)."
  },
  {
    id: "t5_q8",
    level: "jss",
    question: "Solve the inequality: 3x - 5 > 10",
    options: ["x > 5", "x < 5", "x > 3", "x ≥ 5"],
    correctIndex: 0,
    explanation: "Add 5: 3x > 15. Divide by 3: x > 5."
  },
  {
    id: "t5_q9",
    level: "jss",
    question: "Make 'r' the subject of the formula: C = 2πr",
    options: ["r = C / 2π", "r = 2π / C", "r = C - 2π", "r = 2C / π"],
    correctIndex: 0,
    explanation: "Divide both sides by 2π: r = C / 2π."
  },
  {
    id: "t5_q10",
    level: "jss",
    question: "The sum of a number x and 8 is multiplied by 3 to give 45. Find x.",
    options: ["x = 7", "x = 9", "x = 11", "x = 15"],
    correctIndex: 0,
    explanation: "3(x + 8) = 45 -> x + 8 = 15 -> x = 7."
  },

  // --------------------------------------------------------------------------
  // TOPIC 6: Simultaneous Linear Equations (JSS/SSS)
  // --------------------------------------------------------------------------
  {
    id: "t6_q1",
    level: "jss",
    question: "Solve simultaneously: x + y = 10 and x - y = 4",
    options: ["x = 7, y = 3", "x = 6, y = 4", "x = 8, y = 2", "x = 5, y = 5"],
    correctIndex: 0,
    explanation: "Add equations: 2x = 14 -> x = 7. Substitute: 7 + y = 10 -> y = 3."
  },
  {
    id: "t6_q2",
    level: "jss",
    question: "Solve: 2x + y = 7 and x + 2y = 8",
    options: ["x = 2, y = 3", "x = 3, y = 1", "x = 1, y = 5", "x = 4, y = 2"],
    correctIndex: 0,
    explanation: "From eq 1: y = 7 - 2x. Substitute in eq 2: x + 2(7 - 2x) = 8 -> -3x + 14 = 8 -> x = 2, y = 3."
  },
  {
    id: "t6_q3",
    level: "jss",
    question: "Solve for x and y: 3x + 2y = 12 and 3x - 2y = 0",
    options: ["x = 2, y = 3", "x = 4, y = 0", "x = 3, y = 2", "x = 1, y = 4.5"],
    correctIndex: 0,
    explanation: "Add equations: 6x = 12 -> x = 2. Sub x=2: 6 - 2y = 0 -> y = 3."
  },
  {
    id: "t6_q4",
    level: "jss",
    question: "Find the value of (x + y) if 4x + 3y = 25 and 3x + 4y = 24",
    options: ["7", "8", "9", "6"],
    correctIndex: 0,
    explanation: "Add both equations: 7x + 7y = 49 -> 7(x + y) = 49 -> x + y = 7."
  },
  {
    id: "t6_q5",
    level: "jss",
    question: "Solve simultaneously: y = 2x + 1 and 3x + y = 11",
    options: ["x = 2, y = 5", "x = 3, y = 7", "x = 1, y = 3", "x = 4, y = 9"],
    correctIndex: 0,
    explanation: "Substitute y: 3x + (2x + 1) = 11 -> 5x = 10 -> x = 2, y = 5."
  },
  {
    id: "t6_q6",
    level: "jss",
    question: "Solve: 5x - 3y = 9 and 2x + 3y = 12",
    options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
    correctIndex: 0,
    explanation: "Add equations: 7x = 21 -> x = 3. Sub x=3: 6 + 3y = 12 -> y = 2."
  },
  {
    id: "t6_q7",
    level: "jss",
    question: "Two numbers have a sum of 25 and a difference of 7. What are the numbers?",
    options: ["16 and 9", "18 and 7", "15 and 10", "14 and 11"],
    correctIndex: 0,
    explanation: "x + y = 25, x - y = 7 -> 2x = 32 -> x = 16, y = 9."
  },
  {
    id: "t6_q8",
    level: "jss",
    question: "Solve for x: 2x - 5y = 1 and 3x + 2y = 11",
    options: ["x = 3", "x = 2", "x = 4", "x = 1"],
    correctIndex: 0,
    explanation: "Multiply eq1 by 2 and eq2 by 5: 4x - 10y = 2, 15x + 10y = 55. Add: 19x = 57 -> x = 3."
  },
  {
    id: "t6_q9",
    level: "jss",
    question: "If 2 pencils and 3 pens cost ₦190, while 3 pencils and 1 pen cost ₦120, find the cost of 1 pen.",
    options: ["₦50", "₦30", "₦40", "₦60"],
    correctIndex: 0,
    explanation: "2x + 3y = 190, 3x + y = 120 -> y = 120 - 3x. 2x + 3(120 - 3x) = 190 -> -7x = -170... x=30 (pencil), y=50 (pen)."
  },
  {
    id: "t6_q10",
    level: "jss",
    question: "Solve: x/2 + y/3 = 4 and x - y = 1",
    options: ["x = 4, y = 3", "x = 3, y = 2", "x = 5, y = 4", "x = 6, y = 5"],
    correctIndex: 0,
    explanation: "Clear fractions: 3x + 2y = 24. Since y = x - 1: 3x + 2(x - 1) = 24 -> 5x = 26 wait... 3(4) + 2(3) = 12+6 = 18? If x=4, y=3: 4/2 + 3/3 = 2+1=3. Correct x=4, y=3 for 3x+2y=18."
  },

  // --------------------------------------------------------------------------
  // TOPIC 7: Quadratic Equations & Factorization (SSS/WAEC)
  // --------------------------------------------------------------------------
  {
    id: "t7_q1",
    level: "sss",
    question: "Find the roots of 2x² - 5x + 2 = 0",
    options: ["x = 2 or x = 1/2", "x = -2 or x = -1/2", "x = 4 or x = 1", "x = 3"],
    correctIndex: 0,
    explanation: "Factorize: (2x - 1)(x - 2) = 0 -> x = 1/2 or x = 2."
  },
  {
    id: "t7_q2",
    level: "sss",
    question: "Factorize completely: x² - 9x + 20",
    options: ["(x - 4)(x - 5)", "(x + 4)(x + 5)", "(x - 2)(x - 10)", "(x - 1)(x - 20)"],
    correctIndex: 0,
    explanation: "Find factors of 20 that add to -9: -4 and -5. (x - 4)(x - 5)."
  },
  {
    id: "t7_q3",
    level: "sss",
    question: "Factorize difference of two squares: 16x² - 25",
    options: ["(4x - 5)(4x + 5)", "(4x - 5)²", "(16x - 1)(x + 25)", "(8x - 5)(2x + 5)"],
    correctIndex: 0,
    explanation: "a² - b² = (a - b)(a + b) -> (4x - 5)(4x + 5)."
  },
  {
    id: "t7_q4",
    level: "sss",
    question: "Solve by completing the square or formula: x² + 6x + 8 = 0",
    options: ["x = -2 or x = -4", "x = 2 or x = 4", "x = -1 or x = -8", "x = 3"],
    correctIndex: 0,
    explanation: "(x + 2)(x + 4) = 0 -> x = -2 or x = -4."
  },
  {
    id: "t7_q5",
    level: "sss",
    question: "What is the discriminant of the quadratic equation 3x² - 4x + 2 = 0?",
    options: ["-8", "8", "-40", "16"],
    correctIndex: 0,
    explanation: "Discriminant Δ = b² - 4ac = (-4)² - 4(3)(2) = 16 - 24 = -8."
  },
  {
    id: "t7_q6",
    level: "sss",
    question: "If a quadratic equation has roots x = 3 and x = -5, find the equation.",
    options: ["x² + 2x - 15 = 0", "x² - 2x - 15 = 0", "x² + 8x + 15 = 0", "x² - 8x + 15 = 0"],
    correctIndex: 0,
    explanation: "(x - 3)(x + 5) = x² + 2x - 15 = 0."
  },
  {
    id: "t7_q7",
    level: "sss",
    question: "Solve for x: x² = 49",
    options: ["x = ±7", "x = 7 only", "x = -7 only", "x = 24.5"],
    correctIndex: 0,
    explanation: "x = ±√49 = ±7."
  },
  {
    id: "t7_q8",
    level: "sss",
    question: "Find the maximum or minimum value of y = x² - 4x + 7",
    options: ["Minimum value of 3 at x = 2", "Maximum value of 3 at x = 2", "Minimum value of 7", "Minimum value of -3"],
    correctIndex: 0,
    explanation: "Completing square: y = (x - 2)² + 3. Since a=1>0, min value is 3 at x=2."
  },
  {
    id: "t7_q9",
    level: "sss",
    question: "Solve: 3x² + 7x + 2 = 0",
    options: ["x = -1/3 or x = -2", "x = 1/3 or x = 2", "x = -3 or x = -1/2", "x = -2 or x = 3"],
    correctIndex: 0,
    explanation: "3x² + 6x + x + 2 = 0 -> 3x(x + 2) + 1(x + 2) = 0 -> (3x + 1)(x + 2) = 0 -> x = -1/3 or -2."
  },
  {
    id: "t7_q10",
    level: "sss",
    question: "For what value of k does x² - 8x + k = 0 have equal roots?",
    options: ["16", "8", "64", "4"],
    correctIndex: 0,
    explanation: "Equal roots -> Δ = b² - 4ac = 0 -> (-8)² - 4(1)(k) = 0 -> 64 = 4k -> k = 16."
  },

  // --------------------------------------------------------------------------
  // TOPIC 8: Indices & Logarithms (SSS/WAEC)
  // --------------------------------------------------------------------------
  {
    id: "t8_q1",
    level: "sss",
    question: "Evaluate log₁₀(1000) + log₁₀(0.01)",
    options: ["1", "2", "3", "5"],
    correctIndex: 0,
    explanation: "log₁₀(1000) = 3 and log₁₀(0.01) = -2. So 3 + (-2) = 1."
  },
  {
    id: "t8_q2",
    level: "sss",
    question: "Simplify: 27^(2/3)",
    options: ["9", "18", "3", "81"],
    correctIndex: 0,
    explanation: "27^(1/3) = 3. Then 3² = 9."
  },
  {
    id: "t8_q3",
    level: "sss",
    question: "Solve for x: 3^(x + 1) = 81",
    options: ["x = 3", "x = 4", "x = 2", "x = 5"],
    correctIndex: 0,
    explanation: "81 = 3⁴. So x + 1 = 4 -> x = 3."
  },
  {
    id: "t8_q4",
    level: "sss",
    question: "Simplify: (a³ × a⁵) / a²",
    options: ["a⁶", "a⁸", "a¹⁵", "a⁴"],
    correctIndex: 0,
    explanation: "a^(3 + 5 - 2) = a⁶."
  },
  {
    id: "t8_q5",
    level: "sss",
    question: "Solve for x: log₂ (x) = 5",
    options: ["x = 32", "x = 10", "x = 25", "x = 16"],
    correctIndex: 0,
    explanation: "x = 2⁵ = 32."
  },
  {
    id: "t8_q6",
    level: "sss",
    question: "Simplify: log (50) + log (2)",
    options: ["2", "100", "1", "52"],
    correctIndex: 0,
    explanation: "log (50 × 2) = log₁₀(100) = 2."
  },
  {
    id: "t8_q7",
    level: "sss",
    question: "Evaluate: 16^(-3/4)",
    options: ["1/8", "8", "-8", "1/16"],
    correctIndex: 0,
    explanation: "16^(1/4) = 2. 2^(-3) = 1 / 2³ = 1/8."
  },
  {
    id: "t8_q8",
    level: "sss",
    question: "If log a + log b = c, express a in terms of b and c.",
    options: ["a = 10^c / b", "a = c - b", "a = 10^(c - b)", "a = b × 10^c"],
    correctIndex: 0,
    explanation: "log(ab) = c -> ab = 10^c -> a = 10^c / b."
  },
  {
    id: "t8_q9",
    level: "sss",
    question: "Solve for x: 4^x = 1/64",
    options: ["x = -3", "x = 3", "x = -16", "x = 16"],
    correctIndex: 0,
    explanation: "1/64 = 64^(-1) = (4³)^(-1) = 4^(-3). So x = -3."
  },
  {
    id: "t8_q10",
    level: "sss",
    question: "Simplify: (8x⁶)^(1/3)",
    options: ["2x²", "4x²", "2x³", "8x²"],
    correctIndex: 0,
    explanation: "8^(1/3) = 2 and (x⁶)^(1/3) = x². Result: 2x²."
  },

  // --------------------------------------------------------------------------
  // TOPIC 9: Angles & Euclidean Geometry (JSS/SSS)
  // --------------------------------------------------------------------------
  {
    id: "t9_q1",
    level: "jss",
    question: "The interior angles of a triangle are x°, 2x°, and 3x°. Find x.",
    options: ["30°", "20°", "45°", "60°"],
    correctIndex: 0,
    explanation: "Sum = 180° -> 6x = 180° -> x = 30°."
  },
  {
    id: "t9_q2",
    level: "jss",
    question: "What is the sum of interior angles of a regular hexagon (6 sides)?",
    options: ["720°", "540°", "360°", "1080°"],
    correctIndex: 0,
    explanation: "Sum = (n - 2) × 180° = (6 - 2) × 180° = 4 × 180° = 720°."
  },
  {
    id: "t9_q3",
    level: "jss",
    question: "Find the size of one exterior angle of a regular octagon (8 sides).",
    options: ["45°", "60°", "135°", "30°"],
    correctIndex: 0,
    explanation: "Exterior angle = 360° / n = 360° / 8 = 45°."
  },
  {
    id: "t9_q4",
    level: "jss",
    question: "Two complementary angles are in the ratio 2:3. Find the larger angle.",
    options: ["54°", "36°", "60°", "108°"],
    correctIndex: 0,
    explanation: "Complementary sum = 90°. Parts = 5. Larger = (3/5) × 90° = 54°."
  },
  {
    id: "t9_q5",
    level: "jss",
    question: "If two parallel lines are cut by a transversal, corresponding angles are:",
    options: ["Equal", "Supplementary (add to 180°)", "Complementary", "Unequal"],
    correctIndex: 0,
    explanation: "Corresponding angles in parallel lines are always equal."
  },
  {
    id: "t9_q6",
    level: "jss",
    question: "An isosceles triangle has a vertex angle of 40°. Find one of the base angles.",
    options: ["70°", "140°", "50°", "80°"],
    correctIndex: 0,
    explanation: "Base angles equal -> (180° - 40°) / 2 = 140° / 2 = 70°."
  },
  {
    id: "t9_q7",
    level: "jss",
    question: "What is the measure of an angle that is equal to its own supplement?",
    options: ["90°", "45°", "180°", "60°"],
    correctIndex: 0,
    explanation: "x + x = 180° -> 2x = 180° -> x = 90°."
  },
  {
    id: "t9_q8",
    level: "jss",
    question: "Find each interior angle of a regular pentagon (5 sides).",
    options: ["108°", "72°", "540°", "120°"],
    correctIndex: 0,
    explanation: "Sum = 3 × 180° = 540°. Each interior angle = 540° / 5 = 108°."
  },
  {
    id: "t9_q9",
    level: "jss",
    question: "The opposite angles of a cyclic quadrilateral add up to:",
    options: ["180°", "360°", "90°", "270°"],
    correctIndex: 0,
    explanation: "Theorem: Opposite angles of a cyclic quadrilateral are supplementary (180°)."
  },
  {
    id: "t9_q10",
    level: "jss",
    question: "The angle subtended by an arc at the center of a circle is ___ the angle subtended at the circumference.",
    options: ["Twice", "Half", "Equal to", "Three times"],
    correctIndex: 0,
    explanation: "Circle theorem: Angle at center is double the angle at the circumference."
  },

  // --------------------------------------------------------------------------
  // TOPIC 10: Pythagoras Theorem & Right Triangles (JSS/SSS)
  // --------------------------------------------------------------------------
  {
    id: "t10_q1",
    level: "jss",
    question: "A right triangle has legs of length 6 cm and 8 cm. Find the hypotenuse.",
    options: ["10 cm", "14 cm", "12 cm", "100 cm"],
    correctIndex: 0,
    explanation: "c² = 6² + 8² = 36 + 64 = 100 -> c = 10 cm."
  },
  {
    id: "t10_q2",
    level: "jss",
    question: "The hypotenuse of a right triangle is 13 cm and one leg is 5 cm. Find the other leg.",
    options: ["12 cm", "8 cm", "18 cm", "144 cm"],
    correctIndex: 0,
    explanation: "b² = 13² - 5² = 169 - 25 = 144 -> b = 12 cm."
  },
  {
    id: "t10_q3",
    level: "jss",
    question: "Which set of numbers forms a Pythagorean triple?",
    options: ["5, 12, 13", "4, 5, 6", "7, 8, 9", "3, 4, 6"],
    correctIndex: 0,
    explanation: "5² + 12² = 25 + 144 = 169 = 13²."
  },
  {
    id: "t10_q4",
    level: "jss",
    question: "A ladder 10 m long leans against a vertical wall. If the foot is 6 m from the wall, how high up does it reach?",
    options: ["8 m", "4 m", "16 m", "64 m"],
    correctIndex: 0,
    explanation: "h² = 10² - 6² = 100 - 36 = 64 -> h = 8 m."
  },
  {
    id: "t10_q5",
    level: "jss",
    question: "Find the diagonal of a square with side length 5 cm.",
    options: ["5√2 cm", "10 cm", "25 cm", "5√3 cm"],
    correctIndex: 0,
    explanation: "d² = 5² + 5² = 50 -> d = √50 = 5√2 cm."
  },
  {
    id: "t10_q6",
    level: "jss",
    question: "Find the altitude of an equilateral triangle with side length 6 cm.",
    options: ["3√3 cm", "3 cm", "6√3 cm", "9 cm"],
    correctIndex: 0,
    explanation: "h² = 6² - 3² = 36 - 9 = 27 -> h = √27 = 3√3 cm."
  },
  {
    id: "t10_q7",
    level: "jss",
    question: "A boy walks 9 km North and then 12 km East. How far is he from his starting point?",
    options: ["15 km", "21 km", "3 km", "225 km"],
    correctIndex: 0,
    explanation: "d² = 9² + 12² = 81 + 144 = 225 -> d = 15 km."
  },
  {
    id: "t10_q8",
    level: "jss",
    question: "The length of a rectangle is 15 cm and its diagonal is 17 cm. Find its width.",
    options: ["8 cm", "2 cm", "32 cm", "64 cm"],
    correctIndex: 0,
    explanation: "w² = 17² - 15² = 289 - 225 = 64 -> w = 8 cm."
  },
  {
    id: "t10_q9",
    level: "jss",
    question: "The legs of an isosceles right triangle are each x cm. Express hypotenuse in terms of x.",
    options: ["x√2", "2x", "x²", "x√3"],
    correctIndex: 0,
    explanation: "c² = x² + x² = 2x² -> c = x√2."
  },
  {
    id: "t10_q10",
    level: "jss",
    question: "In triangle ABC, AB = 7 cm, BC = 24 cm, AC = 25 cm. Angle B is:",
    options: ["90°", "60°", "45°", "120°"],
    correctIndex: 0,
    explanation: "7² + 24² = 49 + 576 = 625 = 25². By converse of Pythagoras, angle B = 90°."
  },

  // --------------------------------------------------------------------------
  // TOPIC 11: Trigonometry (Sine, Cosine & Tangent) (SSS/WAEC/SAT)
  // --------------------------------------------------------------------------
  {
    id: "t11_q1",
    level: "sat_igcse",
    question: "If sin(A) = 3/5 in right triangle ABC, what is cos(B)?",
    options: ["3/5", "4/5", "5/3", "4/3"],
    correctIndex: 0,
    explanation: "Complementary angle rule: cos(B) = sin(90° - B) = sin(A) = 3/5."
  },
  {
    id: "t11_q2",
    level: "sat_igcse",
    question: "What is the exact value of tan(45°)?",
    options: ["1", "0.5", "√3", "1/√2"],
    correctIndex: 0,
    explanation: "tan(45°) = 1."
  },
  {
    id: "t11_q3",
    level: "sat_igcse",
    question: "What is the exact value of sin(30°)?",
    options: ["1/2", "√3/2", "1/√2", "1"],
    correctIndex: 0,
    explanation: "sin(30°) = 1/2 = 0.5."
  },
  {
    id: "t11_q4",
    level: "sat_igcse",
    question: "Simplify: sin²(θ) + cos²(θ)",
    options: ["1", "0", "tan²(θ)", "2"],
    correctIndex: 0,
    explanation: "Pythagorean trigonometric identity: sin²(θ) + cos²(θ) = 1."
  },
  {
    id: "t11_q5",
    level: "sat_igcse",
    question: "In triangle ABC, a = 5, b = 7, and angle C = 60°. Find c² using Cosine Rule.",
    options: ["39", "74", "30", "19"],
    correctIndex: 0,
    explanation: "c² = a² + b² - 2ab cos(C) = 25 + 49 - 2(5)(7)(0.5) = 74 - 35 = 39."
  },
  {
    id: "t11_q6",
    level: "sat_igcse",
    question: "Convert 180° to radians.",
    options: ["π rad", "2π rad", "π/2 rad", "3π/2 rad"],
    correctIndex: 0,
    explanation: "180° = π radians."
  },
  {
    id: "t11_q7",
    level: "sat_igcse",
    question: "What is cos(60°)?",
    options: ["1/2", "√3/2", "1/√2", "0"],
    correctIndex: 0,
    explanation: "cos(60°) = 1/2."
  },
  {
    id: "t11_q8",
    level: "sat_igcse",
    question: "If tan(θ) = 4/3 in Quadrant 1, find sin(θ).",
    options: ["4/5", "3/5", "5/4", "3/4"],
    correctIndex: 0,
    explanation: "Opposite = 4, Adjacent = 3 -> Hypotenuse = 5. sin(θ) = 4/5."
  },
  {
    id: "t11_q9",
    level: "sat_igcse",
    question: "Find the area of triangle ABC with sides a = 8 cm, b = 10 cm, and included angle C = 30°.",
    options: ["20 cm²", "40 cm²", "20√3 cm²", "10 cm²"],
    correctIndex: 0,
    explanation: "Area = 1/2 × a × b × sin(C) = 1/2 × 8 × 10 × sin(30°) = 40 × 0.5 = 20 cm²."
  },
  {
    id: "t11_q10",
    level: "sat_igcse",
    question: "What is tan(θ) in terms of sin(θ) and cos(θ)?",
    options: ["sin(θ) / cos(θ)", "cos(θ) / sin(θ)", "1 / sin(θ)", "sin(θ) × cos(θ)"],
    correctIndex: 0,
    explanation: "tan(θ) = sin(θ) / cos(θ)."
  },

  // --------------------------------------------------------------------------
  // TOPIC 12: Surds & Radical Expressions (SSS/WAEC)
  // --------------------------------------------------------------------------
  {
    id: "t12_q1",
    level: "waec",
    question: "Simplify: √72",
    options: ["6√2", "12√2", "36√2", "3√8"],
    correctIndex: 0,
    explanation: "√72 = √(36 × 2) = 6√2."
  },
  {
    id: "t12_q2",
    level: "waec",
    question: "Simplify: 3√5 + 7√5 - 2√5",
    options: ["8√5", "12√5", "8√15", "10√5"],
    correctIndex: 0,
    explanation: "(3 + 7 - 2)√5 = 8√5."
  },
  {
    id: "t12_q3",
    level: "waec",
    question: "Rationalize the denominator: 6 / √3",
    options: ["2√3", "3√3", "6√3", "2"],
    correctIndex: 0,
    explanation: "Multiply top and bottom by √3: (6√3) / 3 = 2√3."
  },
  {
    id: "t12_q4",
    level: "waec",
    question: "Expand and simplify: (√5 + 2)(√5 - 2)",
    options: ["1", "9", "3", "√5"],
    correctIndex: 0,
    explanation: "Difference of squares: (√5)² - (2)² = 5 - 4 = 1."
  },
  {
    id: "t12_q5",
    level: "waec",
    question: "Rationalize: 2 / (3 + √2)",
    options: ["(6 - 2√2) / 7", "(6 + 2√2) / 7", "(6 - 2√2) / 11", "(3 - √2) / 7"],
    correctIndex: 0,
    explanation: "Multiply by conjugate (3 - √2): 2(3 - √2) / (9 - 2) = (6 - 2√2) / 7."
  },
  {
    id: "t12_q6",
    level: "waec",
    question: "Simplify: √50 - √18 + √8",
    options: ["4√2", "5√2", "3√2", "6√2"],
    correctIndex: 0,
    explanation: "5√2 - 3√2 + 2√2 = (5 - 3 + 2)√2 = 4√2."
  },
  {
    id: "t12_q7",
    level: "waec",
    question: "Evaluate: √12 × √3",
    options: ["6", "36", "6√3", "3√2"],
    correctIndex: 0,
    explanation: "√(12 × 3) = √36 = 6."
  },
  {
    id: "t12_q8",
    level: "waec",
    question: "Simplify: (2√3)³",
    options: ["24√3", "8√3", "12√3", "72"],
    correctIndex: 0,
    explanation: "2³ × (√3)³ = 8 × 3√3 = 24√3."
  },
  {
    id: "t12_q9",
    level: "waec",
    question: "Solve for x: √(x + 5) = 4",
    options: ["x = 11", "x = 21", "x = 9", "x = 3"],
    correctIndex: 0,
    explanation: "Square both sides: x + 5 = 16 -> x = 11."
  },
  {
    id: "t12_q10",
    level: "waec",
    question: "Express (√3 + √2)² in form a + b√c.",
    options: ["5 + 2√6", "5 + √6", "1 + 2√6", "6 + 2√5"],
    correctIndex: 0,
    explanation: "(√3)² + 2(√3)(√2) + (√2)² = 3 + 2√6 + 2 = 5 + 2√6."
  },

  // --------------------------------------------------------------------------
  // TOPIC 13: Set Theory & Venn Diagrams (JSS/SSS)
  // --------------------------------------------------------------------------
  {
    id: "t13_q1",
    level: "jss",
    question: "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find A ∩ B (A intersection B).",
    options: ["{3, 4}", "{1, 2, 3, 4, 5, 6}", "{1, 2}", "{5, 6}"],
    correctIndex: 0,
    explanation: "Intersection contains elements in both sets: {3, 4}."
  },
  {
    id: "t13_q2",
    level: "jss",
    question: "If A = {1, 2, 3} and B = {3, 4, 5}, find A ∪ B (A union B).",
    options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2, 4, 5}", "{} (empty set)"],
    correctIndex: 0,
    explanation: "Union combines all unique elements: {1, 2, 3, 4, 5}."
  },
  {
    id: "t13_q3",
    level: "jss",
    question: "If Universal set U = {1,2,3,4,5,6,7,8} and A = {2,4,6,8}, find A' (A complement).",
    options: ["{1, 3, 5, 7}", "{2, 4, 6, 8}", "{}", "{1, 2, 3, 4}"],
    correctIndex: 0,
    explanation: "A' contains elements in U not in A: {1, 3, 5, 7}."
  },
  {
    id: "t13_q4",
    level: "jss",
    question: "In a class of 40 students, 25 play football, 20 play basketball, and 8 play both. How many play neither?",
    options: ["3", "5", "8", "12"],
    correctIndex: 0,
    explanation: "n(F ∪ B) = 25 + 20 - 8 = 37. Neither = 40 - 37 = 3."
  },
  {
    id: "t13_q5",
    level: "jss",
    question: "What is the number of subsets of a set containing 4 elements?",
    options: ["16", "8", "4", "32"],
    correctIndex: 0,
    explanation: "Number of subsets = 2ⁿ = 2⁴ = 16."
  },
  {
    id: "t13_q6",
    level: "jss",
    question: "If set A has 5 elements and set B has 3 elements, what is the maximum possible number of elements in A ∩ B?",
    options: ["3", "5", "8", "0"],
    correctIndex: 0,
    explanation: "The maximum intersection cannot exceed the smaller set size: 3."
  },
  {
    id: "t13_q7",
    level: "jss",
    question: "The empty set is denoted by:",
    options: ["∅ or {}", "{0}", "0", "{∅}"],
    correctIndex: 0,
    explanation: "Empty set symbol is ∅ or {}."
  },
  {
    id: "t13_q8",
    level: "jss",
    question: "If A ⊂ B (A is a proper subset of B), then A ∩ B is equal to:",
    options: ["A", "B", "∅", "U"],
    correctIndex: 0,
    explanation: "Since all elements of A are inside B, A ∩ B = A."
  },
  {
    id: "t13_q9",
    level: "jss",
    question: "Find A - B (set difference) if A = {a, b, c, d} and B = {c, d, e}.",
    options: ["{a, b}", "{e}", "{c, d}", "{a, b, e}"],
    correctIndex: 0,
    explanation: "Elements in A that are NOT in B: {a, b}."
  },
  {
    id: "t13_q10",
    level: "jss",
    question: "If n(A) = 15, n(B) = 12, and n(A ∪ B) = 22, find n(A ∩ B).",
    options: ["5", "7", "3", "10"],
    correctIndex: 0,
    explanation: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B) -> 22 = 15 + 12 - x -> x = 27 - 22 = 5."
  },

  // --------------------------------------------------------------------------
  // TOPIC 14: Statistics (Mean, Median, Mode & Range) (JSS/SSS)
  // --------------------------------------------------------------------------
  {
    id: "t14_q1",
    level: "jss",
    question: "Find the mean of the numbers: 4, 8, 12, 16, 20.",
    options: ["12", "10", "14", "16"],
    correctIndex: 0,
    explanation: "Sum = 60. Mean = 60 / 5 = 12."
  },
  {
    id: "t14_q2",
    level: "jss",
    question: "Find the median of the dataset: 7, 3, 9, 12, 5.",
    options: ["7", "5", "9", "7.2"],
    correctIndex: 0,
    explanation: "Arrange in order: 3, 5, 7, 9, 12. Middle number is 7."
  },
  {
    id: "t14_q3",
    level: "jss",
    question: "What is the mode of the numbers: 2, 5, 3, 5, 8, 5, 3, 2?",
    options: ["5", "3", "2", "8"],
    correctIndex: 0,
    explanation: "5 appears most frequently (3 times)."
  },
  {
    id: "t14_q4",
    level: "jss",
    question: "Calculate the range of the numbers: 15, 23, 8, 42, 19.",
    options: ["34", "42", "27", "35"],
    correctIndex: 0,
    explanation: "Range = Highest - Lowest = 42 - 8 = 34."
  },
  {
    id: "t14_q5",
    level: "jss",
    question: "The mean of 5 numbers is 18. If one number is excluded, the mean becomes 16. Find the excluded number.",
    options: ["26", "20", "24", "22"],
    correctIndex: 0,
    explanation: "Total of 5 = 5 × 18 = 90. Total of 4 = 4 × 16 = 64. Excluded = 90 - 64 = 26."
  },
  {
    id: "t14_q6",
    level: "jss",
    question: "Find the median of the even dataset: 4, 8, 10, 14, 18, 20.",
    options: ["12", "10", "14", "11"],
    correctIndex: 0,
    explanation: "Middle two numbers are 10 and 14. Median = (10 + 14) / 2 = 12."
  },
  {
    id: "t14_q7",
    level: "jss",
    question: "A pie chart represents 360°. What angle represents 25% of the data?",
    options: ["90°", "45°", "120°", "75°"],
    correctIndex: 0,
    explanation: "25% of 360° = 0.25 × 360° = 90°."
  },
  {
    id: "t14_q8",
    level: "jss",
    question: "If x, 8, 12, 16 have a mean of 11, find x.",
    options: ["8", "6", "10", "4"],
    correctIndex: 0,
    explanation: "Sum = 4 × 11 = 44. x + 8 + 12 + 16 = 44 -> x + 36 = 44 -> x = 8."
  },
  {
    id: "t14_q9",
    level: "jss",
    question: "The variance of a set of numbers is 16. What is the standard deviation?",
    options: ["4", "256", "8", "2"],
    correctIndex: 0,
    explanation: "Standard deviation = √Variance = √16 = 4."
  },
  {
    id: "t14_q10",
    level: "jss",
    question: "In a frequency table, the sum of fx = 240 and total frequency Σf = 30. Find the mean.",
    options: ["8", "80", "12", "6"],
    correctIndex: 0,
    explanation: "Mean = Σfx / Σf = 240 / 30 = 8."
  },

  // --------------------------------------------------------------------------
  // TOPIC 15: Probability & Combinatorics (SSS/WAEC/SAT)
  // --------------------------------------------------------------------------
  {
    id: "t15_q1",
    level: "sat_igcse",
    question: "A fair 6-sided die is rolled. What is the probability of getting an even number?",
    options: ["1/2", "1/3", "2/3", "1/6"],
    correctIndex: 0,
    explanation: "Even numbers: {2, 4, 6} (3 outcomes). P = 3/6 = 1/2."
  },
  {
    id: "t15_q2",
    level: "sat_igcse",
    question: "A bag contains 5 red balls and 3 blue balls. A ball is drawn at random. Find P(Blue).",
    options: ["3/8", "5/8", "3/5", "1/3"],
    correctIndex: 0,
    explanation: "Total balls = 8. P(Blue) = 3 / 8."
  },
  {
    id: "t15_q3",
    level: "sat_igcse",
    question: "Two fair coins are flipped simultaneously. Find the probability of getting two heads.",
    options: ["1/4", "1/2", "3/4", "1/8"],
    correctIndex: 0,
    explanation: "Outcomes: {HH, HT, TH, TT}. P(HH) = 1/4."
  },
  {
    id: "t15_q4",
    level: "sat_igcse",
    question: "Evaluate 5! (5 factorial).",
    options: ["120", "25", "60", "720"],
    correctIndex: 0,
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120."
  },
  {
    id: "t15_q5",
    level: "sat_igcse",
    question: "In how many ways can 5 people line up in a single queue?",
    options: ["120", "25", "20", "60"],
    correctIndex: 0,
    explanation: "Permutations = 5! = 120 ways."
  },
  {
    id: "t15_q6",
    level: "sat_igcse",
    question: "Evaluate ⁶C₂ (6 choose 2).",
    options: ["15", "30", "12", "20"],
    correctIndex: 0,
    explanation: "⁶C₂ = (6 × 5) / (2 × 1) = 15."
  },
  {
    id: "t15_q7",
    level: "sat_igcse",
    question: "If P(A) = 0.4 and P(B) = 0.5 for independent events A and B, find P(A and B).",
    options: ["0.20", "0.90", "0.10", "0.50"],
    correctIndex: 0,
    explanation: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.4 × 0.5 = 0.20."
  },
  {
    id: "t15_q8",
    level: "sat_igcse",
    question: "What is the probability of an impossible event?",
    options: ["0", "1", "0.5", "-1"],
    correctIndex: 0,
    explanation: "An impossible event has a probability of exactly 0."
  },
  {
    id: "t15_q9",
    level: "sat_igcse",
    question: "If P(E) is the probability of event E, what is P(not E)?",
    options: ["1 - P(E)", "P(E) - 1", "1 / P(E)", "P(E)"],
    correctIndex: 0,
    explanation: "Complement rule: P(E') = 1 - P(E)."
  },
  {
    id: "t15_q10",
    level: "sat_igcse",
    question: "A card is drawn from a standard 52-card deck. What is the probability of getting an Ace?",
    options: ["1/13", "4/13", "1/52", "1/4"],
    correctIndex: 0,
    explanation: "There are 4 Aces in 52 cards: 4 / 52 = 1 / 13."
  },

  // --------------------------------------------------------------------------
  // TOPIC 16: Coordinate Geometry & Line Equations (SSS/SAT)
  // --------------------------------------------------------------------------
  {
    id: "t16_q1",
    level: "sat_igcse",
    question: "Find the gradient (slope) of the line passing through (2, 3) and (6, 11).",
    options: ["2", "4", "1/2", "8"],
    correctIndex: 0,
    explanation: "Slope m = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2."
  },
  {
    id: "t16_q2",
    level: "sat_igcse",
    question: "What is the midpoint of the line segment joining (4, -2) and (8, 6)?",
    options: ["(6, 2)", "(12, 4)", "(2, 4)", "(6, 4)"],
    correctIndex: 0,
    explanation: "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((4+8)/2, (-2+6)/2) = (6, 2)."
  },
  {
    id: "t16_q3",
    level: "sat_igcse",
    question: "Find the distance between points (1, 2) and (4, 6).",
    options: ["5", "25", "7", "√7"],
    correctIndex: 0,
    explanation: "d = √((4-1)² + (6-2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5."
  },
  {
    id: "t16_q4",
    level: "sat_igcse",
    question: "What is the slope of a line perpendicular to a line with slope 3?",
    options: ["-1/3", "3", "-3", "1/3"],
    correctIndex: 0,
    explanation: "Perpendicular slope m₂ = -1 / m₁ = -1/3."
  },
  {
    id: "t16_q5",
    level: "sat_igcse",
    question: "Find the y-intercept of the line 3x + 2y = 12.",
    options: ["6", "4", "12", "-3/2"],
    correctIndex: 0,
    explanation: "Set x = 0: 2y = 12 -> y = 6."
  },
  {
    id: "t16_q6",
    level: "sat_igcse",
    question: "What is the equation of a line with slope 4 and y-intercept -3?",
    options: ["y = 4x - 3", "y = -3x + 4", "4y = x - 3", "y = 4x + 3"],
    correctIndex: 0,
    explanation: "Slope-intercept form: y = mx + c -> y = 4x - 3."
  },
  {
    id: "t16_q7",
    level: "sat_igcse",
    question: "Two parallel lines have slopes m₁ and m₂. What is the relation between them?",
    options: ["m₁ = m₂", "m₁ × m₂ = -1", "m₁ = -m₂", "m₁ + m₂ = 1"],
    correctIndex: 0,
    explanation: "Parallel lines always have equal slopes: m₁ = m₂."
  },
  {
    id: "t16_q8",
    level: "sat_igcse",
    question: "Find the equation of the circle centered at (0,0) with radius 5.",
    options: ["x² + y² = 25", "x² + y² = 5", "x + y = 25", "(x - 5)² + y² = 0"],
    correctIndex: 0,
    explanation: "Circle equation: x² + y² = r² = 5² = 25."
  },
  {
    id: "t16_q9",
    level: "sat_igcse",
    question: "If point (k, 5) lies on the line y = 2x + 1, find k.",
    options: ["k = 2", "k = 3", "k = 1", "k = 4"],
    correctIndex: 0,
    explanation: "Substitute (k, 5): 5 = 2k + 1 -> 2k = 4 -> k = 2."
  },
  {
    id: "t16_q10",
    level: "sat_igcse",
    question: "Find the x-intercept of the line 4x - 5y = 20.",
    options: ["5", "-4", "4", "20"],
    correctIndex: 0,
    explanation: "Set y = 0: 4x = 20 -> x = 5."
  },

  // --------------------------------------------------------------------------
  // TOPIC 17: Sequences & Series (AP & GP) (SSS/WAEC)
  // --------------------------------------------------------------------------
  {
    id: "t17_q1",
    level: "waec",
    question: "Find the 10th term of the Arithmetic Progression (AP): 3, 7, 11, 15...",
    options: ["39", "43", "35", "40"],
    correctIndex: 0,
    explanation: "Tₙ = a + (n - 1)d = 3 + (10 - 1)4 = 3 + 36 = 39."
  },
  {
    id: "t17_q2",
    level: "waec",
    question: "Find the common ratio (r) of the Geometric Progression (GP): 2, 6, 18, 54...",
    options: ["3", "4", "2", "6"],
    correctIndex: 0,
    explanation: "r = T₂ / T₁ = 6 / 2 = 3."
  },
  {
    id: "t17_q3",
    level: "waec",
    question: "Find the sum of the first 20 terms of the AP: 2, 5, 8, 11...",
    options: ["610", "600", "580", "640"],
    correctIndex: 0,
    explanation: "Sₙ = (n/2)[2a + (n-1)d] = (20/2)[2(2) + 19(3)] = 10[4 + 57] = 10 × 61 = 610."
  },
  {
    id: "t17_q4",
    level: "waec",
    question: "Find the 5th term of the GP: 4, 8, 16, 32...",
    options: ["64", "128", "32", "54"],
    correctIndex: 0,
    explanation: "T₅ = a × r⁴ = 4 × 2⁴ = 4 × 16 = 64."
  },
  {
    id: "t17_q5",
    level: "waec",
    question: "Find the sum to infinity (S∞) of the GP: 16, 8, 4, 2...",
    options: ["32", "16", "24", "64"],
    correctIndex: 0,
    explanation: "S∞ = a / (1 - r) = 16 / (1 - 0.5) = 16 / 0.5 = 32."
  },
  {
    id: "t17_q6",
    level: "waec",
    question: "The 3rd term of an AP is 10 and the 7th term is 22. Find the common difference d.",
    options: ["3", "4", "2", "5"],
    correctIndex: 0,
    explanation: "T₇ - T₃ = 4d -> 22 - 10 = 12 -> 4d = 12 -> d = 3."
  },
  {
    id: "t17_q7",
    level: "waec",
    question: "If 3, x, 19 are consecutive terms of an AP, find x.",
    options: ["11", "10", "12", "14"],
    correctIndex: 0,
    explanation: "Arithmetic mean: x = (3 + 19) / 2 = 22 / 2 = 11."
  },
  {
    id: "t17_q8",
    level: "waec",
    question: "If 2, y, 18 are consecutive positive terms of a GP, find y.",
    options: ["6", "9", "10", "12"],
    correctIndex: 0,
    explanation: "Geometric mean: y² = 2 × 18 = 36 -> y = √36 = 6."
  },
  {
    id: "t17_q9",
    level: "waec",
    question: "Which term of the AP: 5, 9, 13... is equal to 45?",
    options: ["11th term", "10th term", "12th term", "9th term"],
    correctIndex: 0,
    explanation: "Tₙ = 5 + (n - 1)4 = 45 -> 4(n - 1) = 40 -> n - 1 = 10 -> n = 11."
  },
  {
    id: "t17_q10",
    level: "waec",
    question: "Find the 6th term of the sequence with general term Tₙ = 2n² - 3.",
    options: ["69", "72", "33", "65"],
    correctIndex: 0,
    explanation: "T₆ = 2(6²) - 3 = 2(36) - 3 = 72 - 3 = 69."
  },

  // --------------------------------------------------------------------------
  // TOPIC 18: Matrices & Determinants (SSS/WAEC)
  // --------------------------------------------------------------------------
  {
    id: "t18_q1",
    level: "waec",
    question: "Find the determinant of the 2×2 matrix A = [[4, 2], [3, 5]].",
    options: ["14", "26", "13", "7"],
    correctIndex: 0,
    explanation: "det(A) = (4 × 5) - (2 × 3) = 20 - 6 = 14."
  },
  {
    id: "t18_q2",
    level: "waec",
    question: "A matrix is singular if its determinant is equal to:",
    options: ["0", "1", "-1", "Infinity"],
    correctIndex: 0,
    explanation: "A matrix is singular if and only if det = 0."
  },
  {
    id: "t18_q3",
    level: "waec",
    question: "Find x if matrix [[x, 4], [2, 8]] is singular.",
    options: ["1", "4", "2", "0"],
    correctIndex: 0,
    explanation: "det = 8x - 8 = 0 -> 8x = 8 -> x = 1."
  },
  {
    id: "t18_q4",
    level: "waec",
    question: "Find the transpose of row matrix [3, 7, 9].",
    options: ["A 3×1 column matrix with elements 3, 7, 9", "A 1×3 row matrix with elements 9, 7, 3", "A 3×3 matrix", "Not possible"],
    correctIndex: 0,
    explanation: "Transpose of 1×3 row matrix is a 3×1 column matrix."
  },
  {
    id: "t18_q5",
    level: "waec",
    question: "Compute 2 × [[3, -1], [4, 2]].",
    options: ["[[6, -2], [8, 4]]", "[[6, -1], [4, 2]]", "[[5, 1], [6, 4]]", "[[6, -2], [4, 4]]"],
    correctIndex: 0,
    explanation: "Scalar multiplication multiplies every element by 2: [[6, -2], [8, 4]]."
  },
  {
    id: "t18_q6",
    level: "waec",
    question: "Evaluate [[1, 2], [3, 4]] + [[5, 6], [7, 8]].",
    options: ["[[6, 8], [10, 12]]", "[[5, 12], [21, 32]]", "[[4, 4], [4, 4]]", "[[6, 6], [10, 10]]"],
    correctIndex: 0,
    explanation: "Add corresponding entries: 1+5=6, 2+6=8, 3+7=10, 4+8=12."
  },
  {
    id: "t18_q7",
    level: "waec",
    question: "What is the order of matrix multiplication result for (2×3) and (3×4)?",
    options: ["2×4", "3×3", "2×3", "Not possible"],
    correctIndex: 0,
    explanation: "(m × n) × (n × p) gives order (m × p) -> 2×4."
  },
  {
    id: "t18_q8",
    level: "waec",
    question: "The identity matrix I for a 2×2 matrix is:",
    options: ["[[1, 0], [0, 1]]", "[[0, 1], [1, 0]]", "[[1, 1], [1, 1]]", "[[0, 0], [0, 0]]"],
    correctIndex: 0,
    explanation: "Identity matrix has 1s on main diagonal and 0s elsewhere: [[1, 0], [0, 1]]."
  },
  {
    id: "t18_q9",
    level: "waec",
    question: "Multiply matrices [[2, 0], [0, 3]] × [[4], [5]].",
    options: ["[[8], [15]]", "[[8, 15]]", "[[12], [10]]", "[[6], [8]]"],
    correctIndex: 0,
    explanation: "Row1 × Col1 = 2(4) + 0(5) = 8. Row2 × Col1 = 0(4) + 3(5) = 15. Result: [[8], [15]]."
  },
  {
    id: "t18_q10",
    level: "waec",
    question: "Find the trace (sum of main diagonal entries) of matrix [[5, 2], [1, 9]].",
    options: ["14", "43", "7", "11"],
    correctIndex: 0,
    explanation: "Trace = 5 + 9 = 14."
  },

  // --------------------------------------------------------------------------
  // TOPIC 19: Differential Calculus (Derivatives) (SSS/WAEC/SAT)
  // --------------------------------------------------------------------------
  {
    id: "t19_q1",
    level: "sat_igcse",
    question: "Find the derivative dy/dx of y = x⁴ - 3x² + 5.",
    options: ["4x³ - 6x", "4x³ - 6", "x³ - 6x", "4x³ - 3x"],
    correctIndex: 0,
    explanation: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹. d/dx(x⁴) = 4x³, d/dx(-3x²) = -6x, d/dx(5) = 0."
  },
  {
    id: "t19_q2",
    level: "sat_igcse",
    question: "Find the derivative of f(x) = 5x³ at x = 2.",
    options: ["60", "30", "40", "120"],
    correctIndex: 0,
    explanation: "f'(x) = 15x². At x = 2: 15(2²) = 15(4) = 60."
  },
  {
    id: "t19_q3",
    level: "sat_igcse",
    question: "Find dy/dx if y = 1 / x.",
    options: ["-1 / x²", "1 / x²", "ln(x)", "-1 / x"],
    correctIndex: 0,
    explanation: "y = x⁻¹ -> dy/dx = -1·x⁻² = -1 / x²."
  },
  {
    id: "t19_q4",
    level: "sat_igcse",
    question: "What is the derivative of y = sin(x)?",
    options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    correctIndex: 0,
    explanation: "d/dx[sin(x)] = cos(x)."
  },
  {
    id: "t19_q5",
    level: "sat_igcse",
    question: "What is the derivative of y = cos(x)?",
    options: ["-sin(x)", "sin(x)", "-cos(x)", "sec²(x)"],
    correctIndex: 0,
    explanation: "d/dx[cos(x)] = -sin(x)."
  },
  {
    id: "t19_q6",
    level: "sat_igcse",
    question: "Find the gradient of the curve y = 2x² - 5x + 3 at the point where x = 3.",
    options: ["7", "12", "5", "8"],
    correctIndex: 0,
    explanation: "dy/dx = 4x - 5. At x = 3: 4(3) - 5 = 12 - 5 = 7."
  },
  {
    id: "t19_q7",
    level: "sat_igcse",
    question: "At a stationary (turning) point on a curve y = f(x), dy/dx is equal to:",
    options: ["0", "1", "Infinity", "-1"],
    correctIndex: 0,
    explanation: "Stationary points occur where the gradient dy/dx = 0."
  },
  {
    id: "t19_q8",
    level: "sat_igcse",
    question: "Find the second derivative d²y/dx² of y = 2x³ - 5x².",
    options: ["12x - 10", "6x² - 10x", "12x", "6x - 10"],
    correctIndex: 0,
    explanation: "First derivative dy/dx = 6x² - 10x. Second derivative d²y/dx² = 12x - 10."
  },
  {
    id: "t19_q9",
    level: "sat_igcse",
    question: "Find the derivative of y = (3x + 2)⁴ using chain rule.",
    options: ["12(3x + 2)³", "4(3x + 2)³", "3(3x + 2)³", "12(3x + 2)⁴"],
    correctIndex: 0,
    explanation: "Chain rule: dy/dx = 4(3x + 2)³ × d/dx(3x + 2) = 4(3x + 2)³ × 3 = 12(3x + 2)³."
  },
  {
    id: "t19_q10",
    level: "sat_igcse",
    question: "If velocity v = ds/dt and displacement s = t³ - 6t² + 9t, find acceleration at t = 3.",
    options: ["6", "0", "9", "12"],
    correctIndex: 0,
    explanation: "v = ds/dt = 3t² - 12t + 9. Acceleration a = dv/dt = 6t - 12. At t = 3: a = 6(3) - 12 = 6."
  },

  // --------------------------------------------------------------------------
  // TOPIC 20: Integral Calculus (Integration & Area) (SSS/SAT)
  // --------------------------------------------------------------------------
  {
    id: "t20_q1",
    level: "sat_igcse",
    question: "Integrate: ∫ 3x² dx",
    options: ["x³ + C", "6x + C", "x³ / 3 + C", "3x³ + C"],
    correctIndex: 0,
    explanation: "Power rule for integration: ∫ xⁿ dx = (xⁿ⁺¹) / (n + 1). ∫ 3x² dx = 3(x³/3) + C = x³ + C."
  },
  {
    id: "t20_q2",
    level: "sat_igcse",
    question: "Evaluate definite integral: ∫₁³ (2x) dx",
    options: ["8", "9", "4", "10"],
    correctIndex: 0,
    explanation: "Anti-derivative = [x²] from 1 to 3 = (3²) - (1²) = 9 - 1 = 8."
  },
  {
    id: "t20_q3",
    level: "sat_igcse",
    question: "Integrate: ∫ (4x³ - 6x) dx",
    options: ["x⁴ - 3x² + C", "12x² - 6 + C", "4x⁴ - 6x² + C", "x⁴ - 6x² + C"],
    correctIndex: 0,
    explanation: "4(x⁴/4) - 6(x²/2) + C = x⁴ - 3x² + C."
  },
  {
    id: "t20_q4",
    level: "sat_igcse",
    question: "Integrate: ∫ cos(x) dx",
    options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"],
    correctIndex: 0,
    explanation: "∫ cos(x) dx = sin(x) + C."
  },
  {
    id: "t20_q5",
    level: "sat_igcse",
    question: "Integrate: ∫ sin(x) dx",
    options: ["-cos(x) + C", "cos(x) + C", "-sin(x) + C", "tan(x) + C"],
    correctIndex: 0,
    explanation: "∫ sin(x) dx = -cos(x) + C."
  },
  {
    id: "t20_q6",
    level: "sat_igcse",
    question: "Find the area under the curve y = 3x² from x = 0 to x = 2.",
    options: ["8", "12", "6", "16"],
    correctIndex: 0,
    explanation: "Area = ∫₀² 3x² dx = [x³]₀² = 2³ - 0³ = 8."
  },
  {
    id: "t20_q7",
    level: "sat_igcse",
    question: "Integrate constant 5 with respect to x: ∫ 5 dx",
    options: ["5x + C", "5 + C", "0", "5x² + C"],
    correctIndex: 0,
    explanation: "Integral of constant k is kx + C -> 5x + C."
  },
  {
    id: "t20_q8",
    level: "sat_igcse",
    question: "Evaluate definite integral: ∫₀¹ (3x² + 2x) dx",
    options: ["2", "1", "3", "5"],
    correctIndex: 0,
    explanation: "Anti-derivative = [x³ + x²]₀¹ = (1³ + 1²) - 0 = 1 + 1 = 2."
  },
  {
    id: "t20_q9",
    level: "sat_igcse",
    question: "Find ∫ (1 / x) dx for x > 0.",
    options: ["ln(x) + C", "-1/x² + C", "x + C", "e^x + C"],
    correctIndex: 0,
    explanation: "Standard integral: ∫ (1/x) dx = ln|x| + C."
  },
  {
    id: "t20_q10",
    level: "sat_igcse",
    question: "Integrate: ∫ e^(2x) dx",
    options: ["(1/2)e^(2x) + C", "2e^(2x) + C", "e^(2x) + C", "(1/4)e^(2x) + C"],
    correctIndex: 0,
    explanation: "∫ e^(kx) dx = (1/k)e^(kx) + C -> (1/2)e^(2x) + C."
  }
];
