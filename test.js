const fs = require('fs');

// Load the detector
const detectorCode = fs.readFileSync('./detector.js', 'utf8');
const detector = eval(detectorCode + '\n detector;');

// Test cases
const testCases = [
    {
        name: "Explicit Positive",
        text: "We offer visa sponsorship available for the right candidate.",
        expectedStatus: "positive",
        expectedPositive: ["visa sponsorship available"]
    },
    {
        name: "Explicit Negative",
        text: "No visa sponsorship provided for this role.",
        expectedStatus: "negative",
        expectedNegative: ["no visa sponsorship"]
    },
    {
        name: "Implicit Negation",
        text: "Unfortunately, we cannot provide relocation assistance at this time.",
        expectedStatus: "negative",
        expectedNegative: ['implicitly negated: "relocation assistance"']
    },
    {
        name: "Ambiguous",
        text: "Global team looking for members. Relocation might be discussed.",
        expectedStatus: "unclear",
        expectedAmbiguous: ["global team", "relocation"]
    },
    {
        name: "Mixed Signals",
        text: "We sponsor H-1B but candidates must have the right to work in the UK.",
        expectedStatus: "unclear"
    },
    {
        name: "No Info",
        text: "Looking for a software engineer with 5 years of experience in React.",
        expectedStatus: "no-info"
    },
    {
        name: "False Positive Prevention",
        text: "Candidates without requiring visa sponsorship are preferred.",
        expectedStatus: "negative", // "without requiring visa sponsorship" is in negativeSignals
        expectedNegative: ["without requiring visa sponsorship"]
    },
    {
        name: "Country Detection - Currency",
        text: "Salary is 50,000 £ per year.",
        expectedCountry: "United Kingdom"
    },
    {
        name: "Country Detection - Explicit Name",
        text: "This position is located in Munich, Germany.",
        expectedCountry: "Germany"
    },
    {
        name: "Country Detection - Aliases",
        text: "Our office in the USA is hiring.",
        expectedCountry: "United States"
    },
    {
        name: "Implicit Negation - Complex",
        text: "We currently do not offer any form of visa processing.",
        expectedStatus: "negative",
        expectedNegative: ['implicitly negated: "visa processing"']
    }
];

let passed = 0;
let failed = 0;

testCases.forEach(tc => {
    const result = detector.detect(tc.text, tc.url || "");
    let success = true;
    let errors = [];

    if (tc.expectedStatus && result.status !== tc.expectedStatus) {
        success = false;
        errors.push(`Expected status '${tc.expectedStatus}', got '${result.status}'`);
    }

    if (tc.expectedPositive) {
        const matches = result.positiveMatches.map(m => m.toLowerCase());
        for (let expected of tc.expectedPositive) {
            if (!matches.includes(expected.toLowerCase())) {
                success = false;
                errors.push(`Expected positive match '${expected}' not found in ${JSON.stringify(matches)}`);
            }
        }
    }

    if (tc.expectedNegative) {
        const matches = result.negativeMatches.map(m => m.toLowerCase());
        for (let expected of tc.expectedNegative) {
            if (!matches.includes(expected.toLowerCase())) {
                success = false;
                errors.push(`Expected negative match '${expected}' not found in ${JSON.stringify(matches)}`);
            }
        }
    }

    if (tc.expectedAmbiguous) {
        const matches = result.ambiguousMatches.map(m => m.toLowerCase());
        for (let expected of tc.expectedAmbiguous) {
            if (!matches.includes(expected.toLowerCase())) {
                success = false;
                errors.push(`Expected ambiguous match '${expected}' not found in ${JSON.stringify(matches)}`);
            }
        }
    }

    if (tc.expectedCountry && result.country !== tc.expectedCountry) {
        success = false;
        errors.push(`Expected country '${tc.expectedCountry}', got '${result.country}'`);
    }

    if (success) {
        console.log(`✅ [PASS] ${tc.name}`);
        passed++;
    } else {
        console.error(`❌ [FAIL] ${tc.name}`);
        errors.forEach(e => console.error(`   -> ${e}`));
        console.error(`   Actual Result: ${JSON.stringify(result, null, 2)}`);
        failed++;
    }
});

console.log(`
Results: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
