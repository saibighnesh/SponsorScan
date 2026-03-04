const detector = {
  positiveSignals: [
    "visa sponsorship available",
    "visa sponsorship provided",
    "we sponsor h-1b",
    "h-1b sponsorship",
    "willing to sponsor",
    "open to sponsoring",
    "certificate of sponsorship",
    "relocation package",
    "relocation assistance",
    "international candidates welcome",
    "open to global talent",
    "immigration support",
    "immigration assistance",
    "h1b transfer",
    "cap-exempt",
    "stem opt",
    "tn visa",
    "e-3 visa",
    "blue card",
    "global talent visa",
    "sponsorship for the right candidate",
    "help with visa",
    "visa processing",
    "we hire internationally",
    "can sponsor",
    "eligible for sponsorship",
    "visa support",
    "work permit sponsorship",
    "sponsorship considered",
    "we provide sponsorship",
    "assisting with visa",
    "tier 2 sponsorship",
    "tier 2 visa",
    "skilled worker visa sponsorship",
    "l1 visa",
    "l-1 visa",
    "o1 visa",
    "o-1 visa",
    "j1 visa",
    "j-1 visa",
    "opt extension",
    "cpt/opt",
    "employer sponsorship",
    "visa support provided",
    "we will sponsor",
    "sponsorship is available",
    "relocation covered",
    "relocation expenses",
    "relocation bonus",
    "visa and relocation",
    "work permit support",
    "work visa support",
    "sponsoring foreign workers",
    "open to expat",
    "expat package",
    "lmia",
    "labour market impact assessment",
    "tss visa",
    "subclass 482",
    "employer nomination scheme",
    "subclass 186",
    "highly skilled migrant",
    "kennismigrant",
    "critical skills employment permit",
    "tech nation visa",
    "we support visa applications",
    "visa assistance provided",
    "we offer visa sponsorship",
    "relocation budget",
    "comprehensive relocation",
    "relocation support",
    "regardless of citizenship or visa status",
    "eligible for visa sponsorship",
    // US-Specific
    "we are able to sponsor",
    "we offer h1b sponsorship",
    "h-1b and visa sponsorship available",
    "visa sponsorship for qualified candidates",
    "we do sponsor visas",
    "will sponsor international applicants",
    "visa candidates welcome",
    "eb-3 visa",
    "eb-2 visa",
    "eb-1 visa",
    "employment-based visa",
    "immigration sponsorship",
    "green card sponsorship",
    "permanent residency sponsorship",
    "perm labor certification",
    "f-1 visa",
    "opt/cpt eligible",
    "we support opt",
    "e-2 visa",
    "h-2b visa",
    "confirmed can sponsor visas",
    // UK-Specific
    "skilled worker visa",
    "we are a licensed sponsor",
    "we hold a sponsor licence",
    "cos available",
    "health and care worker visa",
    "global business mobility visa",
    "scale-up visa",
    "graduate visa",
    "innovator founder visa",
    "high potential individual visa",
    // Australia-Specific
    "employer sponsored visa",
    "482 sponsorship",
    "skills in demand visa",
    "subclass 494",
    "subclass 457",
    "dama sponsorship",
    "regional visa sponsorship",
    "we support 482 and 494",
    // Canada-Specific
    "lmia available",
    "lmia provided",
    "lmia sponsorship",
    "express entry candidates welcome",
    "pgwp holders welcome",
    "open work permit holders encouraged",
    "global talent stream",
    // Gulf / Middle East
    "employment visa provided",
    "work permit provided",
    "iqama provided",
    "sponsorship transfer available",
    "visa and accommodation provided",
    "golden visa",
    "free zone visa",
    // EU / General
    "we welcome international applicants",
    "open to international candidates",
    "talent passport",
    "eu blue card sponsorship",
    "we have experience with international hires",
    "as a certified visa sponsor",
    "we are able to sponsor visa applications",
    // Asia-Pacific
    "employment pass sponsorship",
    "dependent pass",
    "work holiday visa",
    // German
    "visumsponsoring",
    "visa-sponsoring",
    "unterstützung bei visum",
    "wir sponsern",
    "relocation-paket",
    "umzugshilfe",
    "visa unterstützung",
    // French
    "parrainage de visa",
    "sponsorisation de visa",
    "aide à la relocalisation",
    "soutien pour le visa",
    // Dutch
    "visumsponsoring",
    "hulp bij relocatie",
    "relocatiepakket",
    "kennismigrantenregeling",
    // Spanish
    "patrocinio de visa disponible",
    "ofrecemos patrocinio de visa",
    "apoyo para visa",
    // Portuguese
    "patrocínio de visto disponível",
    "apoio para visto",
    // Japanese
    "ビザサポートあり",
    "就労ビザ取得支援",
    // Korean
    "비자 스폰서십 가능",
    // Arabic
    "كفالة عمل متوفرة",
    "تأشيرة عمل مقدمة"
  ],

  negativeSignals: [
    "no visa sponsorship",
    "unable to sponsor",
    "must be authorized to work in",
    "us citizens only",
    "permanent resident required",
    "must have the right to work",
    "security clearance required",
    "no h1b",
    "not open to sponsorship",
    "green card holder only",
    "citizen or permanent resident",
    "valid work permit required",
    "must be located in",
    "we do not provide relocation or sponsorship",
    "right to work in the uk is essential",
    "candidates must not require sponsorship",
    "no sponsorship now or in the future",
    "unable to provide visa support",
    "must have legal right to work",
    "does not offer sponsorship",
    "not providing sponsorship",
    "no relocation or visa assistance",
    "only candidates with work authorization",
    "must already have work rights",
    "we cannot sponsor",
    "no c2c",
    "w2 only",
    "no corp to corp",
    "1099 only",
    "must hold a valid work visa",
    "must have existing work authorization",
    "independent contractors only",
    "no visa support",
    "cannot provide sponsorship",
    "will not sponsor",
    "will not provide sponsorship",
    "no relocation support",
    "no relocation assistance",
    "must reside in",
    "must be currently residing in",
    "local candidates only",
    "no third party",
    "no 3rd party",
    "must be a us citizen",
    "must be an australian citizen",
    "must be a uk citizen",
    "must be a canadian citizen",
    // Standalone citizenship phrases (catch "be a US citizen", "are a US citizen", etc.)
    "us citizen",
    "u.s. citizen",
    "united states citizen",
    "us citizenship required",
    "u.s. citizenship required",
    "us citizenship is required",
    "u.s. citizenship is required",
    "us national",
    "citizenship required",
    "citizenship is required",
    "proof of citizenship",
    "citizen of the united states",
    "be a citizen",
    "american citizen",
    "british citizen",
    "australian citizen",
    "canadian citizen",
    // Security clearance variants
    "active top secret",
    "active ts/sci",
    "top secret security clearance",
    "secret security clearance",
    "active secret clearance",
    "possess a security clearance",
    "possess and maintain",
    "maintain an active",
    "current security clearance",
    "active security clearance",
    "dod secret clearance",
    "dod top secret",
    "nato clearance",
    "public trust clearance",
    "sci clearance",
    "polygraph required",
    "interim clearance",
    "clearance is required",
    "clearance required for this position",
    "must be clearable",
    "must obtain a security clearance",
    // Federal / government only
    "federal employees only",
    "government employees only",
    "us government clearance",
    "federal government position",
    "open to us persons only",
    "us person",
    "u.s. person",
    "itar restricted",
    "ear restricted",
    "export controlled",
    "export control regulations",
    "pr only",
    "permanent residents only",
    "requires active security clearance",
    "top secret clearance",
    "ts/sci",
    "eligible to work without sponsorship",
    "authorized to work without sponsorship",
    "we do not sponsor foreign nationals",
    "not offering sponsorship",
    "does not sponsor visas",
    "sponsorship is not available",
    "unable to offer sponsorship",
    "not able to sponsor",
    "unfortunately we cannot sponsor",
    "no sponsorship available",
    "currently not sponsoring",
    "we do not offer visa sponsorship",
    "without the need for visa sponsorship",
    "without requiring visa sponsorship",
    "will not require sponsorship",
    "does not require sponsorship",
    "not eligible for visa sponsorship",
    "not eligible for sponsorship",
    // US-Specific
    "this position does not offer visa sponsorship",
    "no immigration or work visa sponsorship",
    "applicants must be legally authorized to work",
    "must be authorized to work without sponsorship",
    "legally authorized to work without the need for employer sponsorship",
    "must have unrestricted ability to work",
    "no sponsorship for this position",
    "this position is not eligible for sponsorship",
    "no j1 or h2b visa sponsorships",
    "we are currently not offering visa sponsorship for this role",
    "if you require visa sponsorship please do not apply",
    // UK-Specific
    "we are not a licensed sponsor",
    "this vacancy does not offer visa sponsorship",
    "please only apply if you have the right to work",
    "this role is not eligible for sponsorship",
    "not typically consider for sponsorship under the skilled worker route",
    "applicants must have the right to work in the uk at the time of application",
    "must already possess the unrestricted right to live and work",
    "eu settled status required",
    "pre-settled status required",
    // Australia-Specific
    "must have australian work rights",
    "australian residents only",
    "must hold valid working rights in australia",
    "not offering 482 sponsorship",
    // Canada-Specific
    "must be eligible to work in canada",
    "canadian citizens and permanent residents only",
    "no lmia support",
    // Gulf / Middle East
    "local hire only",
    "gcc nationals only",
    "nationals only",
    "transferable iqama required",
    "valid iqama required",
    "existing visa holders only",
    // EU / General
    "eu citizens only",
    "eea nationals only",
    "must have eu work authorization",
    "schengen area residents only",
    "no relocation or sponsorship offered",
    // German
    "kein visumsponsoring",
    "nur für eu-bürger",
    "arbeitserlaubnis erforderlich",
    "gültige arbeitserlaubnis",
    "kein umzug",
    "keine visa-unterstützung",
    // French
    "pas de parrainage de visa",
    "autorisation de travail requise",
    "citoyens de l'ue uniquement",
    "aucun parrainage",
    // Dutch
    "geen visumsponsoring",
    "werkvergunning vereist",
    "alleen eu-burgers",
    "geen relocatie",
    // Spanish
    "no se ofrece patrocinio de visa",
    "permiso de trabajo requerido",
    // Portuguese
    "não oferecemos patrocínio de visto",
    "autorização de trabalho necessária",
    // Japanese
    "就労ビザのサポートは行っておりません",
    // Korean
    "비자 스폰서십 불가",
    // Arabic
    "للمواطنين فقط"
  ],

  allCountries: [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ],

  countryAliases: {
    "United States": { patterns: ["usa", "u.s.", "u.s.a.", "new york", "san francisco", "los angeles", "chicago", "seattle", "boston", "austin", "denver", "atlanta", "dallas", "houston", "remote us", "h-1b", "h1b", "green card", "e-verify"], currency: ["usd"], urlPatterns: [".us"] },
    "United Kingdom": { patterns: ["uk", "u.k.", "london", "manchester", "birmingham", "edinburgh", "glasgow", "bristol", "cambridge", "oxford", "great britain", "england", "scotland", "wales", "skilled worker visa", "tier 2"], currency: ["£", "gbp"], urlPatterns: [".co.uk", ".uk"] },
    "United Arab Emirates": { patterns: ["uae", "u.a.e.", "dubai", "abu dhabi", "sharjah", "ajman"], currency: ["aed", "dirham"], urlPatterns: [".ae"] },
    "Germany": { patterns: ["berlin", "munich", "münchen", "hamburg", "frankfurt", "stuttgart", "cologne", "köln", "düsseldorf", "blue card"], currency: ["eur"], urlPatterns: [".de"] },
    "Canada": { patterns: ["toronto", "vancouver", "montreal", "ottawa", "calgary", "edmonton", "winnipeg", "lmia"], currency: ["cad"], urlPatterns: [".ca"] },
    "Australia": { patterns: ["sydney", "melbourne", "brisbane", "perth", "adelaide", "canberra", "subclass 482", "subclass 186", "tss visa"], currency: ["aud"], urlPatterns: [".com.au", ".au"] },
    "Netherlands": { patterns: ["amsterdam", "rotterdam", "the hague", "eindhoven", "utrecht", "30% ruling", "kennismigrant"], currency: ["eur"], urlPatterns: [".nl"] },
    "Singapore": { patterns: ["singapore", "singaporean", "employment pass", "s pass"], currency: ["sgd"], urlPatterns: [".sg", ".com.sg"] },
    "Ireland": { patterns: ["dublin", "cork", "galway", "limerick", "critical skills", "stamp 1"], currency: ["eur"], urlPatterns: [".ie"] },
    "Japan": { patterns: ["tokyo", "osaka", "kyoto", "yokohama", "nagoya", "fukuoka"], currency: ["jpy", "¥"], urlPatterns: [".jp", ".co.jp"] },
    "France": { patterns: ["paris", "lyon", "marseille", "toulouse", "nice", "bordeaux", "talent passport"], currency: ["eur"], urlPatterns: [".fr"] },
    "Sweden": { patterns: ["stockholm", "gothenburg", "malmö", "uppsala"], currency: ["sek"], urlPatterns: [".se"] },
    "Switzerland": { patterns: ["zurich", "zürich", "geneva", "genève", "basel", "bern", "lausanne"], currency: ["chf"], urlPatterns: [".ch"] },
    "India": { patterns: ["bangalore", "bengaluru", "mumbai", "delhi", "hyderabad", "pune", "chennai", "kolkata", "gurgaon", "noida"], currency: ["inr", "₹"], urlPatterns: [".in", ".co.in"] },
    "South Korea": { patterns: ["seoul", "busan", "south korea", "korean"], currency: ["krw", "₩"], urlPatterns: [".kr", ".co.kr"] },
    "Spain": { patterns: ["madrid", "barcelona", "valencia", "seville", "malaga"], currency: ["eur"], urlPatterns: [".es"] },
    "Italy": { patterns: ["rome", "milan", "milano", "turin", "florence", "naples"], currency: ["eur"], urlPatterns: [".it"] },
    "Poland": { patterns: ["warsaw", "krakow", "kraków", "wroclaw", "gdansk", "poznan"], currency: ["pln", "zł"], urlPatterns: [".pl"] },
    "Saudi Arabia": { patterns: ["riyadh", "jeddah", "dammam", "mecca", "medina", "neom", "saudi"], currency: ["sar"], urlPatterns: [".sa"] },
    "Qatar": { patterns: ["doha", "qatar", "qatari"], currency: ["qar"], urlPatterns: [".qa"] },
    "New Zealand": { patterns: ["auckland", "wellington", "christchurch", "new zealand", "kiwi"], currency: ["nzd"], urlPatterns: [".nz", ".co.nz"] },
    "Remote / Global": { patterns: ["remote worldwide", "remote global", "remote anywhere", "work from anywhere", "location independent", "fully remote", "distributed team worldwide"], currency: [], urlPatterns: [] }
  },

  ambiguousSignals: [
    "relocation",
    "global team",
    "work authorization required",
    "right to work",
    "eligible to work",
    "authorized to work",
    "employment eligibility",
    "background check required"
  ],

  // Phrases that look like visa/sponsorship signals but are NOT about immigration.
  // If any of these appear near a detected signal, the signal is discarded.
  falsePositiveContexts: [
    // Security-related (not security clearance for immigration)
    "security check",
    "security screening",
    "security assessment",
    "safety check",
    "safety clearance",
    // Background checks (generic employment, not immigration)
    "criminal background check",
    "drug testing",
    "drug screening",
    "driving record check",
    "driving record",
    "credit check",
    "reference check",
    "physical abilities evaluation",
    // Work schedule phrases (not work authorization)
    "must be able to work weekends",
    "must be able to work overtime",
    "must be able to work nights",
    "must be able to work shifts",
    "must be willing to work",
    "able to work independently",
    "able to work in a team",
    "able to work under pressure",
    "able to work in a fast-paced environment",
    // Generic corporate phrases
    "equal employment opportunity",
    "equal opportunity employer",
    "eeo",
    "affirmative action",
    "consistent with the requirements of federal",
    "qualified applicants will receive consideration",
    "regardless of race",
    "without regard to",
    // Travel visa (not work visa)
    "travel visa",
    "tourist visa",
    "transit visa",
    // Sponsor in non-visa contexts
    "event sponsor",
    "conference sponsor",
    "program sponsor",
    "project sponsor",
    "sponsor a child",
    "sponsor a student",
    "charity sponsor",
    "sponsorship deal",
    "sponsorship package",
    "brand sponsor",
    // Relocation in physical/equipment context
    "server relocation",
    "office relocation",
    "equipment relocation",
    "data center relocation",
    "asset relocation"
  ],

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  detect(text, url = "") {
    // Normalize text to single spaces to make contextual matching easier
    const normalizedText = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').toLowerCase();

    let foundPositive = [];
    let foundNegative = [];
    let foundAmbiguous = [];

    // 1. Detect Explicit Negative Signals First
    this.negativeSignals.forEach(phrase => {
      const regex = new RegExp('\\b' + this.escapeRegExp(phrase) + '\\b', 'i');
      if (regex.test(normalizedText)) {
        foundNegative.push(phrase);
      }
    });

    // 2. Mask Negative Phrases so they don't trigger Positive ones
    // e.g. "no visa sponsorship" masks "visa sponsorship"
    let maskedText = normalizedText;
    foundNegative.forEach(phrase => {
      const regex = new RegExp('\\b' + this.escapeRegExp(phrase) + '\\b', 'ig');
      maskedText = maskedText.replace(regex, ' [MASKED_NEG] ');
    });

    // 2b. Mask False Positive Context phrases so they don't trigger signals
    // e.g. "event sponsor" masks "sponsor", "office relocation" masks "relocation"
    this.falsePositiveContexts.forEach(fpPhrase => {
      const fpRegex = new RegExp('\\b' + this.escapeRegExp(fpPhrase) + '\\b', 'ig');
      maskedText = maskedText.replace(fpRegex, ' [MASKED_FP] ');
    });

    // 3. Detect Positive Signals in the Masked Text, 
    //    and check for Implicit Negation
    // Helper: for CJK characters (Japanese, Korean, Chinese), \b won't work,
    // so we use a simpler includes-based check as fallback.
    const isCJK = (str) => /[\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]/.test(str);

    this.positiveSignals.forEach(phrase => {
      let matched = false;
      if (isCJK(phrase)) {
        matched = maskedText.includes(phrase);
      } else {
        const regex = new RegExp('\\b' + this.escapeRegExp(phrase) + '\\b', 'i');
        matched = regex.test(maskedText);
      }

      if (matched) {
        // Check for immediate negation up to 6 words before the phrase
        const negationWords = "(no|not|without|unable to|cannot|can't|won't|will not|does not|doesn't|isn't|aren't|do not)";
        const implicitNegationRegex = new RegExp('\\b' + negationWords + '\\b\\s+(?:\\w+\\s+){0,6}' + this.escapeRegExp(phrase) + '\\b', 'i');

        if (implicitNegationRegex.test(normalizedText)) {
          foundNegative.push(`implicitly negated: "${phrase}"`);
        } else {
          foundPositive.push(phrase);
        }
      }
    });

    // Mask positive phrases to not trigger ambiguous ones
    foundPositive.forEach(phrase => {
      const regex = new RegExp('\\b' + this.escapeRegExp(phrase) + '\\b', 'ig');
      maskedText = maskedText.replace(regex, ' [MASKED_POS] ');
    });

    // 4. Detect Ambiguous Signals
    this.ambiguousSignals.forEach(phrase => {
      const regex = new RegExp('\\b' + this.escapeRegExp(phrase) + '\\b', 'i');
      if (regex.test(maskedText)) {
        foundAmbiguous.push(phrase);
      }
    });

    // 5. Determine Status
    let status = "no-info";
    let summary = "No visa or sponsorship related language was detected on this page.";

    if (foundPositive.length > 0 && foundNegative.length === 0) {
      status = "positive";
      summary = "This job posting mentions visa sponsorship.";
    } else if (foundNegative.length > 0 && foundPositive.length === 0) {
      status = "negative";
      summary = "This job posting indicates NO visa sponsorship.";
    } else if (foundPositive.length > 0 && foundNegative.length > 0) {
      status = "unclear";
      summary = "Mixed or vague signals found. Review below.";
    } else if (foundAmbiguous.length > 0 && foundPositive.length === 0 && foundNegative.length === 0) {
      status = "unclear";
      summary = "Mixed or vague signals found. Review below.";
    }

    const country = this.detectCountry(normalizedText, url);

    return {
      status,
      summary,
      positiveMatches: foundPositive,
      negativeMatches: foundNegative,
      ambiguousMatches: foundAmbiguous,
      country: country || "Country not detected"
    };
  },

  detectCountry(text, url = "") {
    let bestMatch = null;
    let maxScore = 0;

    // Check aliases and specific patterns first
    for (const [country, config] of Object.entries(this.countryAliases)) {
      let score = 0;

      config.patterns.forEach(p => {
        const regex = new RegExp('\\b' + this.escapeRegExp(p.toLowerCase()) + '\\b', 'i');
        if (regex.test(text)) score += 1.5;
      });

      if (config.currency) {
        config.currency.forEach(c => {
          if (text.includes(c)) score += 0.5;
        });
      }

      if (url && config.urlPatterns) {
        config.urlPatterns.forEach(u => {
          if (url.includes(u)) score += 1;
        });
      }

      const countryRegex = new RegExp('\\b' + this.escapeRegExp(country.toLowerCase()) + '\\b', 'i');
      if (countryRegex.test(text)) score += 2;

      if (score > maxScore) {
        maxScore = score;
        bestMatch = country;
      }
    }

    // Check all countries
    this.allCountries.forEach(country => {
      let score = 0;
      const countryRegex = new RegExp('\\b' + this.escapeRegExp(country.toLowerCase()) + '\\b', 'i');
      if (countryRegex.test(text)) score += 1;

      if (score > maxScore) {
        maxScore = score;
        bestMatch = country;
      }
    });

    return bestMatch;
  }
};
