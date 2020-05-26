"""added new tables

Revision ID: 54a6d0f6629b
Revises: 962023649d4f
Create Date: 2020-05-26 00:20:16.514884

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54a6d0f6629b'
down_revision = '962023649d4f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('city_india',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('country',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('marital_status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('state_india',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('gender', sa.Enum('m', 'f'), nullable=False),
    sa.Column('dob', sa.String(length=10), nullable=False),
    sa.Column('country_id', sa.Integer(), nullable=False),
    sa.Column('state_india_id', sa.Integer(), nullable=True),
    sa.Column('state_other', sa.String(length=30), nullable=True),
    sa.Column('city_india_id', sa.Integer(), nullable=True),
    sa.Column('city_other', sa.String(length=30), nullable=True),
    sa.Column('phone_primary', sa.String(length=20), nullable=False),
    sa.Column('phone_alternate', sa.String(length=20), nullable=True),
    sa.Column('agree_tc', sa.Boolean(), nullable=False),
    sa.Column('height', sa.String(length=10), nullable=False),
    sa.Column('gotra', sa.String(length=20), nullable=False),
    sa.Column('original_surname', sa.String(length=20), nullable=False),
    sa.Column('father_fullname', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=False),
    sa.Column('about_yourself', sa.String(length=200), nullable=True),
    sa.Column('where_know_id', sa.Integer(), nullable=False),
    sa.Column('last_login', sa.DateTime(), nullable=True),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.Column('create_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('where_know',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userdetails_marital',
    sa.Column('ud_id', sa.Integer(), nullable=False),
    sa.Column('ms_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ms_id'], ['marital_status.id'], ),
    sa.ForeignKeyConstraint(['ud_id'], ['user_details.id'], ),
    sa.PrimaryKeyConstraint('ud_id', 'ms_id')
    )
    op.add_column('user', sa.Column('update_date', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'update_date')
    op.drop_table('userdetails_marital')
    op.drop_table('where_know')
    op.drop_table('user_details')
    op.drop_table('state_india')
    op.drop_table('marital_status')
    op.drop_table('country')
    op.drop_table('city_india')
    # ### end Alembic commands ###
