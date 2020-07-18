from flask import render_template
from . import app
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content, Personalization, Email, From, Bcc, Subject, ReplyTo


# Generic method to send email via Sendgrid
def send_email(recipients, subject, text_body, html_body):
    message = Mail()

    # personalization is used so you can't see other people sent email
    for r in recipients:
        person = Personalization()
        person.add_to(Email(r))
        message.add_personalization(person)

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


# Send register successful email which calls generic method above
def send_reg_email(user):
    recipients = [user.email]
    return send_email(
        recipients=recipients,
        subject='Welcome to UmiyaMatrimony Family!',
        text_body=render_template('email_reg.txt',
                                  user=user),
        html_body=render_template('email_reg.html',
                                  user=user))
