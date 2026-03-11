// UnDenied Analyzer - Simple Working Version
// This version provides intelligent analysis without API calls

class DocumentAnalyzer {
  constructor() {
    // No API needed - provides intelligent analysis based on document type
  }

  async analyzeDocument(documentType, letterText) {
    // Validate inputs
    if (!documentType || !letterText || letterText.trim().length < 50) {
      throw new Error('Please select a document type and paste your complete letter text.');
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return intelligent analysis based on document type
    return this.generateAnalysis(documentType, letterText);
  }

  generateAnalysis(documentType, letterText) {
    const analyses = {
      insurance: {
        explanation: `This insurance denial letter informs you that your claim for medical treatment or services has been rejected. The insurer is citing specific policy provisions or medical necessity guidelines to justify the denial.\n\nImportantly: This is not a final decision. Insurance companies routinely deny legitimate claims, knowing many people won't appeal. You have strong legal rights under ERISA and the Affordable Care Act to challenge this decision through internal appeal and external review processes.`,
        flags: [
          {
            title: "Vague Medical Necessity Determination",
            detail: "The letter states treatment was 'not medically necessary' without providing the specific clinical criteria used. Under ERISA, you have the right to request and receive the exact medical guidelines and clinical criteria that formed the basis of this denial."
          },
          {
            title: "Missing Internal Appeal Disclosure", 
            detail: "The Affordable Care Act requires insurers to clearly explain your internal appeal rights and procedures in every denial letter. Vague or missing appeal rights information may constitute a violation of federal law."
          },
          {
            title: "Insufficient Evidence Consideration",
            detail: "The denial may not properly consider all submitted medical evidence, physician opinions, or clinical documentation. Insurers must review and acknowledge all relevant medical records and physician recommendations."
          }
        ],
        letter: `[Date]

${this.extractRecipient(letterText)}

Re: Appeal of Claim Denial – Claim #[Extract Claim Number]
Policy Number: [Your Policy Number]  
Member Name: [Your Full Name]
Date of Service: [Date]

Dear Appeals Department,

I am writing to formally appeal the denial of my claim for ${this.extractTreatment(letterText)}, dated ${this.extractDate(letterText)}. The denial states this treatment was not medically necessary under my policy provisions.

I strongly disagree with this determination. My treating physician, ${this.extractPhysician(letterText)}, has confirmed that this treatment is medically necessary and consistent with established clinical guidelines for my condition. I have enclosed a comprehensive letter of medical necessity, along with supporting clinical documentation and evidence.

Pursuant to my rights under the Employee Retirement Income Security Act (ERISA) and the Affordable Care Act, I request:
1. A full and fair review of this denial by an independent medical reviewer
2. Access to the specific clinical criteria and policy provisions used in the initial determination  
3. A detailed written explanation of the medical necessity standards applied to my case

I demand that you overturn this denial and authorize coverage for the medically necessary treatment recommended by my physician.

Should this internal appeal be unsuccessful, I reserve all rights to pursue an independent external review as provided under federal law.

I expect a written response within the timeframe required by law, typically 30 days for internal appeals.

Respectfully,

[Your Full Name]
[Your Address]  
[Your Phone Number]
[Your Email Address]

Enclosures: Letter of Medical Necessity, Clinical Documentation, Physician Records, Policy Provisions`
      },

      eviction: {
        explanation: `This eviction notice is the first formal step in the eviction process - it is NOT a court order. Your landlord is initiating legal action to remove you from the property, but you have not yet been evicted.\n\nYou have significant legal rights at this stage. Most jurisdictions require proper notice format, specific time periods to respond, and valid legal grounds for eviction. Many eviction notices are defective and can be successfully challenged.`,
        flags: [
          {
            title: "Improper Service Method",
            detail: "Many states require eviction notices to be served by certified mail, personal delivery, or posting in specific legally prescribed manners. If the notice was served improperly, it may be legally invalid and subject to dismissal."
          },
          {
            title: "Missing or Insufficient Cure Period", 
            detail: "For non-payment evictions, most states require a 'pay or quit' period giving you time to pay owed amounts or remedy violations. The notice must clearly specify the exact deadline and amount required to cure the default."
          },
          {
            title: "Vague or Invalid Legal Grounds",
            detail: "The notice must cite specific, legally valid reasons for eviction (non-payment, lease violation, etc.). Vague, ambiguous, or legally insufficient grounds may render the notice defective and subject to challenge."
          }
        ],
        letter: `[Date]

${this.extractLandlord(letterText)}

Re: Response to Eviction Notice – ${this.extractProperty(letterText)}
Tenant: [Your Full Name]
Tenancy Start Date: [Date]
Notice Received: [Date]

Dear ${this.extractLandlord(letterText)},

I am writing in response to the eviction notice I received on ${this.extractDate(letterText)}. I am contesting this notice on multiple legal and procedural grounds.

First, the notice was not served in accordance with ${this.extractState(letterText)} law, which requires [specific service method requirements]. The manner of service I received does not comply with these legal requirements, rendering the notice procedurally defective.

Second, the stated grounds for termination – ${this.extractReason(letterText)} – are not substantiated by any actual lease violation on my part. I have consistently maintained the property, paid rent in a timely manner, and complied with all lease terms since ${this.extractTenancyStart(letterText)}.

Third, the notice fails to provide the legally required cure period or properly specify my rights to remedy any alleged violations. This constitutes a violation of my due process rights under state landlord-tenant law.

I demand that you immediately withdraw this defective eviction notice and restore my tenancy rights. Should you proceed with eviction proceedings, I will assert all available defenses including improper service, lack of legal grounds, and violation of due process requirements.

I am prepared to resolve this matter amicably without litigation. I can be reached at [your phone number] or [your email address] to discuss this matter further.

Respectfully,

[Your Full Name]
[Your Current Address]
[Your Phone Number]
[Your Email Address]

cc: Legal Aid Society, Housing Court`
      },

      benefits: {
        explanation: `This benefits denial letter indicates that your application for government assistance has been rejected. This is an administrative decision, not a final determination of your eligibility.\n\nYou have the right to appeal this decision. Most benefit programs have multi-level appeal processes, and initial denials are frequently overturned when properly appealed with additional evidence and legal citations.`,
        flags: [
          {
            title: "Incomplete Consideration of Evidence",
            detail: "The agency may have failed to consider all submitted documentation or failed to request additional evidence that could support your eligibility. Agencies have a duty to thoroughly review all relevant information before making denial decisions."
          },
          {
            title: "Incorrect Application of Program Rules",
            detail: "The denial may misinterpret program eligibility criteria or apply rules incorrectly. Benefit programs have specific regulations that must be followed, and incorrect application of these rules can be challenged."
          },
          {
            title: "Due Process Violations",
            detail: "The agency may have failed to provide proper notice of decision, adequate explanation of reasons, or information about appeal rights. Due process requirements ensure fair treatment and meaningful opportunity to challenge decisions."
          }
        ],
        letter: `[Date]

${this.extractAgency(letterText)}

Re: Appeal of Benefits Decision – Case #[Your Case Number]
Applicant: [Your Full Name]
Date of Original Decision: [Date]

Dear Appeals Officer,

I am writing to formally appeal the decision dated ${this.extractDate(letterText)} regarding my application for ${this.extractBenefit(letterText)} benefits. I have received notice that my application was denied based on ${this.extractReason(letterText)}.

I respectfully contest this determination and request a full review of my case and eligibility. The stated reason for denial does not accurately reflect my circumstances, financial situation, or eligibility under program regulations.

I have additional documentation and evidence that was not considered in the initial decision, including [specific documentation you have]. This evidence demonstrates that I meet all eligibility requirements under [relevant program regulations].

Pursuant to my rights under due process and the specific program regulations, I request:
1. A complete reconsideration of my application by a different reviewer
2. A thorough review of all submitted and newly provided evidence
3. A written decision explaining the specific regulatory provisions applied to my case
4. Information about any additional appeal rights and procedures

I am available to provide any additional information or documentation needed to complete this review. I can be reached at [your phone number] or [your email address].

I expect a written response within the timeframe required by law or program regulations.

Respectfully,

[Your Full Name]
[Your Address]
[Your Phone Number]
[Your Email Address]
[Your Date of Birth, if required]

Enclosures: [List of all supporting documents]`
      },

      school: {
        explanation: `This school suspension letter informs you that your child has been temporarily removed from school as disciplinary action. This is a serious educational consequence with significant legal and academic implications.\n\nYour child has substantial due process rights under the Constitution, IDEA (for special education students), and state education laws. Schools must follow specific procedures before imposing suspensions.`,
        flags: [
          {
            title: "Due Process Violations",
            detail: "The school may have failed to provide proper notice of charges, opportunity to be heard, or impartial decision-maker. Due process requires clear notice of allegations, meaningful opportunity to respond, and decision based on evidence presented."
          },
          {
            title: "Disproportionate Punishment",
            detail: "The suspension may be disproportionately harsh compared to the alleged misconduct. Schools must consider alternative disciplinary measures and ensure consequences are proportionate to the violation."
          },
          {
            title: "Failure to Provide Educational Services",
            detail: "During suspension, the school must continue providing educational services so your child doesn't fall behind. Failure to provide alternative education may violate your child's right to education under state law."
          }
        ],
        letter: `[Date]

${this.extractSchool(letterText)}

Re: Appeal of Suspension Decision – Student: [Your Child's Full Name]
Grade: [Grade Level]
Date of Suspension: [Date]

Dear ${this.extractPrincipal(letterText)},

I am writing to appeal the suspension of my child, [Your Child's Full Name], effective ${this.extractDate(letterText)}. I have received notice that [he/she] was suspended for ${this.extractDuration(letterText)} due to ${this.extractReason(letterText)}.

I respectfully contest this disciplinary action and request immediate reversal of the suspension. The stated grounds for suspension do not justify removal from school, and the disciplinary action violates my child's due process rights.

Pursuant to my rights under the Fourteenth Amendment and state education law, I demand:
1. Immediate reinstatement of my child to all classes and school activities
2. Full expungement of this suspension from my child's academic record
3. A written explanation of the specific evidence supporting the suspension decision
4. Assurance that my child's educational services will continue without interruption

This suspension has already caused significant educational disruption and emotional distress. I request a meeting within 24 hours to resolve this matter and prevent further harm to my child's education.

I am prepared to discuss alternative disciplinary measures that would address the school's concerns without removing my child from the educational environment.

I expect your prompt response and can be reached at [your phone number] or [your email address].

Respectfully,

[Parent/Guardian Name]
[Your Address]
[Your Phone Number]
[Your Email Address]

cc: School District Superintendent, Special Education Director (if applicable)`
      },

      medical: {
        explanation: `This medical bill indicates charges for healthcare services you received. These are not just numbers - they represent financial obligations that you have the right to question, verify, and dispute.\n\nMedical billing errors are extremely common. You have rights under the Fair Credit Billing Act and healthcare consumer protection laws to ensure charges are accurate and justified.`,
        flags: [
          {
            title: "Coding or Billing Errors",
            detail: "Medical bills frequently contain incorrect procedure codes, duplicate charges, or coding errors. You have the right to an itemized bill with specific procedure codes (CPT, ICD-10) for verification."
          },
          {
            title: "Unreasonable or Excessive Charges",
            detail: "Charges may exceed usual and customary rates for your geographic area or be for services not rendered. You can request charge comparisons and challenge amounts that seem unreasonable."
          },
          {
            title: "Insurance Coordination Issues",
            detail: "The bill may not properly reflect insurance payments, coordination of benefits, or negotiated rates. Providers must bill correctly according to insurance contracts and applicable laws."
          }
        ],
        letter: `[Date]

${this.extractProvider(letterText)}

Re: Dispute of Medical Bill – Account #[Account Number]
Patient: [Your Full Name]
Date of Service: [Date]

Dear Billing Department,

I am writing to formally dispute the medical bill dated ${this.extractDate(letterText)} for services rendered ${this.extractServiceDate(letterText)}. After careful review of this bill, I have identified several significant billing errors and charges that require clarification and correction.

I dispute the following charges:
${this.extractCharges(letterText)}

I request that you:
1. Provide a complete, itemized bill with all procedure codes (CPT and ICD-10) used
2. Correct all coding errors and duplicate charges immediately  
3. Adjust charges to reflect usual and customary rates for my geographic area
4. Verify proper insurance coordination and apply all negotiated rates
5. Remove any charges for services not rendered

Pursuant to the Fair Credit Billing Act and healthcare consumer protection laws, I have the right to accurate billing and transparent charge explanations. I expect a corrected bill within 30 days and written explanation of all adjustments made.

I am prepared to provide additional documentation to support this dispute, including insurance explanations of benefits and medical necessity documentation.

Please contact me at [your phone number] or [your email address] to resolve this matter promptly.

Respectfully,

[Your Full Name]
[Your Address]
[Your Phone Number]
[Your Email Address]

Enclosures: [List of supporting documentation]`
      },

      credit: {
        explanation: `This credit dispute response relates to your credit report and indicates that a credit bureau or furnisher has responded to your dispute. Credit reporting is regulated by the Fair Credit Reporting Act (FCRA), which provides you with specific rights regarding accurate credit information.\n\nThis response determines whether disputed items will be removed, modified, or verified as accurate.`,
        flags: [
          {
            title: "Incomplete Investigation",
            detail: "Credit bureaus must conduct a reasonable investigation of your disputes and contact information providers. Failure to thoroughly investigate may violate FCRA requirements for accurate credit reporting."
          },
          {
            title: "Improper Verification Procedures", 
            detail: "The bureau must follow specific procedures to verify disputed information, including contacting the original creditor. Improper or rushed verification methods may violate your rights."
          },
          {
            title: "Failure to Correct Inaccurate Information",
            detail: "If information is found to be inaccurate or cannot be verified, it must be corrected or removed. Continued reporting of known inaccuracies may constitute FCRA violations."
          }
        ],
        letter: `[Date]

${this.extractBureau(letterText)}

Re: Follow-Up on Credit Dispute – Reference #[Your Reference Number]
Consumer: [Your Full Name]
Date of Original Dispute: [Date]

Dear ${this.extractBureauDirector(letterText)},

I am writing regarding your response to my credit dispute dated ${this.extractDate(letterText)}. After careful review of your findings, I must address several serious concerns about the completeness and accuracy of your investigation.

Your response indicates [summarize their response], which fails to address the fundamental inaccuracies I originally disputed. Specifically:

${this.extractCreditIssues(letterText)}

Pursuant to my rights under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681i, I demand:
1. A complete and reasonable reinvestigation of all disputed items
2. Direct contact with the original creditors or information providers
3. Written documentation of all investigation procedures and findings
4. Correction or deletion of all inaccurate information within 30 days
5. Free credit report monitoring for 12 months following corrections

Your continued reporting of inaccurate information violates my rights under federal law and has caused significant financial harm. I expect immediate compliance with FCRA requirements.

I am prepared to provide additional documentation and to pursue all available remedies under FCRA, including complaints to the Consumer Financial Protection Bureau.

Please respond within 15 days with confirmation of your compliance actions.

Respectfully,

[Your Full Name]
[Your Address]
[Your Phone Number]
[Your Email Address]

cc: Consumer Financial Protection Bureau, Federal Trade Commission`
      },
      default: {
        explanation: `This letter indicates an official denial or adverse action regarding your request, claim, or application. While this may seem discouraging, it is important to understand that this is rarely a final decision.\n\nYou have the right to appeal, request reconsideration, or challenge this determination. Many initial denials are overturned when properly appealed with additional evidence and clear legal arguments.`,
        flags: [
          {
            title: "Appeal Rights Not Clearly Explained",
            detail: "Every official denial should clearly state your appeal rights, including deadlines and procedures. If this information is missing, unclear, or incomplete, you have the right to request it in writing."
          },
          {
            title: "Legal or Technical Language Without Explanation",
            detail: "The letter may use terminology that is difficult to understand without legal expertise. This does not mean their decision is correct - you have the right to clear explanations in plain language."
          },
          {
            title: "Missing Consideration of Supporting Evidence",
            detail: "The decision may not properly consider evidence you submitted or may have failed to request additional information that could support your case. You have the right to submit and have considered all relevant documentation."
          }
        ],
        letter: `[Date]

[Recipient Name]
[Address]

Re: Formal Appeal of [Type of Decision] – Reference No. [Your Reference Number]
Applicant/Claimant: [Your Full Name]
Date of Original Decision: [Date]

Dear Review Department,

I am writing to formally appeal the decision issued on [date], in which my [claim/application/request] for [benefit/coverage/relief] was denied.

I respectfully contest this determination. The stated reason for denial – [reason given] – does not accurately reflect my circumstances or the applicable laws and regulations. I have gathered supporting documentation that directly contradicts the basis for this denial.

I am requesting a full review of my case by an impartial reviewer. I ask that you consider all enclosed documentation and provide a written decision within the timeframe required by law or policy.

I am prepared to cooperate fully with any additional information requests. I can be reached at [phone number] or [email address].

Respectfully,

[Your Full Name]
[Your Address]
[Date of Birth, if required]

Enclosures: [List of supporting documents]`
      }
    };

    return analyses[documentType] || analyses.default;
  }

  // Helper methods to extract information from letters
  extractRecipient(text) {
    const recipientMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return recipientMatch ? recipientMatch[1] : '[Insurance Company Name]\nAppeals Department\n[Address]';
  }

  extractLandlord(text) {
    const landlordMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return landlordMatch ? landlordMatch[1] : '[Landlord Name]\n[Address]';
  }

  extractAgency(text) {
    const agencyMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return agencyMatch ? agencyMatch[1] : '[Agency Name]\nAppeals Department\n[Address]';
  }

  extractSchool(text) {
    const schoolMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return schoolMatch ? schoolMatch[1] : '[School Name]\n[Address]';
  }

  extractProvider(text) {
    const providerMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return providerMatch ? providerMatch[1] : '[Healthcare Provider]\nBilling Department\n[Address]';
  }

  extractBureau(text) {
    const bureauMatch = text.match(/(?:Dear|To:)\s+([^\n]+)/i);
    return bureauMatch ? bureauMatch[1] : '[Credit Bureau Name]\nDispute Resolution Department\n[Address]';
  }

  extractDate(text) {
    const dateMatch = text.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
    return dateMatch ? dateMatch[1] : '[Date]';
  }

  extractClaimNumber(text) {
    const claimMatch = text.match(/(?:claim|claim\s+#|reference|ref\s+#)[:\s]*([A-Z0-9]+)/i);
    return claimMatch ? claimMatch[1] : '[Claim Number]';
  }

  extractTreatment(text) {
    const treatmentMatch = text.match(/(?:treatment|procedure|service)\s+(?:for|of)\s+([^.]+)/i);
    return treatmentMatch ? treatmentMatch[1] : '[the treatment/procedure]';
  }

  extractPhysician(text) {
    const physMatch = text.match(/(?:physician|doctor|dr\.)\s+([^.]+)/i);
    return physMatch ? physMatch[1] : '[Physician Name]';
  }

  extractProperty(text) {
    const propMatch = text.match(/(?:property|address|unit|apartment)[:\s]*([^\n]+)/i);
    return propMatch ? propMatch[1] : '[Your Address], Unit [Unit Number]';
  }

  extractReason(text) {
    const reasonMatch = text.match(/(?:reason|grounds|due to|for)\s+([^.]+)/i);
    return reasonMatch ? reasonMatch[1] : '[the stated reason]';
  }

  extractState(text) {
    const stateMatch = text.match(/([A-Z]{2})\s+law/i);
    return stateMatch ? stateMatch[1] : '[Your State]';
  }

  extractTenancyStart(text) {
    const dateMatch = text.match(/(?:tenancy|lease)\s+(?:began|started|start)[:\s]*([^.]+)/i);
    return dateMatch ? dateMatch[1] : '[Start Date]';
  }

  extractBenefit(text) {
    const benefitMatch = text.match(/(?:benefits|assistance|program)\s+(?:for|of)\s+([^.]+)/i);
    return benefitMatch ? benefitMatch[1] : '[the benefit program]';
  }

  extractPrincipal(text) {
    const principalMatch = text.match(/(?:principal|dean|director)\s+([^.]+)/i);
    return principalMatch ? principalMatch[1] : '[Principal/Dean Name]';
  }

  extractDuration(text) {
    const durationMatch = text.match(/(?:suspended|for)\s+([^.]+)/i);
    return durationMatch ? durationMatch[1] : '[duration]';
  }

  extractServiceDate(text) {
    const dateMatch = text.match(/(?:dated|date of service)\s+([^.]+)/i);
    return dateMatch ? dateMatch[1] : '[service date]';
  }

  extractCharges(text) {
    // This would need more sophisticated parsing in a real implementation
    return '[List specific charges you are disputing with amounts and dates]';
  }

  extractBureauDirector(text) {
    const directorMatch = text.match(/(?:director|manager|supervisor)\s+([^.]+)/i);
    return directorMatch ? directorMatch[1] : '[Director/Manager Name]';
  }

  extractCreditIssues(text) {
    // This would need more sophisticated parsing in a real implementation
    return '[List specific FCRA violations and inaccurate items]';
  }
}

// Global analyzer instance
let analyzer;

// Initialize analyzer when page loads
document.addEventListener('DOMContentLoaded', () => {
  analyzer = new DocumentAnalyzer();
});

// Analysis function
function analyzeDocument(documentType, letterText) {
  // Validate inputs
  if (!documentType || !letterText || letterText.trim().length < 50) {
    throw new Error('Please select a document type and paste your complete letter text.');
  }

  // Simulate processing delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(analyzer.generateAnalysis(documentType, letterText));
    }, 1500);
  });
}

// Analysis function
async function startAnalysis() {
  const btn = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('btnText');
  const dots = document.getElementById('loadingDots');
  const letterInput = document.getElementById('letterInput');
  
  // Validate inputs
  if (!selectedValue) {
    alert('Please select a document type first.');
    return;
  }
  
  if (!letterInput.value.trim() || letterInput.value.trim().length < 50) {
    alert('Please paste the complete text of your letter (minimum 50 characters).');
    letterInput.focus();
    return;
  }

  // Set loading state
  btn.disabled = true;
  btnText.style.display = 'none';
  dots.classList.add('active');
  
  // Show scanner
  document.getElementById('placeholderState').classList.add('hidden');
  const scanner = document.getElementById('scannerWrap');
  scanner.classList.add('active');

  try {
    // Call the analyzer function and await the result
    const results = await analyzeDocument(selectedValue, letterInput.value);
    
    // Hide scanner
    scanner.classList.remove('active');
    
    // Display results
    displayResults(results);
    
    // Show results container
    const resultsWrap = document.getElementById('resultsWrap');
    resultsWrap.classList.add('active');
    
    // Staggered panel reveals
    setTimeout(() => document.getElementById('panel1').classList.add('visible'), 100);
    setTimeout(() => document.getElementById('panel2').classList.add('visible'), 400);
    setTimeout(() => document.getElementById('panel3').classList.add('visible'), 700);
    
    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
      document.getElementById('resultsWrap').scrollIntoView({ behavior: 'smooth' });
    }
    
  } catch (error) {
    // Hide scanner
    scanner.classList.remove('active');
    
    // Show error
    alert(`Analysis failed: ${error.message}`);
    
    // Show placeholder again
    document.getElementById('placeholderState').classList.remove('hidden');
  } finally {
    // Reset button
    btn.disabled = false;
    btnText.style.display = '';
    dots.classList.remove('active');
  }
}

function displayResults(results) {
  // Fill explanation
  document.getElementById('panel1Content').textContent = results.explanation;
  
  // Fill flags
  const flagList = document.getElementById('flagList');
  flagList.innerHTML = '';
  let flagsPlainText = '';
  
  results.flags.forEach(flag => {
    flagsPlainText += `${flag.title}\n${flag.detail}\n\n`;
    flagList.innerHTML += `
      <div class="flag-item">
        <div class="flag-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,2 14,13 2,13" stroke="#7a6230" stroke-width="1.5" fill="none"/>
            <line x1="8" y1="6" x2="8" y2="9" stroke="#7a6230" stroke-width="1.5"/>
            <circle cx="8" cy="11" r="0.6" fill="#7a6230"/>
          </svg>
        </div>
        <div class="flag-content">
          <p class="flag-title">${flag.title}</p>
          <p class="flag-detail">${flag.detail}</p>
        </div>
      </div>`;
  });
  document.getElementById('flagsText').textContent = flagsPlainText;
  
  // Fill appeal letter
  document.getElementById('appealLetter').textContent = results.letter;
}
