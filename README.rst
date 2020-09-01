Eskomo-Inquiry
=============

Production setup
----------------


Backend services
~~~~~~~~~~~~~~~~

Backend services are hosted on eskom-admin.openup.org.za. This repository
is checked out in /home/ubuntu/eskomo and run with `docker-compose up -d`.

nginx is configured to forward eskom-aleph-api.openup.org.za to localhost:8000
where the api container is listening.

HTTPS is provided by nginx. The certificate is provisioned using certbot.


Frontend
~~~~~~~~

The UI is hosted on netlify. `netlify.toml` defines the build config.
Additionally the following build environment variable must be defined:

    REACT_APP_API_ENDPOINT=https://eskom-aleph-api.openup.org.za/api/2

HTTPS is provided by netlify. The certificate is provisioned using letsencrypt on netlify.

Netlify should be configured to build when changes are pushed to the github repository.
See `netlify-setup.md` for more on how to set this up.

-----

.. epigraph::

  Truth cannot penetrate a closed mind. If all places in the universe are in
  the Aleph, then all stars, all lamps, all sources of light are in it, too.

  -- `The Aleph <http://www.phinnweb.org/links/literature/borges/aleph.html>`_,
  Jorge Luis Borges

.. figure:: https://api.travis-ci.org/alephdata/aleph.png
   :target: https://travis-ci.org/alephdata/aleph/
   :alt: Build Status

**Aleph** is a tool for indexing large amounts of both documents (PDF, Word,
HTML) and structured (CSV, XLS, SQL) data for easy browsing and search. It is
built with investigative reporting as a primary use case. Aleph allows
cross-referencing mentions of well-known entities (such as people and
companies) against watchlists, e.g. from prior research or public datasets.

Here's some key features:

* Web-based search across large document and data sets.
* Imports many file formats, including popular office formats, spreadsheets,
  email and zipped archives. Processing includes optical character recognition,
  language and encoding detection and named entity extraction.
* Load structured entity graph data from databases and CSV files. This allows
  navigation of complex datasets like companies registries, sanctions lists or
  procurement data. Import tools for `OpenSanctions <http://opensanctions.org/>`_.
  are included.
* Receive notifications for new search matches with a personal watchlist.
* OAuth authorization and access control on a per-source and per-watchlist
  basis.

Documentation
-------------

The documentation for Aleph is `available on our Wiki
<https://github.com/alephdata/aleph/wiki>`_. If you wish to run your own
copy of Aleph (or contribute to the development), get started with the
`installation documentation <https://github.com/alephdata/aleph/wiki/Installation>`_.

Support
-------

Aleph is used by multiple organisations, including Code for Africa, OCCRP and
OpenOil. For coordination, the following mailing list exists:
`aleph-search <https://groups.google.com/forum/#!forum/aleph-search>`_

If you find any errors or issues using Aleph please
`file an issue on GitHub <https://github.com/alephdata/aleph/issues/new>`_ or
contact the mailing list.
