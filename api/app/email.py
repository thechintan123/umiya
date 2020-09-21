from flask import render_template
from . import app
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content, Personalization, Email, From, Bcc, Subject, ReplyTo
from datetime import datetime
from dateutil.relativedelta import relativedelta


# Generic method to send email via Sendgrid
def send_email(recipients, subject, text_body, html_body, send_admin=False):
    message = Mail()

    # personalization is used so you can't see other people sent email
    for r in recipients:
        person = Personalization()
        person.add_to(Email(r))
        message.add_personalization(person)

    if send_admin:
        admin_list = app.config['MAIL_ADMINS'].split(';')
        message.bcc = [Bcc(a) for a in admin_list]
    message.subject = Subject(subject)
    message.from_email = From(
        app.config['MAIL_FROM'], 'Umiya Matrimony')
    message.reply_to = ReplyTo(
        app.config['MAIL_REPLY_TO'], 'Umiya Matrimony Reply')

    message.content = [
        Content('text/html', html_body),
        Content('text/txt', text_body)
    ]

    try:
        sg = SendGridAPIClient(app.config['SENDGRID_API_KEY'])
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return True
    except Exception as e:
        print(e)
        return False


# Send register successful email
def send_reg_email(user):
    recipients = [user.email]
    return send_email(
        recipients=recipients,
        subject='Welcome to UmiyaMatrimony Family!',
        text_body=render_template('email_reg.txt',
                                  user=user),
        html_body=render_template('email_reg.html',
                                  user=user),
        send_admin=True)


# Send forgot password email
def send_forgotpwd_email(user, new_pwd):
    recipients = [user.email]
    return send_email(
        recipients=recipients,
        subject='Reset your password from UmiyaMatrimony',
        text_body=render_template('email_pwdreset.txt',
                                  user=user, new_pwd=new_pwd),
        html_body=render_template('email_pwdreset.html',
                                  user=user, new_pwd=new_pwd))


# Calculate age of person for display purpose
def calc_age(match_users):
    now = datetime.now()
    years = []
    for m in match_users:
        dob = m.user_details.date_of_birth
        year = relativedelta(now, dob).years
        years.append(year)
    return years

# Send match partner email
def send_match_email(user, match_users):
    recipients = [user.email]
    years = calc_age(match_users)
    return send_email(
        recipients=recipients,
        subject='New users match your preferred partner profile at UmiyaMatrimony',
        text_body=render_template('email_match.txt',
                                  user=user, match_users=match_users, years=years),
        html_body=render_template('email_match.html',
                                  user=user, match_users=match_users, years=years))
