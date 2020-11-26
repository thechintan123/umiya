from flask import render_template
from . import app
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content, Personalization, Email, From, Bcc, Subject, ReplyTo
from datetime import datetime
from dateutil.relativedelta import relativedelta
import math


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
                                  user=user, new_pwd=new_pwd),
                                  send_admin=True)


# Calculate age of person for display purpose
def calc_age(match_users):
    now = datetime.now()
    years = []
    for m in match_users:
        dob = m.user_details.date_of_birth
        year = relativedelta(now, dob).years
        years.append(year)
    return years

# Calculate height in Ft and Inch for  display purpose
def calc_height_ft_inches(match_users):
    height_ft_inches = []
    for m in match_users:
        heightTotalInches = m.user_details.height_cms * 0.393701
        heightFt = math.floor(heightTotalInches / 12)
        heightInches = round(heightTotalInches - heightFt * 12)
        height_ft_inches.append(str(heightFt) + ' ft ' + str(heightInches) + ' inches')
    return height_ft_inches    

# Send match partner email
def send_match_email(user, match_users, new_match_users):
    # recipients = [user.email]
    recipients = ['chintan123@gmail.com']
    match_age_years = calc_age(match_users)
    match_height_ft = calc_height_ft_inches(match_users)

    new_match_age_years = calc_age(new_match_users)
    new_match_height_ft = calc_height_ft_inches(new_match_users)
    return send_email(
        recipients=recipients,
        subject='UmiyaMatrimony.com - ' + user.user_details.first_name.capitalize() + ' find your matches',
        text_body=render_template('email_match.txt',
                                  user=user, new_match_users = new_match_users, 
                                  new_match_age_years = new_match_age_years, 
                                  new_match_height_ft = new_match_height_ft,
                                  match_users=match_users, match_age_years=match_age_years,
                                  match_height_ft = match_height_ft                                  ),
        html_body=render_template('email_match.html',
                                  user=user, new_match_users = new_match_users, 
                                  new_match_age_years = new_match_age_years, 
                                  new_match_height_ft = new_match_height_ft,
                                  match_users=match_users, match_age_years=match_age_years,
                                  match_height_ft = match_height_ft
                                  ))


# Send updated status email
def send_update_status_email(user):
    # print('status', status)
    recipients = [user.email]
    return send_email(
        recipients=recipients,
        subject='UmiyaMatrimony.com - Profile Status is updated to ' +user.user_details.status.name.upper(),
        text_body=render_template('email_update_status.txt',
                                  user=user),
        html_body=render_template('email_update_status.html',
                                  user=user),
        send_admin=True)