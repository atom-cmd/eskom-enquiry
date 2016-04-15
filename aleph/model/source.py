import logging

from aleph.core import db, url_for
from aleph.model.schema_model import SchemaModel
from aleph.model.common import DatedModel, IdModel, make_token

log = logging.getLogger(__name__)


class Source(db.Model, IdModel, DatedModel, SchemaModel):
    _schema = 'source.json#'

    label = db.Column(db.Unicode, nullable=True)
    category = db.Column(db.Unicode, nullable=True)
    foreign_id = db.Column(db.Unicode, unique=True, nullable=False)

    @classmethod
    def create(cls, data):
        foreign_id = data.get('foreign_id')
        src = Source.by_foreign_id(foreign_id)
        if src is None:
            src = cls()
            src.foreign_id = foreign_id or make_token()
        src.update(data)
        db.session.flush()
        return src

    def update(self, data):
        self.schema_update(data)

    def delete(self):
        from aleph.model import Document, DocumentPage, Reference
        sq = db.session.query(Document.id)
        sq = sq.filter(Document.source_id == self.id)
        sq = sq.subquery()

        q = db.session.query(DocumentPage)
        q = q.filter(DocumentPage.document_id.in_(sq))
        q.delete(synchronize_session='fetch')

        q = db.session.query(Reference)
        q = q.filter(Reference.document_id.in_(sq))
        q.delete(synchronize_session='fetch')

        q = db.session.query(Document)
        q = q.filter(Document.source_id == self.id)
        q.delete(synchronize_session='fetch')

        db.session.delete(self)

    @classmethod
    def by_foreign_id(cls, foreign_id):
        if foreign_id is None:
            return
        return cls.all().filter_by(foreign_id=foreign_id).first()

    @classmethod
    def all_by_ids(cls, ids):
        return cls.all().filter(cls.id.in_(ids))

    def __repr__(self):
        return '<Source(%r)>' % self.id

    def __unicode__(self):
        return self.label

    def to_dict(self):
        data = super(Source, self).to_dict()
        data['api_url'] = url_for('sources_api.view', id=self.id)
        data['foreign_id'] = self.foreign_id
        return data
