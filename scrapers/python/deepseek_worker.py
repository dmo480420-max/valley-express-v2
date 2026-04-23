import os
import json
from openai import OpenAI
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

# Load environment variables from the root .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

class GovContractLead(BaseModel):
    title: str
    agency: str
    contract_id: str
    estimated_value: Optional[str]
    reply_link: str
    phone: Optional[str]
    deadline: str
    requirements_summary: str

class DeepSeekExtractor:
    """
    VALLEY EXPRESS COST-OPTIMIZED EXTRACTOR
    Uses DeepSeek-V3 to process high-volume municipal scraper data.
    """
    
    @staticmethod
    def _clean_input(text: str) -> str:
        """Minimize tokens by stripping whitespace and noise."""
        import re
        # Remove multiple newlines and extra spaces
        text = re.sub(r'\s+', ' ', text)
        # Remove non-essential symbols
        text = re.sub(r'[^a-zA-Z0-9\s.,:;!?\-/]', '', text)
        return text.strip()

    @staticmethod
    def extract_leads(raw_text: str) -> List[dict]:
        clean_text = DeepSeekExtractor._clean_input(raw_text)[:8000]
        print(f"[DeepSeek] Scaled input to {len(clean_text)} tokens (approx).")
        
        system_msg = "Extract AZ logistics procurement into JSON. Schema: {leads: [{title, agency, contract_id, link, deadline, summary}]}"
        user_msg = f"DATA: {clean_text}"
        
        try:
            client = DeepSeekExtractor._get_client()
            response = client.chat.completions.create(
                model=os.getenv("EXTRACTION_MODEL", "deepseek-chat"),
                messages=[
                    {"role": "system", "content": system_msg},
                    {"role": "user", "content": user_msg}
                ],
                response_format={"type": "json_object"},
                temperature=0.1 # Lower temperature = more stable tokens
            )
            
            content = response.choices[0].message.content
            data = json.loads(content)
            return data.get("leads", [])
            
        except Exception as e:
            print(f"Error [DeepSeek]: {e}")
            return []

def process_generic(prompt: str, system_instruct: str = "Analyze logistics data.") -> str:
    """Generic prompt handler for specialized auditing (Top Level)."""
    try:
        # Get local client
        client = OpenAI(
            api_key=os.getenv("DEEPSEEK_API_KEY"),
            base_url="https://api.deepseek.com"
        )
        response = client.chat.completions.create(
            model=os.getenv("EXTRACTION_MODEL", "deepseek-chat"),
            messages=[
                {"role": "system", "content": system_instruct},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error [DeepSeek_Worker]: {str(e)}"

if __name__ == "__main__":
    # Test block
    test_data = "City of Phoenix IFB 1234 - Courier Services for library books. Due May 1st. Contact 602-555-0199. Link: phoenix.gov/bid1"
    extractor = DeepSeekExtractor()
    results = extractor.extract_leads(test_data)
    print(json.dumps(results, indent=2))
