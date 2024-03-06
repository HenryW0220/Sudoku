# models.py
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(255))
    boards = relationship('Board', backref='user')

class Board(Base):
    __tablename__ = 'Board'
    board_id = Column(Integer, primary_key=True, autoincrement=True)
    board_contents = Column(String(255))
    user_id = Column(Integer, ForeignKey('User.user_id'))