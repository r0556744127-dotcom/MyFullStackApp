using MailKit.Net.Smtp; // זה ה-SmtpClient הנכון
using MimeKit;
using service.interfaces;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace service.services
{
    public class EmailService : IEmailService
    {
        private readonly string smtpServer;
        private readonly int smtpPort;
        private readonly string smtpUser;
        private readonly string smtpPassword;

        public EmailService(string server, int port, string user, string password)
        {
            smtpServer = server;
            smtpPort = port;
            smtpUser = user;
            smtpPassword = password;
        }

        /// <summary>
        /// שולח מייל לכל רשימת נמענים עם אפשרות לצירוף קבצים
        /// </summary>
        public async Task SendMailToUsersAsync(List<string> emails, string subject, string body, List<string>? attachments = null)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Admin", smtpUser));

            // מוסיפים את כל הנמענים ב-BCC
            foreach (var email in emails)
            {
                message.Bcc.Add(MailboxAddress.Parse(email));
            }

            message.Subject = subject;

            // גוף ההודעה עם אפשרות לקבצים
            var multipart = new Multipart("mixed");

            // הטקסט של המייל
            var textPart = new TextPart("plain")
            {
                Text = body
            };
            multipart.Add(textPart);

            // מוסיפים קבצים אם יש
            if (attachments != null)
            {
                foreach (var filePath in attachments)
                {
                    if (File.Exists(filePath))
                    {
                        var attachment = new MimePart("application", "octet-stream")
                        {
                            Content = new MimeContent(File.OpenRead(filePath)),
                            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                            ContentTransferEncoding = ContentEncoding.Base64,
                            FileName = Path.GetFileName(filePath)
                        };
                        multipart.Add(attachment);
                    }
                }
            }

            message.Body = multipart;

            // שליחה דרך SMTP
            using var client = new SmtpClient();
            await client.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUser, smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}