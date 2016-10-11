from aleph.core import get_config
from bs4 import BeautifulSoup
from urlparse import urljoin
import logging
import requests

log = logging.getLogger(__name__)


def extract_pdf(path, languages=None):
    with open(path, 'rb') as f:
        headers = {'accept': 'text/html'}
        tika_url = get_config("TIKA_URI")
        r = requests.put(urljoin(tika_url, '/tika'), data=f, headers=headers)
        r.raise_for_status()
        soup = BeautifulSoup(r.text.encode('utf8', 'replace'), 'html.parser')
        pages = []
        for page_no, page in enumerate(soup.findAll('div', class_='page')):
            text = page.get_text()
            log.debug("Extracted %d characters of text from %r, p.%s", len(text), path, page_no)
            pages.append(text)
        return {'pages': pages}
