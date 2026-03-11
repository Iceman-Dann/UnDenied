#!/usr/bin/env python3
"""
UnDenied API Server
Handles Gemini API calls to avoid CORS issues
"""

import http.server
import socketserver
import webbrowser
import os
import json
import urllib.request
import urllib.parse

PORT = 8000
GEMINI_API_KEY = "AIzaSyDSMH0gsqlH6_dWOY6FSq-96ZIwbBGbvCM"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/analyze':
            self.handle_analyze_request()
        else:
            self.send_response(404)
            self.end_headers()

    def handle_analyze_request(self):
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))

            document_type = request_data.get('documentType')
            letter_text = request_data.get('letterText')

            if not document_type or not letter_text:
                self.send_error(400, "Missing documentType or letterText")
                return

            # Get system prompt
            system_prompts = {
                'insurance': '''You are a legal analyst specializing in insurance law and patient rights. Analyze the provided insurance denial letter and provide three distinct outputs:

1. **Plain English Translation**: Explain what the letter means in simple, clear language that anyone can understand. Remove jargon and legal terminology. Focus on what this means for the patient practically.

2. **Flagged Areas**: Identify 3-5 specific areas worth questioning or appealing. For each flag, provide:
   - A clear, concise title
   - Detailed explanation of why this area is problematic
   - Specific legal rights or regulations that may apply
   - Actionable advice for the patient

3. **Draft Appeal Letter**: Write a complete, professional appeal letter that:
   - Uses proper legal formatting
   - References relevant laws (ERISA, ACA, state regulations)
   - Clearly states the disagreement with the denial
   - Requests specific actions and timelines
   - Includes placeholders for personal information

Focus on real patient rights under US law. Be thorough but practical. The appeal letter should be ready to send with minimal edits.''',

                'eviction': '''You are a tenant rights attorney specializing in housing law. Analyze the provided eviction notice and provide three distinct outputs:

1. **Plain English Translation**: Explain what this eviction notice means in simple terms. Clarify that this is NOT a court order and explain the tenant's current rights and situation.

2. **Flagged Areas**: Identify 3-5 specific legal or procedural issues with the notice. For each flag:
   - Title the issue clearly
   - Explain why it's legally problematic
   - Cite relevant landlord-tenant laws or requirements
   - Provide specific defense strategies

3. **Draft Response Letter**: Write a formal response that:
   - Challenges the eviction notice on legal grounds
   - Demands proper procedures be followed
   - Preserves all tenant rights and defenses
   - Requests withdrawal of the notice
   - Includes professional legal language and placeholders

Focus on tenant protections under state and federal law. Emphasize that improper notices can be successfully contested.''',

                'benefits': '''You are a benefits advocate specializing in government assistance programs. Analyze the provided benefits rejection letter and provide three distinct outputs:

1. **Plain English Translation**: Explain what this benefits denial means in simple language. Clarify which program is involved and what immediate impact this has on the person.

2. **Flagged Areas**: Identify 3-5 specific issues with the denial decision. For each flag:
   - Clear title identifying the problem
   - Explanation of why this matters legally
   - Reference to program rules or regulations
   - Steps the person can take to address it

3. **Draft Appeal Letter**: Write a comprehensive appeal that:
   - References specific program regulations
   - Corrects any factual errors in the decision
   - Provides additional supporting information
   - Requests reconsideration with proper timeline
   - Uses appropriate formal language and includes placeholders

Focus on due process rights under administrative law. Many benefits denials are overturned on appeal - emphasize this hope while being thorough about legal requirements.''',

                'school': '''You are an education law specialist focusing on student rights. Analyze the provided school suspension notice and provide three distinct outputs:

1. **Plain English Translation**: Explain what this suspension means in clear terms. Clarify the duration, immediate consequences, and impact on the student's academic record.

2. **Flagged Areas**: Identify 3-5 specific issues with the suspension. For each flag:
   - Clear title of the problem
   - Explanation of student rights violations
   - Reference to education laws or district policies
   - Specific actions parents/students can take

3. **Draft Appeal Letter**: Write a formal appeal that:
   - Challenges the suspension process or outcome
   - Cites relevant education laws (IDEA, Section 504, state laws)
   - Requests alternative consequences or reversal
   - Demands proper educational accommodations
   - Uses professional tone with placeholders for details

Focus on due process rights in education. Students have strong procedural protections that are often overlooked in suspension decisions.''',

                'medical': '''You are a medical billing advocate and healthcare consumer rights specialist. Analyze the provided medical bill and provide three distinct outputs:

1. **Plain English Translation**: Explain what this medical bill means in simple terms. Break down what services were billed, what insurance may cover, and what the patient is being asked to pay.

2. **Flagged Areas**: Identify 3-5 specific billing issues or errors. For each flag:
   - Clear title of the billing problem
   - Explanation of why it's incorrect or questionable
   - Reference to billing codes, regulations, or consumer protections
   - Steps to dispute or negotiate the charges

3. **Draft Dispute Letter**: Write a formal dispute letter that:
   - Challenges specific charges or amounts
   - Requests detailed billing codes and explanations
   - Cites relevant healthcare billing regulations
   - Proposes resolution options
   - Includes professional language and placeholders

Focus on patient rights under healthcare consumer protection laws. Medical billing errors are extremely common - empower the patient to question and dispute effectively.''',

                'credit': '''You are a consumer credit attorney specializing in credit reporting and FCRA law. Analyze the provided credit dispute response and provide three distinct outputs:

1. **Plain English Translation**: Explain what this credit response means in simple language. Clarify how it affects the person's credit score and what actions were or weren't taken.

2. **Flagged Areas**: Identify 3-5 specific issues with the credit response. For each flag:
   - Clear title of the problem
   - Explanation of FCRA violations or deficiencies
   - Reference to specific credit reporting laws
   - Concrete steps to enforce rights

3. **Draft Follow-up Letter**: Write a formal follow-up that:
   - Cites Fair Credit Reporting Act violations
   - Demands proper investigation or correction
   - Sets deadline for compliance
   - Reserves rights for legal action
   - Uses appropriate legal language with placeholders

Focus on consumer protections under the FCRA. Credit bureaus and furnishers have strict legal obligations that are frequently violated - empower the consumer to enforce their rights.'''
            }

            system_prompt = system_prompts.get(document_type, system_prompts['insurance'])

            # Prepare Gemini API request
            request_body = {
                "contents": [{
                    "parts": [{
                        "text": f"{system_prompt}\n\nHere is the letter to analyze:\n\n{letter_text}"
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.3,
                    "topK": 40,
                    "topP": 0.95,
                    "maxOutputTokens": 8192,
                }
            }

            # Make API call
            url = f"{GEMINI_API_URL}?key={GEMINI_API_KEY}"
            req = urllib.request.Request(
                url,
                data=json.dumps(request_body).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )

            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))

            # Extract AI response
            if result.get('candidates') and result['candidates'][0].get('content'):
                ai_response = result['candidates'][0]['content']['parts'][0]['text']
                
                # Parse the response into structured format
                parsed_response = self.parse_ai_response(ai_response)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(parsed_response).encode('utf-8'))
            else:
                self.send_error(500, "No response from AI")

        except Exception as e:
            print(f"Error details: {str(e)}")
            import traceback
            traceback.print_exc()
            self.send_error(500, f"Server error: {str(e)}")

    def parse_ai_response(self, response):
        # Simple parsing - split into sections
        lines = response.split('\n')
        sections = {
            'explanation': '',
            'flags': [],
            'letter': ''
        }
        
        current_section = 'explanation'
        current_flag = None
        
        for line in lines:
            line = line.strip()
            
            # Detect section transitions
            if 'plain english' in line.lower() or 'what this means' in line.lower():
                current_section = 'explanation'
            elif 'flag' in line.lower() or 'areas worth' in line.lower():
                current_section = 'flags'
            elif 'appeal' in line.lower() or 'letter' in line.lower():
                current_section = 'letter'
            elif line and current_section == 'explanation':
                sections['explanation'] += line + ' '
            elif line and current_section == 'letter':
                sections['letter'] += line + '\n'
            elif line and current_section == 'flags':
                if line.startswith(('1.', '2.', '3.', '4.', '5.', '-', '•')):
                    if current_flag:
                        sections['flags'].append(current_flag)
                    current_flag = {'title': line.lstrip('123456.-• '), 'detail': ''}
                elif current_flag:
                    current_flag['detail'] += line + ' '
        
        if current_flag:
            sections['flags'].append(current_flag)
        
        # Clean up
        sections['explanation'] = sections['explanation'].strip()
        sections['letter'] = sections['letter'].strip()
        
        return sections

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 UnDenied server running at http://localhost:{PORT}")
        print("📄 Open analyzer at: http://localhost:8000/index.html")
        print("🤖 Gemini API integration enabled")
        print("🛑 Press Ctrl+C to stop server")
        
        # Auto-open browser
        webbrowser.open(f'http://localhost:{PORT}/index.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
