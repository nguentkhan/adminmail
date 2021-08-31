import smtplib

sender_email=""
rec_email=""
password=input (str("please enter your password: "])
message="Hey, this was sent using python"

sever=smtplib.SMTP('smtp.gmail.com', 587)
server starrttls()
server.login(sender_email, password)
print("Login success") 
server.sendmail(sender_email, rec_email, messenge)
print("Email has been sent to", rec_email)
