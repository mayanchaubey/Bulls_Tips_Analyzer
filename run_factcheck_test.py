import os
from dotenv import load_dotenv
load_dotenv('backend/.env')
from factcheck_pipeline.orchestrator import run_factcheck

try:
    result = run_factcheck('https://www.youtube.com/watch?v=L83KfmWD3Pg')
    print('SUCCESS', result)
except Exception as exc:
    print('ERROR:', exc)
    raise
